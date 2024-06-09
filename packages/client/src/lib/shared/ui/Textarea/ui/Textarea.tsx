import { memo, TextareaHTMLAttributes, useEffect, useRef, useState } from "react"
import { ContainerStyled, ErrorStyled, HintStyled, LabelStyled, TextareaStyled, TextContainerStyled } from "./styles"

type HTMLInputProps = Omit<
TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly'
>
interface TextareaProps extends HTMLInputProps {
    className?: string
    value?: string | number
    onChange?: (value: string) => void
    autofocus?: boolean
    readonly?: boolean
    variant?: 'primary' | 'secondary'
    name?: string
    label?: string
    id?: string
    error?: string
    hint?: string
}
export const Textarea = memo((props:TextareaProps) => {
    const {
        className = '',
        value,
        onChange,
        autofocus,
        readonly,
        variant = 'primary',
        label,
        name,
        id,
        error,
        hint,
        ...otherProps
    } = props
    const ref = useRef<HTMLTextAreaElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <ContainerStyled>
            <TextContainerStyled>
                <LabelStyled htmlFor={id}>{label}</LabelStyled>
                <HintStyled>{hint}</HintStyled>
            </TextContainerStyled>
            <TextareaStyled 
                className={className}
                name={name}
                id={id}
                ref={ref}
                value={value}
                onChange={onChangeHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                $isError={!!error}
                {...otherProps}/>
            {error && <ErrorStyled>{error}</ErrorStyled>}
        </ContainerStyled>
    )
})