import * as React from "react"
import { Frame, FrameProps, ControlType, addPropertyControls } from "framer"
import * as $ from "jquery"
import styled from "styled-components"
import { ZoekBox_Suggestion, ZoekBox_None } from "./canvas"

type Props = Partial<FrameProps> & {
    onChange: (query: string, results: any, niveau: any, type: string) => void
    onFocus: (hasFocus: boolean) => void
    onBlur: (hasBlur: boolean) => void
}

export function ZoekBoxInput(props) {
    const {
        height,
        value,
        placeholder,
        padding,
        paddingPerSide,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        zbNiveau,
        zbType,
        zbParent,
        onChange,
        onFocus,
        onBlur,
        customBackground,
        customTextColor,
        reset,
        hasFocus,
    } = props

    // Store the input's last value in a ref
    const input = React.useRef<HTMLInputElement>()
    const [query, setQuery] = React.useState(value)
    const [inputWidth, setInputWidth] = React.useState(68)

    const niveau = zbNiveau === "any" ? null : zbNiveau

    const zbURL = "https://zb.funda.info/frontend/geo/suggest/"

    let isMounted = true

    React.useEffect(() => {
        if (isMounted) {
            input.current.value = value
            setQuery(value)
        }
        return () => {
            isMounted = false
        }
    }, [value])

    React.useEffect(() => {
        if (isMounted) {
            $.ajax({
                url: zbURL,
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    query: query,
                    max: 5,
                    type: zbType,
                    niveau: niveau,
                    parent: niveau === 3 || niveau === 5 ? zbParent : null,
                },
                success: response => {
                    onChange(query, response.Results, niveau, zbType)
                },
            })
            setInputWidth(query.length * 4 + paddingLeft + paddingRight)
        }
        return () => {
            isMounted = false
        }
    }, [query])

    React.useEffect(() => {
        if (isMounted) {
            if (reset) {
                input.current.value = ""
                setQuery("")
            } else {
                input.current.value = value
                setQuery(value)
            }
        }
        return () => {
            isMounted = false
        }
    }, [reset])

    React.useEffect(() => {
        if (isMounted) {
            if (hasFocus) {
                input.current.focus()
            } else {
                input.current.blur()
            }
        }
    }, [hasFocus])

    function clearInput() {
        input.current.value = ""
        input.current.focus()
        setQuery("")
    }

    function handleFocus(event, hasFocus) {
        if (hasFocus) {
            onFocus(true)
            onBlur(false)
        } else {
            onBlur(true)
            onFocus(false)
        }
    }

    const paddingValue = paddingPerSide
        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        : `${padding}px`

    return (
        <Input
            onChange={event => {
                setQuery(event.target.value)
            }}
            style={{ height: height }}
            ref={input}
            padding={paddingValue}
            placeholder={placeholder}
            color={customTextColor}
            onFocus={event => handleFocus(event, true)}
            onBlur={event => handleFocus(event, false)}
        />
    )
}

addPropertyControls(ZoekBoxInput, {
    customTextColor: { type: ControlType.Color, title: "Text color" },
    customBackground: { type: ControlType.Color, title: "Background color" },
    zbType: {
        type: ControlType.Enum,
        title: "Type",
        defaultValue: "koop",
        options: ["koop", "huur", "nieuwbouw", "recreatie", "europe"],
        optionTitles: ["Koop", "Huur", "Nieuwbouw", "Recreatie", "Europe"],
    },
    zbNiveau: {
        type: ControlType.Enum,
        title: "Niveau",
        defaultValue: "",
        options: ["any", "0", "1", "3", "4", "5"],
        optionTitles: ["Any", "Plaats", "Gemeente", "Buurt", "Regio", "Straat"],
    },
    value: { type: ControlType.String, title: "Initial value" },
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
    reset: { type: ControlType.Boolean, title: "Reset" },
})

ZoekBoxInput.defaultProps = {
    height: 44,
    value: "Amsterdam",
    placeholder: "Plaats, buurt, adres, etc.",
    padding: 16,
    paddingPerSide: true,
    paddingTop: 11,
    paddingRight: 16,
    paddingBottom: 11,
    paddingLeft: 16,
    zbNiveau: null,
    zbType: "koop",
    zbParent: "",
    customTextColor: "#333",
    customBackground: "white",
    reset: false,
    hasFocus: true,
    onChange: () => null,
    onFocus: () => null,
    onBlur: () => null,
}

const Input = styled.input`
    box-sizing: content-box;
    background: none;
    border: none;
    outline: none;
    padding: ${props => props.padding};
    font-size: 16px;
    font-family: "Proxima Nova";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    outline: none;    
    -webkit-appearance: none;
    -moz-appearance: none;
    &:focus {
      border-color: #CCC;
      outline: none;
    }
    &::placeholder {
        color: #666;
    }
`

const ClearQuery = styled.div`
    position: absolute;
    width: 44px;
    height: 44px;
    right: 0;
    top: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    svg {
        position: absolute;
        top: 13px; left: 13px;
    }
`
