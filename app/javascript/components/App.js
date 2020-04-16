import React from "react"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Header from "./Header"
import "../stylesheets/application.scss"

import TicketIndex from "./pages/TicketIndex"
import NewTicket from "./pages/NewTicket"
import ShowTicket from "./pages/ShowTicket"
import TicketEdit from "./pages/TicketEdit"
import TicketImage from "./pages/TicketImage"
import JumboT  from "./pages/JumboT"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      tickets: [],
      myTickets: []
    }
    this.getTickets()
  }

  componentDidMount(){
    this.getTickets()
  }

  getTickets = () => {
    fetch("http://www.tiqqit.net/tickets")
    .then((response)=>{
      if(response.status === 200) {
        return(response.json())
      }
    })
    .then((ticketsArray) =>{
      this.setState({
        tickets: ticketsArray.tickets
      })
    })
  }

  createTicket = (newTicket) => {
    return fetch("http://www.tiqqit.net/tickets", {
    	body: JSON.stringify(newTicket),
    	headers: {
    		"Content-Type": "application/json"
    	},
    	method: "POST"
    })
    .then((response) => {
      if(response.ok){
        return this.getTickets()
      }
    })
  }

  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route,
      current_user
    } = this.props

    return (
      <React.Fragment>
        
        <Header
        logged_in = { logged_in }
        sign_in_route = { sign_in_route }
        sign_out_route = { sign_out_route }
        current_user = { current_user }
        myTickets = { this.state.myTickets }
      />
        
        <Router>
        <Switch>
            <Route
            exact path="/"
            component= { JumboT } />
            <Route
            exact path="/ticketindex/"
            render={ (props) => <TicketIndex tickets={ this.state.tickets } /> } />
            <Route
            exact path="/ticketindex/:id"
            render={ (props) => <ShowTicket {...props}
            tickets={ this.state.tickets }
            getTickets={ this.getTickets }
            /> } />
            <Route
            exact path="/newticket/"
            render={ (props) => <NewTicket handleSubmit={ this.createTicket} /> } />

            <Route
            exact path="/mytickets/"
            render={ (props) => <TicketEdit
            {...props}
            tickets={ this.state.tickets }
            getTickets={ this.getTickets }
            /> } />
            
            <Route
            exact path="/ticketimage/:id"
            render={ (props) => <TicketImage
            {...props}
            tickets={ this.state.tickets }
            /> } />

        </Switch>
      </Router>
        
      </React.Fragment>
    );
  }
}

export default App