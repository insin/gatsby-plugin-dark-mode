import React from 'react'
import PropTypes from 'prop-types'

class ThemeToggler extends React.Component {
  state = {
    theme: null,
  }

  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }

  toggleTheme(theme) {
    window.__setPreferredTheme(theme)
  }

  render() {
    return (
      <this.props.children
        theme={this.state.theme}
        toggleTheme={this.toggleTheme}
      />
    )
  }
}

ThemeToggler.propTypes = {
  children: PropTypes.func.isRequired,
}

export default ThemeToggler
