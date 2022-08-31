import React, { Component } from "react";
import styled from "styled-components";
import "./index.css";
import { Button, TextField } from "@mui/material";
import UserStore from "../../stores/user.store";
import ErrorMessage from "../../shared-components/error-message";
import { inject } from "mobx-react";
import { NavigateFunction } from "react-router";

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

interface IProps {
  userStore?: UserStore;
  navigate?: NavigateFunction;
}

interface IState {
  username: string;
  password: string;
  errorMessage: string | null;
}

@inject("userStore", "routerStore")
class SignInPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: null,
    };
  }

  submit = async () => {
    this.setState({ errorMessage: null });
    const { username, password } = this.state;

    try {
      await this.props.userStore!.signin(username, password);
      this.props.navigate!('/tasks');
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  goToSignUp = () => {
    this.props.navigate!('/signup');
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Hello!</Heading>
          <p>Fill in your username and password to sign in.</p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <hr />
          <div>
            <Button
              style={{ marginBottom: "10px" }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN IN
            </Button>

            <Button fullWidth onClick={this.goToSignUp}>
              Don't have an account? Sign up now!
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignInPage;
