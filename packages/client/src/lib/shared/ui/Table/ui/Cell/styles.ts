import styled from "styled-components";

export const WrapperStyled = styled.td<{ $width: string }>`
width: ${({ $width }) => $width};
display: flex;
justify-content: start;
align-items: center;
flex-wrap: wrap;
overflow-wrap: break-word;
height: fit-content;
* {
    width: 100%;
}
`