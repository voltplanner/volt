import { CreateProject, TasksOverview } from 'features'
import { WrapperStyled } from './styles'

const MainPage = () => {
    return (
        <WrapperStyled>
            <div>graph with hours</div>
            <CreateProject />
            <TasksOverview />
        </WrapperStyled>
    )
}
export default MainPage
