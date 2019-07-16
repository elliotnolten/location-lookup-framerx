import { Override, Data } from "framer"

const data = Data({
    output: "hallo",
    zbName: "",
    zbType: "",
    zbCity: "",
    zbCount: "",
    zbQuery: "Amsterdam",
    zbResults: [],
})

export const SearchLocation: Override = () => {
    return {
        onChange: (query: string, results: any) => {
            data.zbResults = results
            data.zbQuery = query
        },
    }
}

export const SearchSuggestions: Override = () => {
    return {
        query: data.zbQuery,
        results: data.zbResults,
        onSelect: (
            name: string,
            parent: string,
            type: string,
            count: number
        ) => {
            console.log(name, parent, type, count)
            data.zbName = name
            data.zbCity = parent
            data.zbType = type
            data.zbCount = count.toString()
        },
    }
}

export function showResult(): Override {
    return {
        Name: data.zbName,
        Count: data.zbCount,
        City: data.zbCity,
    }
}
