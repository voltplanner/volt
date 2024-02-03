import { AuthDefaultPermissions } from '../lib/modules/auth/auth.config'
import { AuthResolver } from '../lib/modules/auth/resolvers/auth.resolver'

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
        methodName: AuthResolver.prototype.getMyUser.name,
        roleName: 'admin',
        editable: false,
    },
    {
        methodName: AuthResolver.prototype.getMyUser.name,
        roleName: 'member',
        editable: false,
    },
]
