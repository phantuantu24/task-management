import { AxiosResponse } from 'axios';
import { observable, action } from 'mobx';
import TasksService, { ISearch, TaskStatus } from '../services/tasks.service';

export default class TasksStore {
  @observable tasks: any[] = [];
  @observable filters: ISearch = {} as ISearch;

  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  @action.bound
  updateFilters({ status, search }: ISearch): void {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchTasks();
  }

  @action.bound
  resetTasks(): void {
    this.tasks = [];
  }

  @action.bound
  async fetchTasks(): Promise<void> {
    const result: void | AxiosResponse<any, any> = await this.tasksService.fetchTasks(this.filters);

    if (result) {
      this.tasks = result.data;
    }
  }

  @action.bound
  async createTask(title: string, description: string): Promise<void> {
    const result: void | AxiosResponse<any, any> = await this.tasksService.createTask(title, description);

    if (result) {
      this.tasks.push(result.data as any);
    }
  }

  @action.bound
  async deleteTask(id: string): Promise<void> {
    const idx: number = this.tasks.findIndex(task => task.id === id);
    await this.tasksService.deleteTask(id);
    this.tasks.splice(idx, 1);
  }

  @action.bound
  async updateTaskStatus(id: string, status: TaskStatus): Promise<void> {
    const task: any = this.tasks.find(task => task.id === id);
    await this.tasksService.updateTaskStatus(id, status);
    task.status = status;
  }
}
