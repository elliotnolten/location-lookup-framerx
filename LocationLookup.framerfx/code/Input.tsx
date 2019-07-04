import * as React from "react"
import { Frame, addPropertyControls, ControlType, FrameProps } from "framer"
import styled from "styled-components"

type Props = Partial<FrameProps> & {
    value: string
    onValueChange: (value: any) => any
    type: string
    delay: number
    placeholder: string
    onBlur: (value: any) => void
    onFocus: (value: any) => void
    onInputStart: () => any
}

export function Input(props: Partial<Props>) {
    const {
        value: initialValue,
        onValueChange,
        type,
        placeholder,
        delay,
        onBlur,
        onFocus,
        onInputStart,
    } = props

    // Store the input's last value in a ref
    const input = React.useRef<HTMLInputElement>()
    const inputValue = React.useRef(initialValue)

    // Initialize state with props values
    const [state, setState] = React.useState({
        value: initialValue,
        typing: false,
        focused: false,
    })

    // When the hook receives new props values, overwrite the state
    React.useEffect(() => {
        // Sync inputValue ref with initialValue
        inputValue.current = initialValue

        setState({
            ...state,
            value: initialValue,
        })
    }, [initialValue])

    const handleInput = event => {
        const { value } = event.target

        // Store the value in the inputValue ref
        inputValue.current = value

        // If we're not already typing, run props.onInputStart()
        if (!state.typing) {
            onInputStart()
        }

        // Set value and typing states
        setState({ ...state, value, typing: true })

        // Check whether inputValue is still the same
        delay > 0
            ? // If we have a delay, use the delay
              setTimeout(() => updateState(value), delay * 1000)
            : // Otherwise, check immediately
              updateState(value)
    }

    // A shared callback to update state
    const updateState = value => {
        // Compare the current value against the inputValue ref,
        // and bail if there's a disagreement (it means that the user)
        // has entered new text while the timeout was running
        if (value === inputValue.current) {
            onValueChange(value)
            setState({ ...state, typing: false, value })
        }
    }

    // Set the focus state when the user clicks in or out of the input
    const setFocus = (focused: boolean) => {
        if (focused) {
            onFocus(state.value)
        } else {
            onBlur(state.value)
        }
        setState({ ...state, focused })
    }

    return (
        <Frame
            center
            backgroundColor={""}
            width={props.width}
            height={props.height}
        >
            <InputField
                placeholder={placeholder}
                type={type}
                ref={input}
                onChange={e => handleInput(e)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
        </Frame>
    )
}

Input.defaultProps = {
    value: "",
    width: 200,
    height: 48,
    placeholder: "Type something",
    type: "text",
    onValueChange: () => null,
    onFocus: () => null,
    onBlur: () => null,
    onInputStart: () => null,
    delay: 0.25,
}

addPropertyControls(Input, {
    placeholder: { type: ControlType.String, title: "Placeholder" },
    type: {
        type: ControlType.Enum,
        title: "Type",
        options: ["text", "number", "search", "password", "email"],
    },
    value: { type: ControlType.String, title: "Initial Value" },
})

const InputField = styled.input`
    width: 100%;
    height: 100%;
    padding: 11px 16px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 2px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: border .2s cubic-bezier(.23,1,.32,1);
    box-shadow: inset 0 1px 2px 0 rgba(0,0,0,.2);
    font-family: "Proxima Nova";
    font-size: 16px;
    &:focus {
        border-color: #999;
        outline: none;
    }
`
