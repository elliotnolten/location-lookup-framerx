import * as React from "react"
import { Frame, Stack, FrameProps } from "framer"
import { ListItem } from "./canvas"

export function Output(props) {
    const { width, height, query, resultCount, resultHeight } = props
    const [state, setState] = React.useState({ results: [] })

    // Fetch data
    React.useEffect(() => {
        const url = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?rows=5&q=${query}`
        fetch(url).then(response => {
            response.json().then(data => {
                console.log(data.response.docs)
                setState({ results: data.response.docs })
            })
        })
    }, [query])

    return (
        <Frame
            width={width}
            height={resultHeight * resultCount}
            backgroundColor={"transparent"}
        >
            <Stack
                width={"100%"}
                height={resultHeight * resultCount}
                backgroundColor={"transparent"}
                gap={0}
            >
                {state.results.map((result, index) => (
                    <ListItem
                        key={index}
                        width={"100%"}
                        height={resultHeight}
                        Name={result.weergavenaam}
                        Type={result.type}
                    />
                ))}
            </Stack>
        </Frame>
    )
}

Output.defaultProps = {
    width: 400,
    height: 48,
    query: "",
    resultCount: 5,
    resultHeight: 64,
}
