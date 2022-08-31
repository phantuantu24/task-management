import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { inject } from "mobx-react";
import { Component } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import styled from "styled-components";
import { ISearch, TaskStatus } from "../services/tasks.service";
import TasksStore from "../stores/tasks.store";

const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: #c0cde0;
  border-radius: 5px;
  padding: 10px;
`;

interface IProps {
  tasksStore?: TasksStore;
}

interface IState extends ISearch {}

@inject("tasksStore")
class TasksFilters extends Component<IProps, IState> {
  filters$ = new Subject();

  constructor(props: IProps) {
    super(props);

    this.state = {
      status: props.tasksStore!.filters.status,
      search: props.tasksStore!.filters.search,
    };

    this.filters$.pipe(debounceTime(500)).subscribe((filters: any): void => {
      props.tasksStore!.updateFilters(filters);
    });
  }

  syncFilters = (): void => {
    const { status, search } = this.state;
    this.filters$.next({ status, search });
  };

  handleStatusFilterChange = (e: any): void => {
    const status: TaskStatus = e.target.value;
    this.setState({ status }, this.syncFilters);
  };

  handleSearchTermChange = (e: any): void => {
    const search: string = e.target.value;
    this.setState({ search }, this.syncFilters);
  };

  render() {
    return (
      <FiltersContainer>
        <Grid style={{ justifyContent: "space-between" }} container spacing="between">
          <Grid item>
            <ControlContainer>
              <FormControl style={{ width: "220px" }}>
                <TextField
                  placeholder="Search..."
                  value={this.state.search}
                  onChange={this.handleSearchTermChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </ControlContainer>
          </Grid>

          <Grid item>
            <ControlContainer>
              <FormControl style={{ width: "220px" }}>
                <Select
                  value={this.state.status}
                  onChange={this.handleStatusFilterChange}
                  displayEmpty
                >
                  <MenuItem value="">No status filter</MenuItem>
                  <MenuItem value={"OPEN"}>Open</MenuItem>
                  <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                  <MenuItem value={"DONE"}>Done</MenuItem>
                </Select>
              </FormControl>
            </ControlContainer>
          </Grid>
        </Grid>
      </FiltersContainer>
    );
  }
}

export default TasksFilters;
