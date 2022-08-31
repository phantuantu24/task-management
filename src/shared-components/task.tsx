import React, { Component } from "react";

import styled from "styled-components";
import { inject } from "mobx-react";
import TasksStore from "../stores/tasks.store";
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskStatus } from "../services/tasks.service";
import Grid from "@mui/material/Grid";

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

interface IProps {
  tasksStore?: TasksStore;
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

@inject("tasksStore")
class Task extends Component<IProps> {
  deleteTask = () => {
    this.props.tasksStore!.deleteTask(this.props.id);
  };

  handleStatusChange = (e: any) => {
    this.props.tasksStore!.updateTaskStatus(this.props.id, e.target.value);
  };

  render() {
    const { title, description } = this.props;
    console.log('trigger tasks item');
    
    return (
      <CardContainer>
        <Card>
          <CardContent>
            <CardTitle>{title}</CardTitle>
            {description}
          </CardContent>
          <CardActions style={{ padding: "14px" }} disableSpacing>
            <Grid style={{ justifyContent: "space-between" }} container>
              <Grid item>
                <FormControl style={{ width: "140px" }}>
                  <Select
                    value={this.props.status}
                    onChange={this.handleStatusChange}
                    displayEmpty
                  >
                    <MenuItem value={"OPEN"}>Open</MenuItem>
                    <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                    <MenuItem value={"DONE"}>Done</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid style={{ display: "flex", alignItems: "center" }} item>
                <IconButton onClick={this.deleteTask}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </CardContainer>
    );
  }
}

export default Task;
