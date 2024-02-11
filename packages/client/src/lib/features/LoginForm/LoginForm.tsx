import { useState } from 'react'
import { BackIcon, Button, ReactIcon } from 'shared'
import styled from 'styled-components'
import { ApiSignIn } from './api/api'
import { useFormStore } from './model/useFormStore'
import { InternalLoginForm } from './ui/InternalLoginForm'
import { ExternalLoginForm } from './ui/ExternalLoginForm'
import { useSessionStore } from 'entities'
import { useNavigate } from 'react-router-dom'

type LoginFormProps = {
    title: string
}

export const LoginForm = (props: LoginFormProps) => {
    const { title } = props
    const { setEmail, setPassword, resetStore, email, password } =
        useFormStore()
    const { login } = useSessionStore()
    const [isInternal, setIsInternal] = useState(false)
    const navigate = useNavigate()
    const { signIn } = ApiSignIn({
        email,
        password,
    })

    const onChangeEmail = (value: string) => {
        setEmail(value)
    }
    const onChangePassword = (value: string) => {
        setPassword(value)
    }
    const onInternalClick = () => {
        setIsInternal((prev) => !prev)
        resetStore()
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const { data } = await signIn()
            login(data.signIn)
            navigate('/main')
        } catch (e) {
            console.log('error => ', e)
        }
    }
    const formSelector = () => {
        if (isInternal) {
            return (
                <InternalLoginForm
                    onChangeEmail={onChangeEmail}
                    onChangePassword={onChangePassword}
                    onSubmit={onSubmit}
                    disabled={false}
                />
            )
        }

        return <ExternalLoginForm onClick={onInternalClick} />
    }
    return (
        <ContainerStyled>
            <HeaderStyled>
                <ReactIcon height="48px" width="48px" />
            </HeaderStyled>
            <TitleWrapper>
                {isInternal && (
                    <Button
                        style={{ position: 'absolute', left: 0 }}
                        variant="ghost"
                        onClick={onInternalClick}
                    >
                        <BackIcon />
                    </Button>
                )}
                <TitleStyled>{title}</TitleStyled>
            </TitleWrapper>
            {formSelector()}
            <BodyStyled></BodyStyled>
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
const TitleWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
`
const TitleStyled = styled.h2`
    font-size: 26px;
    margin: 0;
    color: #fff;
`
