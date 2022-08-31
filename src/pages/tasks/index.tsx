import { CircularProgress, Fab, IconButton } from "@mui/material";
import { inject, observer } from "mobx-react";
import { Component } from "react";
import styled from "styled-components";
import Task from "../../shared-components/task";
import TasksStore from "../../stores/tasks.store";
import UserStore from "../../stores/user.store";
import AddIcon from '@mui/icons-material/Add';
import TasksFilters from "../../shared-components/TasksFilters";
import SignOutIcon from '@mui/icons-material/Logout';
import { NavigateFunction } from "react-router";

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #edf4ff;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TasksContainer = styled.div`
  padding-top: 20px;
`;

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;

  .signOutIcon {
    fill: #edf4ff;
  }
`;

interface IProps {
  tasksStore?: TasksStore;
  userStore?: UserStore;
  navigate?: NavigateFunction;
}

@inject("tasksStore", "routerStore", "userStore")
@observer
class TasksPage extends Component<IProps> {

  componentDidMount() {
    console.log('trigger', this.props.tasksStore);
    
    this.props.tasksStore!.fetchTasks();
  }

  handleSignOut = () => {
    const { userStore, tasksStore, navigate } = this.props;
    userStore!.signout();
    tasksStore!.resetTasks();
    navigate!("/signin");
  };

  renderTasks = () => {
    const { tasksStore } = this.props;
    console.log('renderTasks', this.props.tasksStore);

    if (!tasksStore!.tasks.length) {
      console.log('no length');
      
      return (
        <EmptyTasksPlaceholder>
          No tasks available. Create one?
        </EmptyTasksPlaceholder>
      );
    }

    return tasksStore!.tasks.map((task) => (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
      />
    ));
  };

  render() {
    if(this.props.tasksStore?.tasks) {
      return (
        <TasksWrapper>
          <TasksHeader>
            <Title>Get things done.</Title>
  
            <CreateButtonContainer>
              <Fab
                variant="extended"
                onClick={() => this.props.navigate!("/tasks/create")}
              >
                <AddIcon />
                Create Task
              </Fab>
  
              <SignOutIconContainer>
                <IconButton onClick={this.handleSignOut}>
                  <SignOutIcon className="signOutIcon" />
                </IconButton>
              </SignOutIconContainer>
            </CreateButtonContainer>
          </TasksHeader>
  
          <TasksFilters />
  
          <TasksContainer>{this.renderTasks()}</TasksContainer>
        </TasksWrapper>
      );
    } else {
      return <CircularProgress />
    }
  }
}

export default TasksPage;
