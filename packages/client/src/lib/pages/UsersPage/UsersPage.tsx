import { Button, Header, Modal, Table } from 'shared'
import {
    ButtonsContainer,
    ContentStyled,
    PageContainerStyled,
    WrapperStyled,
} from './styles'
import { InviteUser } from 'features'

export const UsersPage = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            render: (
                _: any,
                { avatar, name }: { avatar: string; name: string },
            ) => <>{name}</>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            render: (_: any, { email }: { email: string }) => <>{email}</>,
        },
        {
            title: 'Last active',
            dataIndex: 'lastActive',
            key: 'lastActive',
            width: '20%',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: '20%',
        },
        {
            title: '',
            dataIndex: 'options',
            key: 'options',
            width: '10%',
            render: (_: any, { options }: { options: string }) => (
                <Button variant="context" />
            ),
        },
    ]
    const data = [
        {
            id: '0',
            name: 'Task name',
            email: 'doge@palka.bonk',
            lastActive: 'Vchera',
            role: 'gay',
            options: 'chapa',
        },
        {
            id: '1',
            name: 'Task name',
            email: 'doge@palka.bonk',
            lastActive: 'Vchera',
            role: 'gay',
            options: 'chapa',
        },
        {
            id: '2',
            name: 'Task name',
            email: 'doge@palka.bonk',
            lastActive: 'Vchera',
            role: 'gay',
            options: 'chapa',
        },
        {
            id: '3',
            name: 'Task name',
            email: 'doge@palka.bonk',
            lastActive: 'Vchera',
            role: 'gay',
            options: 'chapa',
        },
        {
            id: '4',
            name: 'Task name',
            email: 'doge@palka.bonk',
            lastActive: 'Vchera',
            role: 'gay',
            options: 'chapa',
        },
    ]
    return (
        <PageContainerStyled>
            <ButtonsContainer>
                <InviteUser />
            </ButtonsContainer>
            <WrapperStyled>
                <ContentStyled>
                    <Header
                        title={'Users'}
                        subtitle={'Everyone that has signed into Volt is here.'}
                    />
                    <Table
                        columns={columns}
                        data={data}
                        height="100%"
                        styles={{ width: '800px' }}
                    />
                </ContentStyled>
            </WrapperStyled>
        </PageContainerStyled>
    )
}
