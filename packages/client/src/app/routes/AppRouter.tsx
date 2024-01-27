import { Suspense, memo, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CircularProgress, Container } from '@mui/material'
import { routeConfig } from 'shared'

const AppRouter = () => {
    const isAuth = true
    const routes = useMemo(() => {
        return Object.values(routeConfig).filter((route) => {
            if (route.authOnly && !isAuth) {
                return false
            }
            return true
        })
    }, [isAuth])

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense fallback={<CircularProgress />}>
                            <Container sx={{ minHeight: '100%' }}>
                                {element}
                            </Container>
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    )
}

export default memo(AppRouter)
