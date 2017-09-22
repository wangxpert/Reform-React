import React, { Component } from 'react'
import Reveal from 'react-reveal'

export default function asyncComponent(importComponent) {

  class AsyncComponent extends Component {

    constructor(props) {
      super(props)

      this.state = {
        component: null,
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component: component
      })
    }

    render() {
      const C = this.state.component

      return C
        ? <Reveal effect="animated fadeIn"><C {...this.props} /></Reveal>
        : null
    }

  }

  return AsyncComponent
}
