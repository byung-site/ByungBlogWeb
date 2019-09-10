import React from 'react'
import PropTypes from 'prop-types'

export default class DocumentTitle extends React.Component {
    setTitle() {
        const { title } = this.props
        document.title = title
    }

    componentDidMount() {
        this.setTitle()
    }

    componentDidUpdate() {
        this.setTitle()
    }

    render() {
        return React.Children.only(this.props.children)
    }
}

DocumentTitle.propTypes = {
    title: PropTypes.string.isRequired
}