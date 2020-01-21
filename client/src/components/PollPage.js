import React from 'react';
import PollForm from './PollForm';
import Modal from './Modal';

const API = 'http://localhost:5000/api/events/';

class PollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      events: [],
      activeEvents: [],
      previousCategory: "",
      activeCategory: "",
      categories: [],
      activeEvent: {},
      modalIsOpen: false
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

    this.setActiveEvent = this.setActiveEvent.bind(this);
    this.setActiveEvents = this.setActiveEvents.bind(this);
  }


  // Set list of sport categories
   setCategories = (events) => {
    console.log("setCategories")
    const categories = [];
    events.forEach(event => {
        categories.push(event.sport)
    })
    let unique = [...new Set(categories)];
    this.setState({categories:unique})
  }

  // Set a sport category for voting
  // Then removes it when there is no more events from this category to vote from
  setActiveCategory = () => {
    console.log("setActiveCategory")
    let sports = this.state.categories;
    // console.log("Sports: ",sports)
    let randomSport = sports[Math.floor(Math.random() * sports.length)];
    let remain = sports.filter(sport => sport !== randomSport);
    let previousCategory = this.state.activeCategory;
    this.setState({
      categories : remain,
      previousCategory : previousCategory,
      activeCategory : randomSport})
    return randomSport
  
 }

 showModal = () => {
  this.setState({modalIsOpen:true})
 }
 hideModal = () => {
  this.setState({modalIsOpen:false})
 }

  // Set an active random event for voting
  // Then removes it from the remaining list to vote
  setActiveEvent = () => {
 
    console.log("setActiveEvent")
    let activeEvents = this.state.activeEvents;
    console.log(activeEvents)
    let activeEventsLength = activeEvents.length;
    console.log(activeEventsLength);
    if (!activeEventsLength){
      console.log("No active events");
      this.showModal();
      this.setActiveEvents();
      // let activeCategory = 'SWIMMING';
      // this.setState(() => ({activeCategory : activeCategory}))
      // let events = this.state.events;
      // this.setState({activeCategory:sport})
      // let activeEvents = events.filter(event => event.sport === sport)
      // this.setState({activeEvents: activeEvents})
      // this.setState({activeEvents:["events"]});
      // console.log(this.state)
    } else {
    // if (activeEventsLength){
    // console.log("Actives: ",activeEvents)
    let randomEvent = activeEvents[Math.floor(Math.random() * activeEventsLength)];
    let remain = activeEvents.filter(event => event.id !== randomEvent.id)
    // console.log("Random:",randomEvent)
    this.setState({
      activeEvent:randomEvent,
      activeEvents : remain
    });
    console.log(this.state)
    // }
    // else {
    //   this.resetActiveEvents();
    //   this.showModal();
    // }
  }
 }

  // Set active events by selecting a random sport
  setActiveEvents = () => {
    console.log("setActiveEvents")
    let sport = this.setActiveCategory();
    let events = this.state.events;
    this.setState({activeCategory:sport});
    let activeEvents = events.filter(event => event.sport === sport);
    this.setState(
      {activeEvents: activeEvents},
      ()=>this.setActiveEvent()
      );
    console.log(this.state);
    return activeEvents;
  }

  // Reset the list of events after finishig voting in one category
  resetActiveEvents = () => {
    this.setState({
      activeEvents: [],
      activeCategory: "",
      activeEvent: {},
      modalIsOpen: false
    })
    // console.log(this.state)
    // const events = this.state.events;
    // this.setCategories(events);
    // let activeEvents = this.state.activeEvents;
    // let activeEventsLength = activeEvents.length;
    // console.log(activeEventsLength);
    // if (!activeEventsLength){
      // let events = this.state.events;
      // this.setState({events});
      //   this.setCategories(events);
      //   this.setActiveEvents();
      //   this.setActiveEvent();
    // this.setActiveEvent();
    // }

  }

  setNewCategory = () => {
    console.log(this.state)
    let sport = this.setActiveCategory();
    let events = this.state.events;
    this.setState({activeCategory:sport})
    let activeEvents = events.filter(event => event.sport === sport)
    this.setState({activeEvents: activeEvents})
    
  
    // let sport = this.setActiveCategory();
    // console.log(sport);
    // let events = this.state.events;
    // this.setState({activeCategory:sport})
    // let activeEvents = events.filter(event => event.sport === sport)
    // this.setState({activeEvents: activeEvents})
    this.setState({
      modalIsOpen:false,
    });
    console.log(this.state)
    // this.sendVote('draw')
    // console.log(this.state.activeCategory)
  }

  // POST a vote for specific event
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
        if (!response.ok){ throw new Error('Network response was Not OK') }
        return response.json()
      })
      .then(events => {
        this.setState({events});
        this.setCategories(events);
        this.setActiveEvents();
        // this.setActiveEvent();
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
        <Modal
          sport = {this.state.previousCategory}
          hideModal = {this.hideModal}
          isOpen = {this.state.modalIsOpen}
          resetActiveEvents = {this.resetActiveEvents}
          setNewCategory = {this.setNewCategory}
          sendVote= {this.sendVote}
        />
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
