import BaseHttpService from './base-http.service';
import queryString from 'query-string';
import { AxiosResponse } from 'axios';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface ISearch {
  status: TaskStatus;
  search: string;
}

export default class TasksService extends BaseHttpService {
  fetchTasks({ status, search }: ISearch): Promise<void | AxiosResponse<any, any>> {
    const queryObj: ISearch = {} as ISearch;

    if (status) {
      queryObj.status = status;
    }

    if (search) {
      queryObj.search = search;
    }

    const queryStr: string = queryString.stringify(queryObj);
    return this.get('tasks' + (queryStr ? `?${queryStr}` : ''));
  }

  async deleteTask(id: string): Promise<void> {
    await this.delete(`tasks/${id}`);
  }

  updateTaskStatus(id: string, status: TaskStatus): Promise<void | AxiosResponse<any, any>> {
    return this.patch(`tasks/${id}/status`, { status });
  }

  createTask(title: string, description: string): Promise<void | AxiosResponse<any, any>> {
    return this.post(`tasks`, { title, description });
  }
}
