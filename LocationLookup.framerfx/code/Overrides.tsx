import * as React from "react"
import { Override } from "framer"

export const SelectSuggestion: Override = () => {
    return {
        onSelect: (selection: string) => {
            console.log(selection)
        },
    }
}
