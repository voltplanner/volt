import { AboutPage, EditRolePage, RolesPage } from 'pages'
import { AuthPage } from 'pages'
import { MainPage } from 'pages'
import { NotFoundPage } from 'pages'
import { SettingsPage } from 'pages'
import { UsersPage } from 'pages/UsersPage/UsersPage'
import { RouteProps } from 'react-router-dom'

type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
    ROLES = 'roles',
    USERS = 'users',
    ROLE_DETAILS = 'role_details',
    ABOUT = 'about',
    SETTINGS = 'settings',
    SIGNUP = 'signup',
    SIGNIN = 'signin',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.SIGNUP]: '/signup',
    [AppRoutes.SIGNIN]: '/signin',
    [AppRoutes.ROLES]: '/roles',
    [AppRoutes.USERS]: '/users',
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
    [AppRoutes.USERS]: {
        path: RoutePath.users,
        element: <UsersPage />,
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
    [AppRoutes.SIGNUP]: {
        path: RoutePath.signup,
        element: <div>123</div>,
    },
    [AppRoutes.SIGNIN]: {
        path: RoutePath.signin,
        element: <AuthPage />,
    },
}
