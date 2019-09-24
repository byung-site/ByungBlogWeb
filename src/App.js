import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import { Layout } from 'antd';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  Container,
  UncontrolledDropdown,
  DropdownToggle, 
  DropdownMenu
 } from 'reactstrap';
 import jwt_decode from 'jwt-decode'

 import {OpCookies} from "./utils/OPCookies"
import "./static/css/App.css"
import "./static/css/bootstrap.min.css"
import {menuGenerator} from "./utils/MenuGenerator"
import Blog from "./pages/Blog"
import Topic from "./pages/Topic.js"
import Personal from "./pages/Personal.js"
import About from "./pages/About.js"
import BlogManage from './pages/BlogManage';
import TopicManage from './pages/TopicManage';
import NotFound from './pages/NotFound';
import NoAuth from './pages/NoAuth';
import Edit from './pages/Edit';
import Detail from "./pages/Detail"
import AuthRouter from "./components/AuthRouter"
import LoginRegister from "./components/LoginRegister"

const { Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    var isLogin = false;
    var user = this.loadToken();
    if(user != null){
      isLogin = true;
    }else{
      user = {};
    }

    this.state = {
      isOpen: false,
      isLogin: isLogin,
      dropdownOpen: false,
      user: user
    };
  }

  menuToggle = (e) => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  onLoginStateChange = (state, data) =>{
    if(state === "login"){
      this.setState({
        user: data,
        isLogin: true
      });
    }else if(state === "logout"){
      this.setState({
        user: {},
        isLogin: false
      });
    }
  }


  loadToken = () => {
    let token = OpCookies.get("token");
    if(token == null){
        return null;
    }
    //解析jwt token
    const decoded = jwt_decode(token);
    return decoded
  }

  render() {
    var {isLogin, user} = this.state;

    return (
      <div style={{minWidth:"320px"}}>
        <header style={{width:"100%",background:"#343a40"}}>
          <Navbar className="m-auto" color="dark" dark expand="md" style={{maxWidth:"1200px"}}>
            <Button color="link"><Link className="link" to="/">byung</Link></Button>
              <NavbarToggler onClick={this.menuToggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {
                    menuGenerator.getMenu(isLogin).map(item => {
                      if(item.type === 1){
                        return (
                              <UncontrolledDropdown  key={item.key} style={{textAlign:"center"}}>
                                <DropdownToggle nav style={{background:"#343a40", border:0}}>
                                  {item.text}
                                </DropdownToggle>
                                <DropdownMenu>
                                  {
                                    item.itemArray.map(subitem => {
                                      let obj = {
                                        pathname: subitem.href,
                                        search: '?id='+user.id,
                                      }
                                      return <Button key={subitem.key} color="link"><Link className="link" to={obj}>{subitem.text}</Link></Button>
                                    })
                                  }
                                </DropdownMenu>
                              </UncontrolledDropdown>
                        );
                      }
                      let obj = {
                        pathname: item.href,
                        query: { user }
                      }
                      return (
                        <NavItem key={item.key} style={{textAlign:"center"}}>
                            <Button color="link">
                              <Link className="link" to={obj}>{item.text}</Link>
                            </Button>
                        </NavItem>
                      );
                    })
                  }
                </Nav>

                <div style={{marginLeft:"10px", textAlign:"center"}}>
                  <LoginRegister loginStateChange={this.onLoginStateChange} isLogin={isLogin} user={user}/>
                </div>
              </Collapse>
          </Navbar>
        </header>
        <Container>
            <Switch>
                <Route exact path="/" component={Blog}/>
                <Route exact path="/blog" component={Blog}/>
                <Route exact path="/topic" component={Topic}/>
                <Route exact path="/detail" component={Detail}/>
                <Route exact path="/noauth" component={NoAuth}/>
                <Route exact path="/about" component={About}/>
                <AuthRouter path="/blogmanage" isLogin={isLogin} component={BlogManage}/>
                <AuthRouter path="/topicmanage" isLogin={isLogin} component={TopicManage}/>
                <AuthRouter path="/personal" isLogin={isLogin} component={Personal}/>
                <AuthRouter path="/edit" isLogin={isLogin} component={Edit}/>
                <Route component={NotFound}/>
            </Switch>
        </Container>
        
        <Footer style={{ textAlign: 'center' }}><p>Copyright © 2019 byung.site All Rights Reserved.</p><p>Email:zhuguoquan45@163.com</p></Footer>
      </div>
    );
  }
}