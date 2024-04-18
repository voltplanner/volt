import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkStyled = styled(Link)<{$color:string}>`
color: ${({$color}) => $color};
text-decoration: underline;
cursor: pointer;
`
export const TaskIdStyled = styled(Link)`
color: #787878;
text-decoration: underline;
cursor: pointer;
`