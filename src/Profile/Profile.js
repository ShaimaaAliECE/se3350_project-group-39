import React, { Component } from 'react'
import axios from "axios";
import './Profile.css';
import Statistics from './Statistics';

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
                <p>Profile Name: <i>{profileData.profile_name}</i></p>
                <p>About Me: <i>{profileData.about_me}</i></p>
                <p>Favorite Algo: <i>(most used algo)</i></p>
                <p>PR: <i>(time taken)</i></p>
                <p>Highest Level: <i>(respective to fav algo)</i></p>
                <p>Total Games Completed: <i>(number of games won)</i></p>
              </div>
            }
          </div>
        </div>
        <Statistics token={this.props.token} />
      </div>
    )
  }
}

