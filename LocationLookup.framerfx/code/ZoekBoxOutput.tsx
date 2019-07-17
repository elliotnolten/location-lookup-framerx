import * as React from "react"
import { Frame, FrameProps, Scroll, Stack } from "framer"
import { ZoekBox_Suggestion, ZoekBox_None } from "./canvas"
import styled from "styled-components"

type Props = Partial<FrameProps> & {
    onSelect: (
        name: string,
        niceName: string,
        parent: number,
        parentLabel: string,
        niveau: any,
        count: number
    ) => any
}

export function ZoekBoxOutput(props) {
    const { width, height, results, query, onSelect } = props
    const [focused, setFocused] = React.useState(-1)

    function handleMouseOver(event, index, resultName) {
        setFocused(index)
    }

    function handleClick(
        index,
        resultName,
        resultNiceName,
        resultNiveau,
        resultParent,
        resultCount
    ) {
        onSelect(
            resultName,
            resultNiceName,
            resultParent,
            resultNiveau,
            resultCount
        )
    }

    function Thousands(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    return (
        <Frame width={width} height={height} backgroundColor={"transparent"}>
            <ZoekBox_None
                width={width}
                visible={
                    results.length === 0 && query.length > 0 ? true : false
                }
            />
            <Scroll
                width={"100%"}
                height={"100%"}
                visible={query.length === 0 ? false : true}
                style={{
                    backgroundColor: "#E6F2F7",
                }}
            >
                <Stack
                    gap={0}
                    width={width}
                    height={height}
                    backgroundColor={"transparent"}
                >
                    {results.map((result, index) => {
                        const Name = result.Display.Naam
                        const Niveau = result.Niveau
                        const NiveauLabel = result.Display.NiveauLabel
                        const City = result.Display.Parent
                        const Parent = result.Parent
                        const SubText = `${NiveauLabel}${
                            City === null ? "" : ", " + City
                        }`
                        const Count = Thousands(result.Aantal).toString()
                        const NameBeautified = `${Name}${
                            SubText == "Plaats" ? "" : `, ${City}`
                        }`
                        return (
                            <ZoekBox_Suggestion
                                width={width}
                                key={index}
                                onClick={event => {
                                    event.preventDefault()
                                    handleClick(
                                        index,
                                        Name,
                                        NameBeautified,
                                        Niveau,
                                        Parent,
                                        result.Aantal
                                    )
                                }}
                                backgroundColor={
                                    index === focused ? "#E6F2F7" : "#FFF"
                                }
                                onMouseOver={e =>
                                    handleMouseOver(
                                        event,
                                        index,
                                        result.Display.Naam
                                    )
                                }
                                Name={Name}
                                Info={SubText}
                                Count={Count}
                                height={56}
                            />
                        )
                    })}
                </Stack>
            </Scroll>
        </Frame>
    )
}

ZoekBoxOutput.defaultProps = {
    width: 320,
    height: 320,
    results: [],
    query: "",
    onSelect: () => null,
}
