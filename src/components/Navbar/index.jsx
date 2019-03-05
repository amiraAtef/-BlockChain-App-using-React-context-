import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'react-bulma-components'
import { withRouter } from 'react-router-dom'

class NavbarComp extends Component {
  state = { open: false }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { userSession } = this.props

    if (userSession.isUserSignedIn()) {
      const user = userSession.loadUserData()
      this.setState({ user })
    }
  }

  toggleNavbar = () => {
    this.setState({ open: !this.state.open })
  }

  signOut = () => {
    const { userSession } = this.props;

    userSession.signUserOut();
    window.location = '/'
  }

  goToProfile = () => {
    const { history } = this.props
    const { user } = this.state

    this.setState({ open: false })
    history.push(`/admin/${user.username}`)
  }

  goToPosts = () => {
    const { history } = this.props
    const { user } = this.state

    this.setState({ open: false })
    history.push(`/admin/${user.username}/posts`)
  }

  render() {
    const { open } = this.state
    const { userSession } = this.props

    const isSignedIn = userSession.isUserSignedIn()

    return (
      <Navbar
        color="info"
        fixed="top"
        active={open}
      >
      <Navbar.Brand>
        <Navbar.Item onClick={this.goToProfile}>
          <i className="fas fa-stroopwafel" style={{ marginRight: '10px' }}></i>
          <p>Blog Stacks</p>
        </Navbar.Item>

        <Navbar.Burger
          onClick={this.toggleNavbar}
        />
      </Navbar.Brand>

      <Navbar.Menu>
        <Navbar.Container position="end">
            {
              isSignedIn &&
              <React.Fragment>
                <Navbar.Item onClick={this.goToPosts}>
                  Posts
                </Navbar.Item>

                <Navbar.Item onClick={this.goToProfile}>
                  My Profie
                </Navbar.Item>

                <Navbar.Item onClick={this.signOut}>
                  Sign Out
                </Navbar.Item>
              </React.Fragment>
            }
        </Navbar.Container>
      </Navbar.Menu>
      </Navbar>
    );
  }
}

export default withRouter(NavbarComp);