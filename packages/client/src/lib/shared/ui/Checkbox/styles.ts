import styled from 'styled-components'

export const CheckboxContainer = styled.div`
    display: flex;
    flex-grow: 0;
    align-items: center;
`

export const CheckboxLabel = styled.label`
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    gap: 20px;
    font-weight: 500;
    color: #333;
`

export const CheckboxInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`

export const CheckboxCheckmark = styled.span`
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #666;
    border-radius: 3px;
    transition: background-color 0.3s;

    ${CheckboxInput}:checked ~ & {
        background-color: #2196f3;
    }
`
