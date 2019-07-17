import * as React from "react"
import { Frame, Stack } from "framer"
import styled from "styled-components"
import { ZoekBoxInput } from "./ZoekBoxInput"
import { ZoekBoxOutput } from "./ZoekBoxOutput"

export function ZoekBoxMulti() {
    const [state, setState] = React.useState({
        value: "",
        query: "",
        parent: null,
        niveau: "any",
        results: [],
        locations: [],
    })
    return (
        <Frame width={320} height={200} backgroundColor="white">
            <Stack
                direction={"vertical"}
                gap={0}
                width="100%"
                backgroundColor="transparent"
            >
                <Frame width="100%" height={48} backgroundColor="transparent">
                    {state.niveau} {state.parent}
                    {state.locations.map((location, index) => (
                        <Locatie key={index} label={location} />
                    ))}
                </Frame>
                <Frame width="100%" height={48} backgroundColor="transparent">
                    <ZoekBoxInput
                        width="100%"
                        height={48}
                        value={state.value}
                        zbNiveau={state.niveau}
                        zbParent={state.parent}
                        onChange={(query: string, results: any) => {
                            setState({
                                ...state,
                                query: query,
                                results: results,
                            })
                        }}
                    />
                </Frame>
                <Frame width="100%" backgroundColor="transparent">
                    <ZoekBoxOutput
                        width="100%"
                        height={280}
                        query={state.query}
                        results={state.results}
                        onSelect={(
                            name: string,
                            nicename: string,
                            parent: number,
                            niveau: any,
                            count: number
                        ) => {
                            setState({
                                ...state,
                                value: "",
                                query: "",
                                parent: parent,
                                niveau: niveau,
                                results: [],
                                locations: [...state.locations, name],
                            })
                        }}
                    />
                </Frame>
            </Stack>
        </Frame>
    )
}

function Locatie(props) {
    return <span>{props.label}, </span>
}
