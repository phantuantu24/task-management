import { Provider } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AuthService from "./services/auth.service";
import TasksService from "./services/tasks.service";
import TasksStore from "./stores/tasks.store";
import UserStore from "./stores/user.store";

interface IStore {
  userStore?: UserStore;
  routerStore?: RouterStore;
  tasksStore?: TasksStore;
}

interface IService {
  authService?: AuthService;
  tasksService?: TasksService;
}

const services: IService = {};
const stores: IStore = {};

stores.routerStore = new RouterStore();

services.tasksService = new TasksService();
services.authService = new AuthService();

stores.tasksStore = new TasksStore(services.tasksService);
stores.userStore = new UserStore(services.authService);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider {...stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
