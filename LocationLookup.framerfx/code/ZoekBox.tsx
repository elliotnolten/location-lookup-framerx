import * as React from "react"
import { Frame } from "framer"
import * as $ from "jquery"

export function ZoekBox() {
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
                console.log(response)
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
    return (
        <Frame center>
            <input onChange={handleChange} ref={input} />
        </Frame>
    )
}
