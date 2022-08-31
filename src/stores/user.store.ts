import { observable, action } from 'mobx';
import AuthService from '../services/auth.service';

export default class UserStore {
  @observable username: string | null = null;

  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @action
  async signin(username: string, password: string): Promise<void> {
    this.username = await this.authService.signin(username, password);
  }

  @action
  async signup(username: string, password: string): Promise<void> {
    return this.authService.signup(username, password);
  }

  @action
  signout(): void {
    this.username = null;
    this.authService.removeToken();
  }
}
