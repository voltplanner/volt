import { ApiRefreshToken } from 'shared/api/refresh'
import { Suspense, memo, useEffect, useMemo, useState } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { routeConfig } from 'shared'
import styled from 'styled-components'
import { useSessionStore } from 'entities'

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { session, getLocalSession, login, logout } = useSessionStore()
    const { refreshToken } = ApiRefreshToken({
        refreshToken: session.refreshToken,
    })

    const handleRefresh = async () => {
        await getLocalSession()
        try {
            const { data } = await refreshToken()
            login(data.refreshToken)
            setIsAuth(true)
        } catch (error) {
            console.error('Error refreshing token:', error)
            setIsAuth(false)
            logout()
            navigate('/signin')
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
        const token = localStorage.getItem('accessToken')
        if (
            token &&
            (location.pathname === '/signin' || location.pathname === '/signup')
        ) {
            navigate('/')
        }
        if (!token) {
            setIsAuth(false)
            if (
                location.pathname !== '/signin' &&
                location.pathname !== '/signup'
            ) {
                navigate('/signin')
            }
        } else if (expirationTime <= currentTimeInSeconds) {
            handleRefresh()
        } else {
            setIsAuth(true)
        }
    }, [session.accessToken])
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
    justify-content: center;
    align-items: center;
`
