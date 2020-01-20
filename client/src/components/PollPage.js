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
          events = {this.state.events} />
      </div>
    );
  }
}

export default PollList;
