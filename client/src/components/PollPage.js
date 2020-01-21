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
    };

    this.setActiveEvent = this.setActiveEvent.bind(this);
    this.setActiveEvents = this.setActiveEvents.bind(this);
  }

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
  setActiveCategory = () => {
    let sports = this.state.categories;
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
    let activeEvents = this.state.activeEvents;
    let activeEventsLength = activeEvents.length;
    if (!activeEventsLength){
      this.showModal();
      this.setActiveEvents();
    } else {
    let randomEvent = activeEvents[Math.floor(Math.random() * activeEventsLength)];
    let remain = activeEvents.filter(event => event.id !== randomEvent.id)
    this.setState({
      activeEvent:randomEvent,
      activeEvents : remain
    });
  }
 }

  // Set active events by selecting a random sport
  setActiveEvents = () => {
    let sport = this.setActiveCategory();
    let events = this.state.events;
    this.setState({activeCategory:sport});
    let activeEvents = events.filter(event => event.sport === sport);
    this.setState({ activeEvents: activeEvents }, () => this.setActiveEvent() );
    return activeEvents;
  }


  setNewCategory = () => {
    let sport = this.setActiveCategory();
    let events = this.state.events;
    this.setState({activeCategory:sport})
    let activeEvents = events.filter(event => event.sport === sport)
    this.setState({
      activeEvents: activeEvents,
      modalIsOpen:false
    });
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
