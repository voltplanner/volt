import { SelectHTMLAttributes, memo, useRef, useState } from 'react'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import styled, { css } from 'styled-components'

type HTMLSelectProps = Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'value' | 'onChange' | 'readOnly'
>

export type SelectOption = {
    label: string
    value: string
}

interface SelectProps extends HTMLSelectProps {
    className?: string
    options: SelectOption[]
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
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
type SelectStyledProps = Omit<SelectProps, 'onChange'> & {
    $isError?: boolean
}
const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    width: 20em;
    min-height: 1.5em;
`
const SelectStyled = styled.div<SelectStyledProps>`
    min-height: 1.5em;
    display: flex;
    align-items: center;
    gap: 0.5em;
    width: 100%;
    padding: 8px 12px 8px 12px;
    border: none;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #ffffff;
    border: 1px solid;
    border-color: ${({ $isError }) => ($isError ? '#E04E88' : '#5a92ff')};
    font-size: 16px;
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
const StyledDivider = styled.div`
    background-color: #777;
    align-self: stretch;
    width: 0.05em;
`
const StyledCaret = styled.div`
    translate: 0 25%;
    border: 0.25em solid transparent;
    border-top-color: #777;
`
const StyledOptions = styled.div`
    position: absolute;
    display: none;
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 15em;
    overflow-y: auto;
    border: 0.05em solid #777;
    border-radius: 0.25em;
    width: 100%;
    left: 0;
    top: calc(100% + 0.25em);
    background-color: white;
    z-index: 100;
`
const StyledOption = styled.li`
    padding: 0.25em 0.5em;
    cursor: pointer;
`
const StyledClearButton = styled.button`
    background: none;
    color: #777;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    font-size: 1.35em;
`
const StyledValue = styled.span`
    flex-grow: 1;
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
`

export const Select = memo(
    ({
        className = '',
        value,
        onChange,
        variant,
        register,
        validationSchema,
        label,
        name,
        id,
        error,
        hint,
        options,
        ...otherProps
    }: SelectProps) => {
        const ref = useRef<HTMLDivElement>(null)
        const [isOpen, setIsOpen] = useState(false)

        function clearOptions() {
            onChange(undefined)
        }

        function selectOption(option: SelectOption) {
            if (option !== value) {
                onChange(option)
            }
        }

        return (
            <ContainerStyled>
                <TextContainerStyled>
                    <LabelStyled htmlFor={id}>{label}</LabelStyled>
                    <HintStyled>{hint}</HintStyled>
                </TextContainerStyled>
                <SelectStyled
                    className={className}
                    name={name}
                    options={options}
                    id={id}
                    ref={ref}
                    value={value}
                    onClick={() => setIsOpen((prev) => !prev)}
                    tabIndex={0}
                    onBlur={() => setIsOpen(false)}
                    variant={variant}
                    $isError={!!error}
                    {...register?.(
                        validationSchema?.name ?? '',
                        validationSchema?.schema,
                    )}
                    {...otherProps}
                >
                    <StyledValue>{value?.label}</StyledValue>
                    <StyledClearButton
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            clearOptions()
                        }}
                    >
                        &times;
                    </StyledClearButton>
                    <StyledDivider></StyledDivider>
                    <StyledCaret></StyledCaret>
                    <StyledOptions style={isOpen ? { display: 'block' } : {}}>
                        {options.map((option, index) => (
                            <StyledOption
                                onClick={(e) => {
                                    e.stopPropagation()
                                    selectOption(option)
                                    setIsOpen(false)
                                }}
                                key={option.value}
                            >
                                {option.label}
                            </StyledOption>
                        ))}
                    </StyledOptions>
                </SelectStyled>
                {error && <ErrorStyled>{error}</ErrorStyled>}
            </ContainerStyled>
        )
    },
)
