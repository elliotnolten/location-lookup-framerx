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

// export const SelectSuggestion: Override = () => {
//     return {
//         onSelect: (name: any, parent: any, type: any, count: any) => {
//             console.log(name, parent, type, count)
//             data.zbName = name
//             data.zbType = type
//             data.zbCity = parent
//             data.zbCount = count.toString()
//         },
//     }
// }

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
        },
    }
}

// export function showResultZoekBox(): Override {
//     return {
//         Name: data.zbName,
//         Type: data.zbType,
//         City: data.zbCity,
//         Count: data.zbCount,
//     }
// }

// export const SelectPDOK: Override = () => {
//     return {
//         onSelect: (selection: string) => {
//             console.log(selection)
//             data.output = selection
//         },
//     }
// }

// export function showResultPDOK(): Override {
//     return {
//         text: data.output,
//     }
// }
