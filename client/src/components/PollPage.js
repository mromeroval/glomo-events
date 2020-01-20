import React from 'react';
import PollForm from './PollForm';

const API = 'http://localhost:5000/api/events/';

class PollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      events: [],
      activeEvents: [],
      activeCategory: "",
      categories: [],
      activeEvent: {}
    };
  }

  // Get list of sports by category
  //  getSportList = (sport) => {
  //   const events = this.state.events;
  //   const sportList = [];
  //   events.map(event => {
  //     if (event.sport === sport) {
  //       sportList.push(event)
  //     }
  //     return sportList
  //   })
  // }

  // Set list of sport categories
   setCategories = (events) => {
    const categories = [];
    events.forEach(event => {
        categories.push(event.sport)
    })
    let unique = [...new Set(categories)];
    this.setState({categories:unique})
  }

  // Return random sport category
  randomSport = (sports) => {
    return sports[Math.floor(Math.random() * sports.length)];
 }

  // Set random event from active events
  setRandomEvent = () => {
    let events = this.state.activeEvents;
    console.log("Actives: ",events)
    let randomEvent = events[Math.floor(Math.random() * events.length)];
    let remain = events.filter(event => event.id !== randomEvent.id)
    console.log("Random:",randomEvent)
    this.setState({activeEvent:randomEvent});
    this.setState({activeEvents : remain});
    console.log("Actives remain: ",events)
 }

  // Set active events
  setActiveEvents = (events) => {
    let sport = this.randomSport(this.state.categories)
    this.setState({activeCategory:sport})
    let activeEvents = events.filter(event => event.sport === sport)
    this.setState({activeEvents: activeEvents})
  }

  // Get categories
  // getSportCategories = () => {
  //   const events = this.state.events;
  //   const categories= [];
  //   events.map(event => {
  //     if (event.sport === sport) {
  //       sportList.push(event)
  //     }
  //     return categories
  //   })
  // }

  // Get event by ID
  // getEvent = (eventId) => {
  //   const events = this.state.events;
  //   const event = events.filter(event => event.id === eventId)
  //   this.setState({activeEvent: event})
  //     return event
  // }

  // Set active event
  // setActiveEvent = (event) => {
  //   this.setState({activeEvent: event})
  // }

  // Post event vote
  sendVote = (vote) => {
    const data= {
      event: this.state.activeEvent.id,
      user: "user@mail.com",
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
      if (!response.ok) {
        throw new Error('Network response was Not OK')
      }
    }
    )
    .then(this.setRandomEvent())
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
        this.setState({events});
        this.setCategories(events);
        this.setActiveEvents(events);
        this.setRandomEvent();
        // this.setState({activeEvent:this.state.events[1]})
        console.log(this.state)
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
          sendVote = {this.sendVote}
        />
      </div>
    );
  }
}

export default PollList;
