import * as React from "react"
import { Frame, Stack } from "framer"
import styled from "styled-components"
import { ZoekBoxInput } from "./ZoekBoxInput"
import { ZoekBoxOutput } from "./ZoekBoxOutput"

export function ZoekBoxMulti(props) {
    const [state, setState] = React.useState({
        value: "",
        query: "",
        parent: null,
        niveau: null,
        results: [],
        selectedItem: -1,
        reset: false,
        hasFocus: true,
        isLastSelected: false,
        placeholder: "Plaats, buurt, adres, etc.",
    })

    const [items, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return [
                    ...state,
                    { id: state.length, name: action.name, selected: false },
                ]
            case "remove":
                return state.filter((_, index) => index != action.index)
            default:
                return state
        }
    }, [])

    // Apply effect when niveau changes
    React.useEffect(() => {
        switch (state.niveau) {
            case null:
                return setState({
                    ...state,
                    placeholder: "Plaats, buurt, adres, etc.",
                })
            case 0:
                return setState({
                    ...state,
                    placeholder: "Voeg plaats toe",
                })
            case 1:
                return setState({
                    ...state,
                    placeholder: "Voeg gemeente toe",
                })
            case 3:
                return setState({ ...state, placeholder: "Voeg buurt toe" })
            case 5:
                return setState({
                    ...state,
                    placeholder: "Voeg een straat toe",
                })
            default:
                return
        }
    }, [state.niveau])

    // Apply effect when items change
    React.useEffect(() => {
        if (items.length === 0) {
            setState({ ...state, niveau: null })
        }
    }, [items])

    function handleListItemClick(index) {
        dispatch({ type: "remove", index })
    }

    function handleKeyDown(event) {
        switch (event.keyCode) {
            case 8:
                if (state.selectedItem !== items.length) {
                    setState({
                        ...state,
                        selectedItem: items.length,
                    })
                } else {
                    dispatch({
                        type: "remove",
                        index: state.selectedItem - 1,
                    })
                }
            default:
                return
        }
    }

    return (
        <Frame width={props.width} height={400} backgroundColor="transparent">
            <Locaties onKeyDown={handleKeyDown}>
                {items.map((item, index) => {
                    return (
                        <li
                            key={item.id}
                            className={`location ${
                                state.selectedItem - 1 === index
                                    ? "selected"
                                    : ""
                            }`}
                            // onClick={event => handleListItemClick(index)}
                        >
                            {item.name}
                        </li>
                    )
                })}
                <li>
                    <ZoekBoxInput
                        width={1}
                        height={24}
                        value={state.value}
                        zbNiveau={state.niveau}
                        zbParent={state.parent}
                        paddingTop={0}
                        paddingBottom={4}
                        paddingLeft={0}
                        paddingRight={0}
                        reset={state.reset}
                        hasFocus={state.hasFocus}
                        placeholder={state.placeholder}
                        onChange={(query: string, results: any) => {
                            setState({
                                ...state,
                                query: query,
                                results: results,
                                reset: false,
                                selectedItem: -1,
                            })
                        }}
                        onFocus={(hasFocus: boolean) => {
                            if (hasFocus) {
                                setState({ ...state, selectedItem: -1 })
                            }
                        }}
                    />
                </li>
            </Locaties>
            <Frame
                height={"1fr"}
                width={props.width}
                backgroundColor="transparent"
            >
                <ZoekBoxOutput
                    width={props.width}
                    height={280}
                    query={state.query}
                    results={state.results}
                    onSelect={(
                        name: string,
                        nicename: string,
                        parent: number,
                        parentLabel: string,
                        niveau: any,
                        niveauLabel: string,
                        count: number
                    ) => {
                        setState({
                            ...state,
                            value: "",
                            query: "",
                            reset: true,
                            parent: parent,
                            niveau: niveau,
                            results: [],
                            selectedItem: -1,
                        })
                        dispatch({ type: "add", name: nicename })
                    }}
                />
            </Frame>
        </Frame>
    )
}

const Locaties = styled.ul`
    font-family: "Proxima Nova", sans-serif;
    font-size: 16px;
    line-height: 24px;
    list-style: none;
    padding: 12px 24px 8px 12px;
    margin: 0;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    background-color: #EEE;
    border-radius: 4px;
    li {
        display: flex;
        height: 28px;
        position: relative;
        &.location {
            cursor: pointer;
            color: #0071B3;
            margin: 0 4px 4px 0;
            padding: 1px 8px 2px 8px;
            border-radius: 2px;
            background-color: #E6F2F7;
            border: 1px solid rgba(0,113,179,0.25);
            &.selected, &:hover {
                background-color: #0071B3;
                color: white;
            }
        }
    }
    
`

ZoekBoxMulti.defaultProps = {
    width: 480,
}

// &:after {
//     display: block;
//     position: absolute;
//     content: "✕";
//     top: 2px;
//     right: 8px;
//     font-size: 0.75em;
// }
