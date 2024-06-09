import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

export const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const HintStyled = styled.p`
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    color: #bcbcbc;
`
export const LabelStyled = styled.label`
    display: inline-flex;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
`
export const TextContainerStyled = styled.div`
display: flex;
margin-bottom: 5px;
justify-content: space-between;
`
export const ErrorStyled = styled.p`
color: #bcbcbc;
font-size: 12px;
font-weight: 400;
margin: 0;
`
type HTMLTextareaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly'
> & {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    $isError?: boolean
}

export const TextareaStyled = styled.textarea<HTMLTextareaProps>`
`