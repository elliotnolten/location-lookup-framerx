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
    type: string
    fontSize: number
    onSelect: (value: any) => void
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
        type,
        fontSize,
        onSelect,
    } = props
    const input = React.useRef<HTMLInputElement>()
    const [state, setState] = React.useState({
        results: [],
        focused: -1,
        selection: "",
    })

    // Fetch data from PDOK
    let isMounted = true

    function fetchPDOK(value) {
        let typeString = type === "any" ? "" : `&fq=type:${type}`
        let url = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?rows=5${typeString}&q=${value}`
        fetch(url).then(response => {
            response.json().then(data => {
                if (value.length > 1) {
                    setState({ ...state, results: data.response.docs })
                } else {
                    setState({ ...state, results: [] })
                }
            })
        })
    }

    React.useEffect(() => {
        if (isMounted) {
            input.current.value = initialValue
            fetchPDOK(initialValue)
        }
        return () => {
            isMounted = false
        }
    }, [])

    function handleChange(e) {
        if (isMounted) {
            fetchPDOK(e.target.value)
        }
    }

    function selectSuggestion(selection) {
        setState({ ...state, results: [], selection })
        input.current.value = selection
        input.current.focus()
        // onSelect(selection)
    }

    function handleKeyDown(e) {
        // Arrow down or Tab, next result
        if (e.keyCode === 40 || e.keyCode === 9) {
            e.preventDefault()
            // Only go to next result if the current focused selection is not higher than total length of results
            if (state.focused < state.results.length - 1) {
                setState({ ...state, focused: state.focused + 1 })
            }
        }
        // Arrow up, previous result
        if (e.keyCode === 38) {
            e.preventDefault()
            // Only go to previous result if the current selection is not -1
            if (state.focused > 0) {
                setState({ ...state, focused: state.focused - 1 })
            }
        }
        // Enter, select result
        if (e.keyCode === 13) {
            e.preventDefault()
            selectSuggestion(state.results[state.focused].weergavenaam)
        }
    }

    function handleMouseOver(e, index) {
        setState({ ...state, focused: index })
    }

    const paddingValue = paddingPerSide
        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        : `${padding}px`

    return (
        <Frame
            width={width}
            overflow={"visible"}
            style={{
                backgroundColor: "transparent",
                overflow: "visible",
            }}
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
                opacity={state.results.length > 0 ? 1 : 0}
                visibility={state.results.length > 0 ? "visible" : "hidden"}
                fontSize={fontSize}
                // marginTop={resultSpacing}
                borderRadius={borderRadius}
                backgroundColor={backgroundColor}
                resultColor={resultColor}
                selectColor={selectColor}
                selectBackground={selectBackground}
            >
                {state.results.map((result, index) => (
                    <li key={index}>
                        <a
                            href=""
                            onClick={e => {
                                e.preventDefault()
                                selectSuggestion(result.weergavenaam)
                            }}
                            className={
                                index === state.focused ? "isFocused" : ""
                            }
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
    height: 44,
    padding: 16,
    paddingPerSide: true,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 56,
    borderRadius: 4,
    backgroundColor: "#FFF",
    color: "#333",
    resultColor: "#333",
    selectColor: "#1199EE",
    selectBackground: "rgba(0,0,0,0.05)",
    initialValue: "Amsterdam",
    placeholder: "Zoek op plaats, buurt of adres",
    type: "any",
    fontSize: 16,
}

addPropertyControls(LocationLookup, {
    initialValue: { type: ControlType.String, title: "Initial value" },
    type: {
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
    fontSize: { type: ControlType.Number, title: "Font Size" },
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
    backgroundColor: { type: ControlType.Color, title: "Background Color" },
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
