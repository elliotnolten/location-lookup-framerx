import { Override, Data } from "framer"

const data = Data({
    output: "hallo",
    zbName: "",
    zbNiveau: "",
    zbCity: "",
    zbCount: "",
    zbQuery: "Amsterdam",
    zbResults: [],
})

export const SearchLocation: Override = () => {
    return {
        zbNiveau: data.zbNiveau,
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
            niveau: string,
            count: number
        ) => {
            console.log(name, parent, niveau, count)
            // Store name
            data.zbName = name
            // Store parent city
            data.zbCity = parent !== null ? parent : ""
            // Store niveau
            data.zbNiveau = niveau
            // Store count
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
