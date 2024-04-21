import { PriorityTag, ReversableProgress, Table } from 'shared'
import { LinkStyled } from './styles'
import styled from 'styled-components'
import { useState } from 'react'

export const TasksOverview = () => {
    const [state, setState] = useState('80')
    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            width: '10%',
            render: (
                _: any,
                { project, projectId }: { project: string; projectId: string },
            ) => (
                <LinkStyled $color="#6FA0FF" to={`/projects/${projectId}`}>
                    {project}
                </LinkStyled>
            ),
        },
        {
            title: 'Task id',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            render: (_: any, { id }: { id: string }) => (
                <LinkStyled $color="#787878" to={`/tasks/${id}`}>
                    {id}
                </LinkStyled>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            render: (_: any, { name, id }: { name: string; id: string }) => (
                <LinkStyled $color="#1F1F1F" to={`/tasks/${id}`}>
                    {name}
                </LinkStyled>
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: '10%',
            render: (_: any, { priority }: { priority: string }) => (
                <PriorityTag priority={priority} />
            ),
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
            render: (_: any, { progress }: { progress: string }) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <ReversableProgress
                        value={state}
                        isReversable={true}
                        callback={setState}
                        max={'100'}
                    />
                </div>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '10%',
            render: (_: any, { type }: { type: string }) => (
                <p style={{ margin: 0 }}>{type}</p>
            ),
        },
    ]
    const data = [
        {
            project: 'Amogus Bank',
            projectId: 'AmogusId',
            id: 'AB-0001',
            name: 'Task name',
            priority: '1',
            status: 'In progress',
            progress: '80',
            type: 'Bug',
        },
        {
            project: 'Amogus Bank',
            projectId: 'AmogusId',
            id: 'AB-0002',
            name: 'Task name',
            priority: '2',
            status: 'In progress',
            progress: '80',
            type: 'Task',
        },
        {
            project: 'Amogus Bank',
            projectId: 'AmogusId',
            id: 'AB-0003',
            name: 'Task name',
            priority: '3',
            status: 'In progress',
            progress: '80',
            type: 'Fix',
        },
        {
            project: 'Amogus Bank',
            projectId: 'AmogusId',
            id: 'AB-0004',
            name: 'Task name',
            priority: '4',
            status: 'In progress',
            progress: '80',
            type: 'Research',
        },
        {
            project: 'Amogus Bank',
            projectId: 'AmogusId',
            id: 'AB-0005',
            name: 'Task name',
            priority: '5',
            status: 'In progress',
            progress: '80',
            type: 'Docs',
        },
        {
            project: 'Amogus Bank',
            projectId: 'AmogusId',
            id: 'AB-0006',
            name: 'Task name',
            priority: '3',
            status: 'In progress',
            progress: '80',
            type: 'Docs',
        },
        {
            project: 'Amogus Bank',
            projectId: 'AmogusId',
            id: 'AB-0007',
            name: 'Task name',
            priority: '3',
            status: 'In progress',
            progress: '80',
            type: 'Docs',
        },
        {
            project: 'Amogus Bank',
            projectId: 'AmogusId',
            id: 'AB-0008',
            name: 'Task name',
            priority: '3',
            status: 'In progress',
            progress: '80',
            type: 'Docs',
        },
    ]
    return (
        <Table
            height="450px"
            styles={{ width: 1353 }}
            columns={columns}
            data={data}
        />
    )
}
