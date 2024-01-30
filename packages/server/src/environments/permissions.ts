import { AuthResolver } from '../lib/modules/auth/resolvers/auth.resolver'

export const defaultPermissions = [
    {
        methodName: AuthResolver.prototype.createUser.name,
        roleName: 'admin',
        allow: true,
    },
    {
        methodName: AuthResolver.prototype.getUsers.name,
        roleName: 'admin',
        allow: true,
    },
    {
        methodName: AuthResolver.prototype.updateUser.name,
        roleName: 'admin',
        allow: true,
    },
    {
        methodName: AuthResolver.prototype.getRoles.name,
        roleName: 'admin',
        allow: true,
    },
    {
        methodName: AuthResolver.prototype.getRoleAvailableMethods.name,
        roleName: 'admin',
        allow: true,
    },
    {
        methodName: AuthResolver.prototype.changePermissions.name,
        roleName: 'admin',
        allow: true,
    },
]
