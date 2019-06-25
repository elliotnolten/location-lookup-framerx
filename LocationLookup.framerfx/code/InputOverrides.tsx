import { Override, Data } from "framer"

const data = Data({
    InputValue: "",
})

export function InputEvents(): Override {
    return {
        onValueChange(value: any) {
            console.log(value)
            data.InputValue = value
        },
        onBlur(value: any) {
            console.log(`onBlur: ${data.InputValue}`)
        },
        onFocus(value: any) {
            console.log(`onFocus: ${data.InputValue}`)
        },
    }
}

export function Output(): Override {
    return {
        text: data.InputValue,
    }
}
