import React, { Component } from 'react'
import axios from "axios";
import './Profile.css';

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
      <div>
        <h1>User Statistics</h1>
        <div className='dataframe'>
        <div className="profile">
          {
            profileData &&
            <div>
              <p>Profile Name: {profileData.profile_name}</p>
              <p>About Me: {profileData.about_me}</p>
              <p>Favourite Algo: (most used algo)</p>
              <p>PR: (time taken)</p>
              <p>Highest Level: (respective to fav algo)</p>
              <p>Total Games Completed: (number of games won)</p>


            </div>
          }

        </div>
        </div>
      </div>
    )
  }
}

