import React from "react";
import Axios from "axios";

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfileJSON: {},
      renderUserProfileFailure: false,
      renderUserProfile: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.RenderUserProfile = this.RenderUserProfile.bind(this);
  }

  async componentDidMount() {
    const getUserProfileResponse = await Axios.get(
      "http://localhost:1234/users/me",
      {
        withCredentials: true,
      },
    )
      .then((res) => res.data)
      .catch((err) => err.response.data);
    console.log(getUserProfileResponse);

    getUserProfileResponse.success
      ? this.setState({
          userProfileJSON: getUserProfileResponse.data[0],
          renderUserProfile: true,
        })
      : this.setState({ renderUserProfileFailure: true });
    console.log(this.state);
  }

  RenderUserProfile() {
    return <div>{JSON.stringify(this.state.userProfileJSON)}</div>;
  }

  render() {
    return <this.RenderUserProfile />;
  }
}
