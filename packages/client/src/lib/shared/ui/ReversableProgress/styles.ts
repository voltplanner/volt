import styled from "styled-components";

export const ProgressStyled = styled.progress<{ color?: string, background?: string, hover?: string }>`
    background: transparent;
    color: transparent;
    height: 8px;
    cursor: pointer;
    transition: .3s;
    &::-moz-progress-bar {
        background: ${({ background }) => background ?? '#eaf1ff'};
    }

    &::-webkit-progress-value {
        background: ${({ background }) => background ?? '#5a92ff'};
        border-radius: 100px;
        &:hover {
            background: ${({ hover }) => hover ?? '#98b9fc'};
        }
    }

    &::-webkit-progress-bar {
        background: ${({ background }) => background ?? '#eaf1ff'};
        border-radius: 100px;
    }
`
export const PopupStyled = styled.div`
position: absolute;
top: -20px;
background: #fff;
box-shadow: 0px 0px 21px 0px rgba(0,0,0,0.15);
border-radius: 10px 10px 0 0;
width: 100%;
height: 20px;
`
export const ButtonSaveStyled = styled.button`
border-radius: 10px 0 0 0;
background: #fff;
border: 0;
height: 100%;
width: 50%;
cursor: pointer;
transition: .3s;
&:hover{
    background: #ddd;
}
`
export const ButtonCancelStyled = styled.button`
border-radius: 0 10px 0 0 ;
background: #fff;
border: 0;
width: 50%;
height: 100%;
cursor: pointer;
transition: .3s;
&:hover{
    background: #ddd;
}
`
export const InputStyled = styled.input`
outline: none;
width: 100%;
height: 20px;
`