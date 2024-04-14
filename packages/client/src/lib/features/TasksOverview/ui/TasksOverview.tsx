import { Table } from 'shared'


export const TasksOverview = () => {
    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            width: '10%',
        },
        {
            title: 'Task id',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: '10%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            width: '10%',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '10%',
            render: (_: any, { type }: { type: string }) => <p style={{margin:0}}>{type}</p>,
        },
    ]
    const data = [
        {
            project: 'Amogus Bank',
            id: 'AB-0001',
            name: 'Task name',
            priority: '1',
            status: 'In progress',
            progress: '80',
            type: 'Bug',
        },
        {
            project: 'Amogus Bank',
            id: 'AB-0002',
            name: 'Task name',
            priority: '1',
            status: 'In progress',
            progress: '80',
            type: 'Task',
        },
        {
            project: 'Amogus Bank',
            id: 'AB-0003',
            name: 'Task name',
            priority: '2',
            status: 'In progress',
            progress: '80',
            type: 'Fix',
        },
        {
            project: 'Amogus Bank',
            id: 'AB-0004',
            name: 'Task name',
            priority: '2',
            status: 'In progress',
            progress: '80',
            type: 'Research',
        },
        {
            project: 'Amogus Bank',
            id: 'AB-0005',
            name: 'Task name',
            priority: '2',
            status: 'In progress',
            progress: '80',
            type: 'Docs',
        },
        {
            project: 'Amogus Bank',
            id: 'AB-0006',
            name: 'Task name',
            priority: '3',
            status: 'In progress',
            progress: '80',
            type: 'Docs',
        },
        {
            project: 'Amogus Bank',
            id: 'AB-0007',
            name: 'Task name',
            priority: '3',
            status: 'In progress',
            progress: '80',
            type: 'Docs',
        },
        {
            project: 'Amogus Bank',
            id: 'AB-0008',
            name: 'Task name',
            priority: '3',
            status: 'In progress',
            progress: '80',
            type: 'Docs',
        },
    ]
    return <Table styles={{ width: 1353 }} columns={columns} data={data} />
}
