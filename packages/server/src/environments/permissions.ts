import { AuthResolver } from '../lib/modules/auth/resolvers/auth.resolver'

export const defaultAllowPermissions = [
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
    },
    {
        methodName: AuthResolver.prototype.getMyRole.name,
        roleName: 'member',
    },
]
