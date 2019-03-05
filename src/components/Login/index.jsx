import React, { Component } from 'react'
import {
  Card,
  Content,
  Button,
} from 'react-bulma-components'
import Loader from 'components/Loader'

class Login extends Component {
  state = {
    loadingUser: false,
  }

  signIn = (e) => {
    const { userSession } = this.props

    e.preventDefault()
    userSession.redirectToSignIn()
    this.setState({ loadingUser: true })
  }

  render() {
    const { loadingUser } = this.state;

    return (
      <Card>
        <Card.Content>
          <Content>
            {
              loadingUser ? <Loader /> :
              <Button
                color="primary"
                onClick={this.signIn}
              >
                Sign in with Blockstack
              </Button>
            }
          </Content>
        </Card.Content>
      </Card>
    );
  }
}

export default Login;