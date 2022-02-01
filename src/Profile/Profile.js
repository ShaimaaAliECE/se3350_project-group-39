import React, { Component } from 'react'
import axios from "axios";

export default class Profile extends Component {

  constructor(props) {
    super(props);

    // keep track of the state
    this.state = {
      profileData: null
    }
  }

  getData = () => {
    axios({
      method: "GET",
      url:"/profile",
      headers: {

        Authorization: 'Bearer ' + this.props.token

      }
    })
    .then((response) => {
      const res = response.data
      res.access_token && this.props.setToken(res.access_token)
      this.setState({ profileData: {
          profile_name: res.name,
          about_me: res.about
        }
      })
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { profileData } = this.state;
    return (
      <div className="Profile">

        {
          profileData &&
          <div>
            <p>Profile name: {profileData.profile_name}</p>
            <p>About me: {profileData.about_me}</p>
          </div>
        }

      </div>
    )
  }
}

