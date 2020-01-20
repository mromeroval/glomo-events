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
    const event = events.filter(event => event.id === 1003026234)
    console.log(event)
    this.setState({activeEvent: event})
      return event
  }

  setActiveEvent = (event) => {
    this.setState({activeEvent: event})
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => response.json())
      .then(events => {
        this.setState({
          events,
          activeEvent : events[6]
        });
        console.log(this.state.events);
        // let event = this.state.events.filter(event => event.id === 1003026234)
        // console.log(event)
        // this.setState({activeEvent: event})
      })
      .then(this.setState({ isLoading:false }))
  }


  render() {
    
    // const events = this.state.events;
    
    // let sports = [];
    // events.map(event => {
    //   sports.push(event.sport)
    //   return sports;
    // })
    // const categories = new Set(sports);

    

    return (
      <div>
        <PollForm isLoading = {this.state.isLoading} event = {this.state.activeEvent} events = {this.state.events} />
      </div>
    );
  }
}

export default PollList;
