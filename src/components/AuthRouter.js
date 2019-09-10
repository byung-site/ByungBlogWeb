import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class AuthRouter extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLogin: this.props.isLogin,
        };
    }

    componentWillReceiveProps(nextProps){
        var isLogin = nextProps.isLogin;
        if(typeof isLogin != "undefined"){
            this.setState ({
                isLogin: isLogin,
            });
        }
    }

    render() {  
        const { component: Component, ...rest } = this.props
        var {isLogin} = this.state;

        return (
            <Route {...rest} render={props => {
              return isLogin
                  ? <Component {...props} />
                  : <Redirect to="/noauth" />
            }} />
        )
      }
}

export default withRouter(AuthRouter); 

AuthRouter.propTypes = {
    isLogin: PropTypes.bool.isRequired
}