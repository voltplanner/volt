import { AuthDefaultPermissions } from '../lib/modules/auth/auth.config'
import { AuthResolver } from '../lib/modules/auth/resolvers/auth.resolver'
import { NotificationsResolver } from '../lib/modules/notifications/resolvers/notifications.resolver'

export const defaultAllowPermissions: AuthDefaultPermissions[] = [
    {
        methodName: AuthResolver.prototype.createUser.name,
        roleName: 'admin',
    },
    {
        methodName: AuthResolver.prototype.getUsers.name,
        roleName: 'admin',
    },
    {
        methodName: AuthResolver.prototype.updateUser.name,
        roleName: 'admin',
    },
    {
        methodName: AuthResolver.prototype.getRoles.name,
        roleName: 'admin',
    },
    {
        methodName: AuthResolver.prototype.changePermissions.name,
        roleName: 'admin',
    },
    {
        methodName: AuthResolver.prototype.changeUserRole.name,
        roleName: 'admin',
    },
    {
        methodName: AuthResolver.prototype.getMyRole.name,
        roleName: 'admin',
        editable: false,
    },
    {
        methodName: AuthResolver.prototype.getMyRole.name,
        roleName: 'member',
        editable: false,
    },
    {
        methodName: AuthResolver.prototype.getUser.name,
        roleName: 'admin',
        editable: false,
    },
    {
        methodName: AuthResolver.prototype.getUser.name,
        roleName: 'member',
        editable: false,
    },
    {
        methodName: NotificationsResolver.prototype.linkTelegramAccount.name,
        roleName: 'admin',
        editable: false,
    },
    {
        methodName: NotificationsResolver.prototype.unlinkTelegramAccount.name,
        roleName: 'member',
        editable: false,
    },
]
