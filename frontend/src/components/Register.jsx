import React from "react";
import Axios from "axios";

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      renderRegisterStatus: false,
      registerSuccess: false,
      registerErrorMessage: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.RegisterStatusBox = this.RegisterStatusBox.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const registerResponse = await Axios.post(
      "http://localhost:1234/users/signup",
      {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
    )
      .then((res) => res.data)
      .catch((err) => err.response.data);

    registerResponse.success
      ? this.setState({ registerSuccess: true })
      : this.setState({
          registerSuccess: false,
          registerErrorMessage: registerResponse.errors[0].message,
        });

    this.setState({
      renderRegisterStatus: true,
    });
  }

  RegisterStatusBox() {
    if (this.state.renderRegisterStatus && !this.state.registerSuccess) {
      return (
        <div class="ui negative message">
          <i class="close icon"></i>
          <div class="header">Register failed</div>
          <p>{this.state.registerErrorMessage}</p>
        </div>
      );
    } else if (this.state.renderRegisterStatus && this.state.registerSuccess) {
      return (
        <div class="ui positive message">
          <i class="close icon"></i>
          <div class="header">Register success!</div>
          <p>You can now login {<a href="/login">here</a>}</p>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <form class="ui form" onSubmit={this.handleSubmit}>
        <h1 class="ui header">Sign up</h1>

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
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={this.state.email}
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

        <this.RegisterStatusBox />
      </form>
    );
  }
}
