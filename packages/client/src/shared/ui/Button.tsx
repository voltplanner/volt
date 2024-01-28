import { ButtonHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button<ButtonProps>`
    width: ${(props) => {
        switch (props.size) {
            case 'auto':
                return 'fit-content'
            case 'xs':
                return '60px'
            case 'sm':
                return '80px'
            case 'md':
                return '100px'
            case 'xl':
                return '120px'
            default:
                return '100%'
        }
    }};
    height: ${(props) => {
        switch (props.size) {
            case 'auto':
                return '100%'
            case 'xs':
                return '24px'
            case 'sm':
                return '32px'
            case 'md':
                return '40px'
            case 'xl':
                return '48px'
            default:
                return '100%'
        }
    }};
    white-space: nowrap;
    font-size: 14px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${(props) =>
        props.variant === 'primary' ? '#1b998b' : 'gray'};
    color: ${(props) => (props.variant === 'primary' ? 'white' : 'black')};
    &:hover {
        background: #188a7d;
        transition: 0.1s;
    }
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'xs' | 'sm' | 'md' | 'xl' | 'auto'
    square?: boolean
    disabled?: boolean
    children?: ReactNode
    variant?: 'primary' | 'secondary'
}

export const Button = (props: ButtonProps) => {
    const { children, onClick, variant, size } = props
    return (
        <ButtonStyled onClick={onClick} variant={variant} size={size}>
            {children}
        </ButtonStyled>
    )
}
