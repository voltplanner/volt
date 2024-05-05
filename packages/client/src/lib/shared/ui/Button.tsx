import { ButtonHTMLAttributes, ReactNode } from 'react'
import { OptionsIcon } from 'shared/assets/OptionsIcon'
import styled, { css } from 'styled-components'
const baseButtonStyles = css`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    white-space: nowrap;
    display: flex;
    transition: 0.3s;
    &:disabled {
        cursor: default;
    }
`
const variants = {
    primary: css`
        background-color: #1b998b;
        color: #fff;
        border: none;
        &:hover {
            background: #188a7d;
        }
        &:active {
            background: #188a7d;
            filter: brightness(85%);
        }
        &:disabled {
            background: #a5a5a5;
            cursor: default;
        }
    `,
    secondary: css`
        background-color: #6c757d;
        color: #000;
        border: none;
    `,
    ghost: css`
        background-color: transparent;
        color: #bcceec;
        border: none;
        &:hover {
            filter: brightness(55%);
        }
    `,
    image: css`
        padding: 0;
        border-radius: 50%;
        overflow: hidden;
        background: transparent;
        &:disabled {
            &:hover {
                filter: none;
            }
        }
        &:hover {
            filter: invert(50%);
        }
    `,
    context: css`
        padding: 0;
        border-radius: 0;
        background: transparent;
        &:hover {
            filter: invert(50%);
        }
    `,
}
const sizes = {
    auto: css`
        width: 100%;
        height: 100%;
    `,
    xs: css`
        width: 60px;
        height: 24px;
        font-size: 12px;
    `,
    sm: css`
        width: 80px;
        height: 32px;
        font-size: 14px;
    `,
    md: css`
        width: 100px;
        height: 40px;
        font-size: 16px;
    `,
    xl: css`
        width: 120px;
        height: 48px;
        font-size: 24px;
    `,
    fit: css`
        width: fit-content;
        height: fit-content;
    `,
}
const ButtonStyled = styled.button<ButtonProps>`
    ${baseButtonStyles}
    ${({ variant }) => variants[variant || 'primary']}
    ${({ size }) => sizes[size || 'fit']}
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'xs' | 'sm' | 'md' | 'xl' | 'auto'
    square?: boolean
    disabled?: boolean
    children?: ReactNode
    variant?: 'primary' | 'secondary' | 'ghost' | 'image' | 'context'
    image?: any
    altImage?: string
    width?: string
    height?: string
}

export const Button = (props: ButtonProps) => {
    const {
        children,
        onClick,
        variant,
        size,
        disabled,
        image,
        altImage = 'button image',
        width = 'fit-content',
        height = 'fit-content',
    } = props
    if (variant === 'image' && image) {
        return (
            <ButtonStyled
                onClick={onClick}
                variant={variant}
                size={size}
                disabled={disabled}
                {...props}
                style={{ width: width, height: height }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                >
                    {image}
                </div>
            </ButtonStyled>
        )
    }
    if (variant === 'context') {
        return (
            <ButtonStyled variant={variant}>
                <OptionsIcon />
            </ButtonStyled>
        )
    }
    return (
        <ButtonStyled
            onClick={onClick}
            variant={variant}
            size={size}
            disabled={disabled}
            {...props}
        >
            {children}
        </ButtonStyled>
    )
}
