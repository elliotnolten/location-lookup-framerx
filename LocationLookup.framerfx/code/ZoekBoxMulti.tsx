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
        niveau: "any",
        niveauLabel: "",
        results: [],
        locations: [],
        selectedLocation: -1,
        reset: false,
        hasFocus: true,
        isLastSelected: false,
        placeholder: "Plaats, buurt, adres, etc.",
    })

    React.useEffect(() => {
        setState({
            ...state,
            placeholder: `Voeg nog een ${state.niveauLabel.toLowerCase()} toe`,
        })
    }, [state.niveau])

    let backSpaceIncrements = 0
    function handleKeyDown(event) {
        // On BackSpace
        if (event.keyCode === 8) {
            setState({
                ...state,
                hasFocus: false,
                selectedLocation: state.locations.length - 1,
            })
            console.log(state.selectedLocation, state.locations.length)
            // If a location is selected
            if (state.selectedLocation > -1) {
                // Delete the selected location
                state.locations.pop()
                setState({ ...state, selectedLocation: -1 })
            }
        }
    }

    React.useEffect(() => {
        // console.log(
        //     "check state location",
        //     state.selectedLocation,
        //     state.locations.length - 1
        // )
        // If last selection is selected
        // console.log(state.selectedLocation === state.locations.length - 1)
    }, [state.selectedLocation, state.locations])

    function handleLocationClick(event, index) {
        event.persist()
        setState({ ...state, selectedLocation: index })
    }

    return (
        <Frame
            width={props.width}
            height={400}
            backgroundColor="transparent"
            onKeyDown={event => handleKeyDown(event)}
        >
            <Locaties>
                {state.locations.map((location, index) => (
                    <li
                        className={`location ${
                            state.selectedLocation === index ? "selected" : ""
                        }`}
                        onClick={event => handleLocationClick(event, index)}
                        key={index}
                    >
                        {location}
                    </li>
                ))}
                <li>
                    <ZoekBoxInput
                        height={24}
                        value={state.value}
                        zbNiveau={state.niveau}
                        zbParent={state.parent}
                        paddingTop={0}
                        paddingBottom={4}
                        paddingLeft={0}
                        paddingRight={24}
                        reset={state.reset}
                        hasFocus={state.hasFocus}
                        placeholder={state.placeholder}
                        onChange={(query: string, results: any) => {
                            setState({
                                ...state,
                                query: query,
                                results: results,
                                reset: false,
                            })
                        }}
                        onFocus={(hasFocus: boolean) => {
                            if (hasFocus) {
                                setState({ ...state, selectedLocation: -1 })
                            }
                        }}
                    />
                </li>
            </Locaties>
            <Frame height={"1fr"} width="100%" backgroundColor="transparent">
                <ZoekBoxOutput
                    width="100%"
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
                            niveauLabel: niveauLabel,
                            results: [],
                            locations: [...state.locations, name],
                        })
                    }}
                />
            </Frame>
        </Frame>
    )
}

ZoekBoxMulti.defaultProps = {
    width: 320,
}

const Locaties = styled.ul`
    font-family: "Proxima Nova", sans-serif;
    font-size: 16px;
    line-height: 24px;
    list-style: none;
    padding: 12px 12px 8px 12px;
    margin: 0;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    background-color: white;
    li {
        display: flex;
        height: 28px;
        &.location {
            color: #0071B3;
            margin: 0 4px 4px 0;
            padding: 2px 8px;
            border-radius: 2px;
            background-color: white;
            border: 1px solid rgba(0,113,179,0.25);
            &.selected {
                background-color: #0071B3;
                color: white;
            }
        }
    }
    
`
