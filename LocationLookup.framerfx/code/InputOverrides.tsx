import { Override, Data } from "framer"

export const data = Data({
    query: "",
})

export function selectQuery(): Override {
    return {
        onSelect(value: any) {
            data.query = value
        },
    }
}

export function showQuery(): Override {
    return {
        text: data.query,
    }
}
