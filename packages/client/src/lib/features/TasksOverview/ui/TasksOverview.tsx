import { TableStyled, TitleStyled, WrapperStyled } from './styles'
type TColumn = {
    title?: string
    dataIndex: string
    key: string
}
interface TasksOverviewProps {
    columns: TColumn[]
}
export const TasksOverview = (props) => {
    const { columns, data } = props
    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Task id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
    ]
    return (
        <WrapperStyled>
            <TitleStyled>My tasks overview</TitleStyled>
            <TableStyled></TableStyled>
        </WrapperStyled>
    )
}
