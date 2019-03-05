import React, { Component } from 'react';
import {Button,Container} from 'react-bulma-components'
import 'stylesheet/main.scss';
import {appConfig} from 'utils/constants'
import {UserSession} from 'blockstack'
import Login from 'components/Login';
import Navbar from 'components/Navbar'
import Routes from 'pages/route';

console.log(appConfig,UserSession)
class App extends Component {
  state={
    userSession:new UserSession(appConfig)
  }
componentDidMount=async()=>{
  const {userSession}=this.state
console.log(userSession)
  if(!userSession.isUserSignedIn() && userSession.isSignInPending())
  {
  const userData= await userSession.handlePendingSignIn()
  if(!userData.username){
    throw new Error('this app requires a user name')
  }
  
  window.location='/'
}
}

handleSignOut=()=>{
  const{userSession}=this.state
  userSession.signUserOut()
  window.location="/"
}
  render() {
    const{userSession}=this.state

    return (
      <div>
<Navbar userSession={userSession}/>
      <Container>
      {
!userSession.isUserSignedIn()?  <Login userSession={userSession} />  
:<Routes userSession={userSession}/>
      }
    </Container>
        </div>
    );
  }
}

export default App;
