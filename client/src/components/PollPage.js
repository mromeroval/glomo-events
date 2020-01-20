import React from 'react';
import PollForm from './PollForm';

const API = 'http://localhost:5000/api/events/';

class PollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      events: [],
      activeEvent: {}
    };
  }

   getSportList = (sport) => {
    const events = this.state.events;
    const sportList = [];
    events.map(event => {
      if (event.sport === sport) {
        sportList.push(event)
      }
      return sportList
    })
  }

  getEvent = (eventId) => {
    const events = this.state.events;
    const event = events.filter(event => event.id === eventId)
    this.setState({activeEvent: event})
      return event
  }

  setActiveEvent = (event) => {
    this.setState({activeEvent: event})
  }

  sendVote = (vote) => {
    const data= {
      event: this.state.activeEvent.id,
      user: "user4@mail.com",
      homeName: 0,
      awayName: 0,
      draw: 0
    }
    data[vote]=1;
    fetch(API,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then( response => {
      if(!response.ok){ throw new Error('Network response was Not OK')}
      }
    )
    .catch((error) => {
      console.error( error);
    })

  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => {
        if (!response.ok){
          throw new Error('Network response was Not OK');
        }
        return response.json()
      })
      .then(events => {
        this.setState({
          events,
          activeEvent : events[0]
        });
      })
      .then(this.setState({ isLoading:false }))
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      })
  }

  render() {
    return (
      <div>
        <PollForm
          isLoading = {this.state.isLoading}
          event = {this.state.activeEvent}
          events = {this.state.events}
          sendVote = {this.sendVote}
        />
      </div>
    );
  }
}

export default PollList;
