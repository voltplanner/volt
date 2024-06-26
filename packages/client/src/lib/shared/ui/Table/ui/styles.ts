import styled from 'styled-components'

export const WrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
`
export const TitleStyled = styled.h3``
export const THeadStyled = styled.tr`
    display: flex;
    width: 100%;
    justify-content: space-between;
    background: #eaf1ff;
    padding: 13px 16px;
`
export const TBodyStyled = styled.tbody`
    width: 100%;
`
export const PStyled = styled.p`
    margin: 0;
`
export const TableStyled = styled.table<{ $height: string }>`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: ${({ $height }) => $height};
    overflow: auto;
    background: #fff;
    position: relative;
    border-collapse: collapse;
`
