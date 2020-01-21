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
    //   activeEvent: {
    //     "awayName": "Doumbia, S/Reboul, F",
    //     "homeName": "Harris, L G M/Maamoun, K M",
    //     "event_group": "Nigeria",
    //     "id": 1003026313,
    //     "name": "Harris, L G M/Maamoun, K M - Doumbia, S/Reboul, F",
    //     "sport": "TENNIS",
    //     "country": "FRANCE",
    //     "state": "STARTED"
    // }
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

  // Set a sport category for voting
  // Then removes it when there is no more events from this category to vote from
  getRandomSport = () => {
    let sports = this.state.categories;
    // console.log("Sports: ",sports)
    let randomSport = sports[Math.floor(Math.random() * sports.length)];
    let remain = sports.filter(sport => sport !== randomSport);
    // console.log("Remaining Sports: ",remain)
    this.setState({categories : remain})
    return randomSport
 }

  // Set an active random event for voting
  // Then removes it from the remaining list to vote
  setActiveEvent = () => {
    let activeEvents = this.state.activeEvents;
    let activeEventsLength = activeEvents.length;
    console.log(activeEventsLength);
    if ( activeEventsLength){
    // console.log("Actives: ",activeEvents)
    let randomEvent = activeEvents[Math.floor(Math.random() * activeEventsLength)];
    let remain = activeEvents.filter(event => event.id !== randomEvent.id)
    // console.log("Random:",randomEvent)
    this.setState({activeEvent:randomEvent});
    this.setState({activeEvents : remain});
    // console.log("Actives remain: ",activeEvents)
    } else {
      this.setActiveEvents();
    }
 }

  // Set active events by selecting a random sport
  setActiveEvents = () => {
    let sport = this.getRandomSport();
    let events = this.state.events;
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

  // Post a vote for specific event
  // Then set a new active event
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
      if (!response.ok) { throw new Error('Network response was Not OK') }
    })
    .then(this.setActiveEvent())
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
        this.setActiveEvents();
        this.setActiveEvent();
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
