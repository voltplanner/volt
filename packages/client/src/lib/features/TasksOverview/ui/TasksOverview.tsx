import { CSSProperties } from 'react'
import { Table } from 'shared'
type TColumn<T> = {
    title?: string
    dataIndex: string
    key: string
    width?: string
    render?: (dataIndex: string, data: any) => React.ReactNode
}
interface TasksOverviewProps<T> {
    columns: TColumn<T>[]
    data: any[]
    styles?: CSSProperties | undefined
    width?: string
}
export const TasksOverview = (props: TasksOverviewProps<any>) => {
    const { columns, data, styles, width } = props

    return <Table styles={{ width: width }} columns={columns} data={data} />
}
