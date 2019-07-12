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
    onChange: (query: string, results: any) => void
    onSelect: (name: string, parent: string, type: string, count: number) => any
}

export function ZoekBoxInput(props) {
    const {
        width,
        height,
        padding,
        paddingPerSide,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        onChange,
        onSelect,
    } = props
    const [state, setState] = React.useState({
        results: [],
        focused: -1,
        selection: "",
        type: "any",
    })

    const zbURL = "https://zb.funda.info/frontend/geo/suggest/"
    // let isMounted = true

    // React.useEffect(() => {
    //     return () => {
    //         isMounted = false
    //     }
    // }, [])

    function fetchData(query) {
        $.ajax({
            url: zbURL,
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                query,
                max: 5,
                type: "koop",
            },
            success: response => {
                onChange(query, response.Results)
            },
        })
    }

    // Store the input's last value in a ref
    const input = React.useRef<HTMLInputElement>()

    function handleChange(event) {
        event.persist()
        const value = event.target.value
        fetchData(value)
    }

    function clearInput() {
        input.current.value = ""
        input.current.focus()
        // setState({ ...state, results: [] })
        onChange([], "")
    }

    const paddingValue = paddingPerSide
        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        : `${padding}px`

    return (
        <Frame
            center
            width={width}
            height={height}
            backgroundColor={"transparent"}
        >
            <ZoekBox>
                <Input
                    onChange={handleChange}
                    ref={input}
                    padding={paddingValue}
                    placeholder={"Plaats, buurt, adres, etc."}
                />
                <ClearQuery
                    onClick={clearInput}
                    style={{
                        visibility:
                            state.results.length > 0 ? "visible" : "hidden",
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
    padding: 16,
    paddingPerSide: true,
    paddingTop: 11,
    paddingRight: 16,
    paddingBottom: 11,
    paddingLeft: 16,
    onChange: () => null,
    onSelect: () => null,
}

const ZoekBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
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
