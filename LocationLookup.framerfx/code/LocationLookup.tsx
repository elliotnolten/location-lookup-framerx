import * as React from "react"
import {
    Frame,
    Stack,
    FrameProps,
    addPropertyControls,
    ControlType,
} from "framer"
import styled from "styled-components"

type Props = Partial<FrameProps> & {
    padding: number
    paddingPerSide: boolean
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
    resultColor: string
    selectColor: string
    selectBackground: string
    initialValue: string
    initialType: string
    fontSize: number
    maxAmount: number
    onSelect: (selection: string) => any
}

export function LocationLookup(props: Partial<Props>) {
    const {
        width,
        height,
        padding,
        paddingPerSide,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        backgroundColor,
        color,
        resultColor,
        selectColor,
        selectBackground,
        initialValue,
        borderRadius,
        placeholder,
        initialType,
        fontSize,
        maxAmount,
    } = props
    const input = React.useRef<HTMLInputElement>()
    const [results, setResults] = React.useState([])
    const [focused, setFocused] = React.useState(-1)
    const [selection, setSelection] = React.useState("")
    const [query, setQuery] = React.useState(initialValue)
    const [type, setType] = React.useState(initialType)

    // Fetch data from PDOKlmerelmere
    let isMounted = true

    React.useEffect(() => {
        input.current.value = initialValue
        setQuery(initialValue)
        setType(initialType)
    }, [initialValue, initialType])

    React.useEffect(() => {
        let typeString = type === "any" ? "" : `&fq=type:${type}`
        let url = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?rows=${maxAmount}${typeString}&q=${query}`
        fetch(url).then(response => {
            response.json().then(data => {
                setResults(data.response.docs)
            })
        })
    }, [query, type, maxAmount])

    function handleChange(e) {
        setQuery(e.target.value)
    }

    function selectSuggestion(selection) {
        setResults([])
        setQuery("")
        setSelection(selection)
        input.current.value = selection
        input.current.focus()
        props.onSelect(selection)
    }

    function handleKeyDown(e) {
        // Arrow down or Tab, next result
        if (e.keyCode === 40 || e.keyCode === 9) {
            e.preventDefault()
            // Only go to next result if the current focused selection is not higher than total length of results
            if (focused < results.length - 1) {
                setFocused(focused + 1)
            }
        }
        // Arrow up, previous result
        else if (e.keyCode === 38) {
            e.preventDefault()
            // Only go to previous result if the current selection is not -1
            if (focused > 0) {
                setFocused(focused - 1)
            }
        }
        // Enter, select result
        else if (e.keyCode === 13) {
            e.preventDefault()
            // If there are results, select suggestion
            if (results.length !== 0) {
                selectSuggestion(results[focused].weergavenaam)
            }
        }
        // Just typing
        else {
            setFocused(-1)
            setSelection("")
        }
    }

    function handleMouseOver(e, index) {
        setFocused(index)
    }

    const paddingValue = paddingPerSide
        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        : `${padding}px`

    return (
        <Frame
            center
            width={width}
            height={height}
            overflow={"visible"}
            backgroundColor={"transparent"}
        >
            <SearchInput
                type="text"
                placeholder={placeholder}
                onChange={e => handleChange(e)}
                width={width}
                height={height}
                ref={input}
                padding={paddingValue}
                backgroundColor={backgroundColor}
                color={color}
                fontSize={fontSize}
                borderRadius={borderRadius}
                onKeyDown={e => handleKeyDown(e)}
            />
            <ResultList
                opacity={query.length > 0 ? 1 : 0}
                visibility={query.length > 0 ? "visible" : "hidden"}
                fontSize={fontSize}
                borderRadius={borderRadius}
                backgroundColor={backgroundColor}
                resultColor={resultColor}
                selectColor={selectColor}
                selectBackground={selectBackground}
            >
                {results.map((result, index) => (
                    <li key={index}>
                        <a
                            href=""
                            onClick={e => {
                                e.preventDefault()
                                selectSuggestion(result.weergavenaam)
                            }}
                            className={index === focused ? "isFocused" : ""}
                            onMouseOver={e => handleMouseOver(e, index)}
                        >
                            <p>
                                <strong>{result.weergavenaam}</strong>
                            </p>
                            <p>{result.type}</p>
                        </a>
                    </li>
                ))}
            </ResultList>
        </Frame>
    )
}

LocationLookup.defaultProps = {
    width: 320,
    height: 56,
    padding: 16,
    paddingPerSide: true,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 56,
    borderRadius: 4,
    searchColor: "#333",
    backgroundColor: "#FFF",
    color: "#333",
    resultColor: "#333",
    selectColor: "#1199EE",
    selectBackground: "rgba(0,0,0,0.05)",
    initialValue: "Amsterdam",
    placeholder: "Zoek op plaats, buurt of adres",
    initialType: "any",
    fontSize: 16,
    maxAmount: 5,
    onSelect: () => null,
}

addPropertyControls(LocationLookup, {
    initialValue: { type: ControlType.String, title: "Initial value" },
    placeholder: { type: ControlType.String, title: "Placeholder" },
    initialType: {
        type: ControlType.Enum,
        options: ["any", "woonplaats", "adres", "postcode", "buurt", "wijk"],
        optionTitles: [
            "Any",
            "Woonplaats",
            "Adres",
            "Postcode",
            "Buurt",
            "Wijk",
        ],
        title: "Type",
    },
    maxAmount: {
        type: ControlType.Number,
        defaultValue: 5,
        min: 1,
        max: 20,
        step: 1,
        displayStepper: true,
        title: "Max amount of results",
    },
    fontSize: {
        type: ControlType.Number,
        defaultValue: 16,
        min: 8,
        max: 56,
        step: 1,
        displayStepper: true,
        title: "Font Size",
    },
    padding: {
        type: ControlType.FusedNumber,
        toggleKey: "paddingPerSide",
        toggleTitles: ["All Sides", "Per Side"],
        valueKeys: [
            "paddingTop",
            "paddingRight",
            "paddingBottom",
            "paddingLeft",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
        title: "Input padding",
    },
    borderRadius: { type: ControlType.Number, title: "Border radius" },
    color: { type: ControlType.Color, title: "Search color" },
    backgroundColor: { type: ControlType.Color, title: "Background color" },
    resultColor: { type: ControlType.Color, title: "Result color" },
    selectColor: { type: ControlType.Color, title: "Select color" },
    selectBackground: { type: ControlType.Color, title: "Select background" },
})

const SearchInput = styled.input`
  border: 1px solid #DDD;
  outline: none;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding: ${props => props.padding};
  background-color: ${props => props.backgroundColor};
  font-size: ${props => props.fontSize}px;
  line-height: 1.5;
  border-radius: ${props => props.borderRadius}px;
  color: ${props => props.color};
  outline: none;    
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    border-color: #AAA;
  }
`

const ResultList = styled.ul`
  opacity: ${props => props.opacity};
  visibility: ${props => props.visibility};
  list-style: none;
  margin: ${props => props.marginTop}px 0 0 0;
  padding: 8px;
  border-radius: ${props => props.borderRadius}px;
  overflow: scroll;
  height: ${props => props.length * 64}px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.resultColor};
  border: 1px solid #CCC;
  li {
    padding: 0;
    a {
      font-size: ${props => props.fontSize}px;
      line-height: 1.5;
      width: auto;
      height: 100%;
      padding: 8px 12px;
      display: block;
      background-color: white;
      text-decoration: none;
      border-radius: 2px;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      &.isFocused, &:active {
        background-color: ${props => props.selectBackground};
        color: ${props => props.selectColor} !important;
      }
      &:visited {
        color: inherit;
        text-decoration: inherit;
      }
      p {
        margin: 0;
      }
    }
  }
`
