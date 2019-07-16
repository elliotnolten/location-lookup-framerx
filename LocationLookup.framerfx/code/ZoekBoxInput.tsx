import * as React from "react"
import { Frame, FrameProps, ControlType, addPropertyControls } from "framer"
import * as $ from "jquery"
import styled from "styled-components"
import { ZoekBox_Suggestion, ZoekBox_None } from "./canvas"

type Props = Partial<FrameProps> & {
    padding: number
    paddingPerSide: boolean
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
    customBackground: string
    customTextColor: string
    zbNiveau: string
    zbType: string
    onChange: (
        query: string,
        results: any,
        niveau: string,
        type: string
    ) => void
}

export function ZoekBoxInput(props) {
    const {
        width,
        height,
        initialValue,
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
        onSelect,
        customBackground,
        customTextColor,
    } = props

    // Store the input's last value in a ref
    const input = React.useRef<HTMLInputElement>()
    const [query, setQuery] = React.useState(initialValue)

    const niveau = zbNiveau === "any" ? null : zbNiveau

    const zbURL = "https://zb.funda.info/frontend/geo/suggest/"

    let isMounted = true

    React.useEffect(() => {
        input.current.value = initialValue
        setQuery(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        $.ajax({
            url: zbURL,
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                query: query,
                max: 5,
                type: zbType,
                niveau: niveau,
                parent: zbParent,
            },
            success: response => {
                onChange(query, response.Results, niveau, zbType)
            },
        })
    }, [query])

    function clearInput() {
        input.current.value = ""
        input.current.focus()
        setQuery("")
    }

    const paddingValue = paddingPerSide
        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        : `${padding}px`

    return (
        <Frame
            center
            width={width}
            height={height}
            backgroundColor={customBackground}
        >
            <ZoekBox>
                <Input
                    onChange={event => setQuery(event.target.value)}
                    ref={input}
                    padding={paddingValue}
                    placeholder={"Plaats, buurt, adres, etc."}
                    color={customTextColor}
                />
                <ClearQuery
                    onClick={clearInput}
                    style={{
                        visibility: query.length > 0 ? "visible" : "hidden",
                    }}
                >
                    <svg width="18" height="18">
                        <path
                            d="M15.174 2.636A9.058 9.058 0 0 1 17.778 9c0 4.971-3.98 9-8.889 9C3.98 18 0 13.971 0 9s3.98-9 8.889-9c2.357 0 4.618.948 6.285 2.636zM9.831 9l3.613-3.659a.68.68 0 0 0-.016-.937.66.66 0 0 0-.926-.016L8.889 8.046 5.276 4.388a.66.66 0 0 0-.926.016.681.681 0 0 0-.017.937L7.947 9l-3.614 3.658a.683.683 0 0 0-.191.661.662.662 0 1 0 1.134.293l3.613-3.658 3.613 3.658a.661.661 0 0 0 .653.194.67.67 0 0 0 .481-.487.68.68 0 0 0-.192-.661z"
                            fill="#666"
                        />
                    </svg>
                </ClearQuery>
            </ZoekBox>
        </Frame>
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
    initialValue: { type: ControlType.String, title: "Initial value" },
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
})

ZoekBoxInput.defaultProps = {
    width: 320,
    height: 44,
    initialValue: "Amsterdam",
    padding: 16,
    paddingPerSide: true,
    paddingTop: 11,
    paddingRight: 16,
    paddingBottom: 11,
    paddingLeft: 16,
    zbNiveau: 0,
    zbParent: "",
    customTextColor: "#333",
    customBackground: "white",
    onChange: () => null,
}

const ZoekBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background: none;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
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
