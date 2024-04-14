import { CSSProperties } from 'react'
import { Cell } from './Cell/Cell'
import { THeadStyled, TableStyled, TBodyStyled, TitleStyled, WrapperStyled } from './styles'
import { Row } from './Row/Row'
import { Th } from './Th/Th'
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

    return (
        <WrapperStyled style={styles}>
            <TitleStyled>My tasks overview</TitleStyled>
            <TableStyled>
                <THeadStyled>
                    {columns.map(({ title, key, width }) => (
                        <Th width={width} key={key}>
                            {title}
                        </Th>
                    ))}
                </THeadStyled>
                <TBodyStyled>
                    {data.map((elem) => (
                        <Row style={{ maxWidth: width }}>
                            {columns.map(
                                ({ dataIndex, key, width, render }) => (
                                    <Cell width={width} key={key}>
                                        {render
                                            ? render(
                                                  elem[
                                                      dataIndex as keyof typeof data
                                                  ],
                                                  elem,
                                              )
                                            : elem[dataIndex]}
                                    </Cell>
                                ),
                            )}
                        </Row>
                    ))}
                </TBodyStyled>
            </TableStyled>
        </WrapperStyled>
    )
}
