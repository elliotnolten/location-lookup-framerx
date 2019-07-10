import * as React from "react"
import { Frame, FrameProps, ControlType, addPropertyControls } from "framer"
import * as $ from "jquery"
import styled from "styled-components"
import { Search_Suggestion, Search_None } from "./canvas"

type Props = Partial<FrameProps> & {
    padding: number
    paddingPerSide: boolean
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
    onSelect: (selection: string) => any
}

export function ZoekBox(props) {
    const {
        width,
        height,
        padding,
        paddingPerSide,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
    } = props
    const [state, setState] = React.useState({
        results: [],
        focused: -1,
        selection: "",
        query: "",
        type: "any",
    })

    const zbURL = "https://zb.funda.info/frontend/geo/suggest/"
    let isMounted = true

    React.useEffect(() => {
        if (isMounted) {
        }
        return () => {
            isMounted = false
        }
    }, [])

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
                setState({ ...state, results: response.Results, query: query })
            },
        })
    }

    // Store the input's last value in a ref
    const input = React.useRef<HTMLInputElement>()

    function handleChange(event) {
        event.persist()
        if (isMounted) {
            fetchData(event.target.value)
        }
    }

    function clearInput() {
        input.current.value = ""
        setState({ ...state, results: [], query: "" })
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
            <SearchBox>
                <Input
                    onChange={handleChange}
                    ref={input}
                    padding={paddingValue}
                />
                <ClearQuery
                    onClick={clearInput}
                    style={{
                        visibility:
                            state.results.length > 0 ? "visible" : "hidden",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                    >
                        <path
                            d="M15.174 2.636A9.058 9.058 0 0 1 17.778 9c0 4.971-3.98 9-8.889 9C3.98 18 0 13.971 0 9s3.98-9 8.889-9c2.357 0 4.618.948 6.285 2.636zM9.831 9l3.613-3.659a.68.68 0 0 0-.016-.937.66.66 0 0 0-.926-.016L8.889 8.046 5.276 4.388a.66.66 0 0 0-.926.016.681.681 0 0 0-.017.937L7.947 9l-3.614 3.658a.683.683 0 0 0-.191.661.662.662 0 1 0 1.134.293l3.613-3.658 3.613 3.658a.661.661 0 0 0 .653.194.67.67 0 0 0 .481-.487.68.68 0 0 0-.192-.661z"
                            fill="#666"
                        />
                    </svg>
                </ClearQuery>
            </SearchBox>
            <Results>
                {state.results.map((result, index) => {
                    const NiveauLabel = result.Display.NiveauLabel
                    const Count = result.Aantal > 0 ? result.Aantal : null
                    const City = result.Display.Parent
                    const SubText = `${NiveauLabel}${
                        City === null ? "" : ", " + City
                    }`
                    return (
                        <ListItem key={index}>
                            <Search_Suggestion
                                Name={result.Display.Naam}
                                Info={SubText}
                                Count={result.Aantal.toString()}
                            />
                        </ListItem>
                    )
                })}
            </Results>
        </Frame>
    )
}

addPropertyControls(ZoekBox, {
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

ZoekBox.defaultProps = {
    width: 320,
    height: 44,
    padding: 16,
    paddingPerSide: true,
    paddingTop: 11,
    paddingRight: 16,
    paddingBottom: 11,
    paddingLeft: 16,
    onSelect: () => null,
}

const SearchBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    border: 1px solid #FFF;
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
const Results = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
`
const ListItem = styled.li`
    list-style: none;
    display: block;
    position: relative;
    height: 60px;
    border-left: 1px solid #CCC;
    border-right: 1px solid #CCC;
    border-bottom: 1px solid #EEE;
    overflow: hidden;
    background-color: #FFF;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    &:last-child {
        border-radius: 0 0 2px 2px;
        border-bottom-color: #CCC;
    }
    &:active {
        background-color: rgba(255,255,255,0.5);
    }
    &:hover {
        background-color: #E6F2F7;
    }
    &* {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`
