import styled from "styled-components";

export const WrapperStyled = styled.th<{ $width: string }>`
width: ${({ $width }) => $width};
display: flex;
justify-content: start;
align-items: center;
flex-wrap: wrap;
overflow-wrap: break-word;
`