import { ApiRefreshToken } from 'shared/api/refresh'
import { Suspense, memo, useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig, useSessionStore } from 'shared'
import styled from 'styled-components'

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
    const { session, getLocalSession, login, logout } = useSessionStore()
    const { refreshToken } = ApiRefreshToken({
        refreshToken: session.refreshToken,
    })
    
    const handleRefresh = async () => {
        await getLocalSession()
        try {
            const { data } = await refreshToken()
            console.log('Refreshed token data:', data)
            login(data.refreshToken)
            setIsAuth(true)
        } catch (error) {
            console.error('Error refreshing token:', error)
            setIsAuth(false)
            logout()
        }
    }

    const routes = useMemo(() => {
        return Object.values(routeConfig).filter((route) => {
            if (route.authOnly && !isAuth) {
                return false
            }
            return true
        })
    }, [isAuth])

    useEffect(() => {
        const expirationTime = Number(localStorage.getItem('expiresAt'))
        const currentTimeInSeconds = Math.floor(Date.now() / 1000)
        if (expirationTime <= currentTimeInSeconds) {
            handleRefresh()
        }
    }, [])
    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense fallback={''}>
                            <PageWrapperStyled>{element}</PageWrapperStyled>
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    )
}

export default memo(AppRouter)
const PageWrapperStyled = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`
