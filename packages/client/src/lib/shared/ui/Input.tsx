import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import {
    FieldValues,
    RegisterOptions,
    UseFormRegister,
    UseFormReturn,
} from 'react-hook-form'
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
    register?: UseFormRegister<any>
    validationSchema?: {
        name: string
        schema: RegisterOptions<FieldValues, string>
    }
    name?: string
    label?: string
    id?: string
    error?: string
    hint?: string
}
type InputStyledProps = Omit<InputProps, 'onChange'> & {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    $isError?: boolean
}
const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const InputStyled = styled.input<InputStyledProps>`
    width: 100%;
    padding: 8px 12px 8px 12px;
    border: none;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #ffffff;
    border: 1px solid;
    border-color: ${({ $isError }) => ($isError ? '#E04E88' : '#5a92ff')};
    font-size: 16px;
    color: ${(props) => (props.variant === 'primary' ? '#1F1F1F' : 'white')};
    transition: 0.3s;
    &:focus {
        outline: none;
        background: #ffffff;
        border-color: #002b80;
        &::placeholder {
            color: #bcbcbc;
        }
        border-color: ${({ $isError }) => ($isError ? '#E04E88' : '#002b80')};
    }
    &::placeholder {
        color: #c9c9c9;
    }
    &:disabled {
        border: 1px solid #e9e9e9;
        background: #e9e9e9;
        color: #e9e9e9;
        &::placeholder {
            color: #a5a5a5;
        }
    }
`
const TextContainerStyled = styled.div`
    display: flex;
    margin-bottom: 5px;
    justify-content: space-between;
`
const LabelStyled = styled.label`
    display: inline-flex;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
`
const ErrorStyled = styled.p`
    color: #bcbcbc;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
`
const HintStyled = styled.p`
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    color: #bcbcbc;
`
export const Input = memo((props: InputProps) => {
    const {
        className = '',
        value,
        onChange,
        type = 'text',
        autofocus,
        readonly,
        variant,
        register,
        validationSchema,
        label,
        name,
        id,
        error,
        hint,
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
        <ContainerStyled>
            <TextContainerStyled>
                <LabelStyled htmlFor={id}>{label}</LabelStyled>
                <HintStyled>{hint}</HintStyled>
            </TextContainerStyled>
            <InputStyled
                className={className}
                name={name}
                id={id}
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                variant={variant}
                $isError={!!error}
                {...register?.(
                    validationSchema?.name ?? '',
                    validationSchema?.schema,
                )}
                {...otherProps}
            />
            {error && <ErrorStyled>{error}</ErrorStyled>}
        </ContainerStyled>
    )
})
