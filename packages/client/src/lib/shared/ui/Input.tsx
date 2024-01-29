import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    onChange?: (value: string) => void
    autofocus?: boolean
    readonly?: boolean
    variant?: 'primary' | 'secondary'
}
type InputStyledProps = Omit<InputProps, 'onChange'> & {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputStyled = styled.input<InputStyledProps>`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    padding: 0 8px;
    background-color: ${(props) =>
        props.variant === 'primary' ? '#1b998b' : 'gray'};
    color: ${(props) => (props.variant === 'primary' ? 'white' : 'black')};
    &:hover {
        background: #188a7d;
        transition: 0.1s;
    }
`
export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        variant,
        ...otherProps
    } = props
    const ref = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true)
            ref.current?.focus()
        }
    }, [autofocus])

    return (
        <InputStyled
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readonly}
            variant={variant}
            {...otherProps}
        />
    )
})
