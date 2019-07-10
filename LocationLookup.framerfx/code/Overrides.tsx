import { Override } from "framer"

export function Output(): Override {
    return {
        onSelect(value: any) {
            console.log(value)
        },
    }
}
