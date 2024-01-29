import { HiddenForm } from 'entities'
import { useState } from 'react'
import { Button, ReactIcon } from 'shared'
import styled from 'styled-components'
import { ApiSignIn } from './api/api'

type LoginFormProps = {
    title: string
}

export const LoginForm = (props: LoginFormProps) => {
    const { title } = props
    const [email, setEmail] = useState('')

    // TODO: comment to disable eslint warning
    // const [password, setPassword] = useState('admin')
    const [password] = useState('admin')

    // const { signIn, data, loading, error } = ApiSignIn({
    //     email,
    //     password,
    // })

    const { signIn, data } = ApiSignIn({
        email,
        password,
    })

    const onChange = (value: string) => {
        setEmail(value)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            signIn()
            console.log('signIn', data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ContainerStyled>
            <HeaderStyled>
                <ReactIcon height="48px" width="48px" />
            </HeaderStyled>
            <TitleStyled>{title}</TitleStyled>
            <BodyStyled>
                <Button variant="primary">Continue with Gitlab</Button>
                <HiddenForm onChange={onChange} onSubmit={onSubmit} />
            </BodyStyled>
        </ContainerStyled>
    )
}

const ContainerStyled = styled.div`
    display: flex;
    user-select: none;
    width: 90vw;
    height: 100%;
    max-width: 320px;
    margin: 0px auto;
    display: flex;
    flex-grow: 1;
    flex-basis: auto;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: initial;
    flex-shrink: initial;
    gap: 12px;
    min-height: 0px;
    min-width: 0px;
`
const HeaderStyled = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`
const BodyStyled = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 12px;
`
const TitleStyled = styled.h2`
    font-size: 26px;
    margin: 0;
    color: #fff;
`
