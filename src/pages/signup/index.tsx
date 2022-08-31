import { Button, TextField } from "@mui/material";
import { inject } from "mobx-react";
import { Component } from "react";
import { NavigateFunction } from "react-router";
import styled from "styled-components";
import ErrorMessage from "../../shared-components/error-message";
import UserStore from "../../stores/user.store";
import "./index.css";

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

@inject('userStore', 'routerStore')
class SignUpPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: null
    };
  }

  submit = async () => {
    const { username, password } = this.state;
    try {
      await this.props.userStore!.signup(username, password);
      this.props.navigate!('/signin');
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Join us!</Heading>
          <p>Start managing tasks easily.</p>

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
          <p>
            Passwords must contain at least 1 upper case letter, 1 lower case
            letter and one number OR special charracter.
          </p>
          <hr />
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN UP
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignUpPage;
