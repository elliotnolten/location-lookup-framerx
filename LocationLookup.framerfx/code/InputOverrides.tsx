import { Override, Data } from "framer"

export const data = Data({
    InputValue: "",
})

export function InputEvents(): Override {
    return {
        onValueChange(value: any) {
            data.InputValue = value
        },
        onBlur(value: any) {},
        onFocus(value: any) {},
    }
}

export function Output(): Override {
    return {
        query: data.InputValue,
    }
}
