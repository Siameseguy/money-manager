import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchData} from './actions';
import {Switch, Route, NavLink, Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Layout from './components/Layout/Layout';
import Account from './components/Account/Account';
import Transactions from './components/Transactions/Transactions';

class App extends Component {
  componentDidMount() {
    //get data from data.json
    this
      .props
      .fetchData();
  }
  render() {
    const data = this.props.setData;
    console.log('data', data)

    const mappedData = data.map(ele => {
      return ele;
    })

    const accountInfo = 
    data
    .map(item => {
      return (item.accounts.account.map(ele => {
        return (
          <Navbar bg="light" expand="lg" key={ele.id}>
            <Container>
              <Navbar.Brand href="#home" fixed="top">{ele.accountName}</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/transactions">Transaction</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )
      }))
    })

    return (
      <div>
        <Layout>
          {accountInfo}
          {/* <Account accountInfo={mappedData} />
          <Transactions transactionData={mappedData} /> */}
          <Switch>
            <Route 
              exact path="/" 
              render={(routeProps) => (
              <Account {...routeProps}  accountInfo={mappedData} />
            )} />
            <Route exact path="/transactions" 
            render={(routeProps) => (
              <Transactions {...routeProps} transactionData={mappedData} />
            )} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {setData} = state;
  return {setData}
}

export default connect(mapStateToProps, {fetchData})(App);
