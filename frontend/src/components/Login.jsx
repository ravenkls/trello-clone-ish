import React from "react";
import Axios from "axios";
export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      renderLoginStatus: false,
      loginSuccess: false,
      loginErrorMessage: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.LoginStatusBox = this.LoginStatusBox.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const loginResponse = await Axios.post(
      "http://localhost:1234/users/signin",
      {
        username: this.state.username,
        password: this.state.password,
      },
      {
        withCredentials: true,
      },
    )
      .then((res) => res.data)
      .catch((err) => err.response.data);

    loginResponse.success
      ? this.setState({ loginSuccess: true })
      : this.setState({
          loginSuccess: false,
          loginErrorMessage: loginResponse.errors[0].message,
        });

    this.setState({
      renderLoginStatus: true,
    });
  }

  LoginStatusBox() {
    if (this.state.renderLoginStatus && !this.state.loginSuccess) {
      return (
        <div class="ui negative message">
          <i class="close icon"></i>
          <div class="header">Login failed</div>
          <p>{this.state.loginErrorMessage}</p>
        </div>
      );
    } else if (this.state.renderLoginStatus && this.state.loginSuccess) {
      return (
        <div class="ui positive message">
          <i class="close icon"></i>
          <div class="header">Login success!</div>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <form class="ui form" onSubmit={this.handleSubmit}>
        <h1 class="ui header">Login</h1>

        <div class="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>

        <div class="field">
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <button class="ui button" type="submit">
          Submit
        </button>

        <this.LoginStatusBox />
      </form>
    );
  }
}
