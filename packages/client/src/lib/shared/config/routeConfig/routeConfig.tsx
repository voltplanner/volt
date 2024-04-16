import { AboutPage, EditRolePage, RolesPage } from 'pages'
import { AuthPage } from 'pages'
import { MainPage } from 'pages'
import { NotFoundPage } from 'pages'
import { SettingsPage } from 'pages'
import { RouteProps } from 'react-router-dom'

type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
    ROLES = 'roles',
    ROLE_DETAILS = 'role_details',
    ABOUT = 'about',
    SETTINGS = 'settings',
    AUTH = 'auth',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: '/',
    [AppRoutes.MAIN]: '/main',
    [AppRoutes.ROLES]: '/roles',
    [AppRoutes.ROLE_DETAILS]: '/roles/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.ROLES]: {
        path: RoutePath.roles,
        element: <RolesPage />,
        authOnly: true,
    },
    [AppRoutes.ROLE_DETAILS]: {
        path: `${RoutePath.role_details}:id`,
        element: <EditRolePage />,
        authOnly: true,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <SettingsPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
    },
}
