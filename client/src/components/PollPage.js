import React, { useState, useEffect } from 'react';
import PollForm from './PollForm';
import Modal from './Modal';

const API = 'http://localhost:5000/api/events/';

const PollList = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState();
  const [activeEvents, setActiveEventsState] = useState([]);
  const [previousCategory, setPreviousCategory] = useState("");
  const [activeCategory, setActiveCategoryState] = useState("");
  const [categories, setCategoriesState] = useState([]);
  const [activeEvent, setActiveEventState] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(true);

  // Set list of sport categories
  const setCategories = (events) => {
    const categories = [];
    events.forEach(event => {
        categories.push(event.sport)
    })
    let unique = [...new Set(categories)];
    setCategoriesState(unique)
  }

  // Set a sport category for voting
  // Then removes it when there is no more events from this category to vote from
  const setActiveCategory = () => {
    let sports = categories;
    let randomSport = sports[Math.floor(Math.random() * sports.length)];
    let remain = sports.filter(sport => sport !== randomSport);
    let previousCategory = activeCategory;
    setCategoriesState(remain);
    setPreviousCategory(previousCategory);
    setActiveCategoryState(randomSport)
    return randomSport
 }

 const showModal = () => {
   setModalIsOpen(true)
 }
 const hideModal = () => {
  setModalIsOpen(false)
 }

  // Set an active random event for voting
  // Then removes it from the remaining list to vote
  const setActiveEvent = () => {
    let categoriesLength = categories.length
    let activeEvents = activeEvents;
    let activeEventsLength = activeEvents.length;
    if ( !activeEventsLength && !categoriesLength){
      setModalIsActive(false);
      showModal();
      cleanState();
    } else if (!activeEventsLength){
        showModal();
        setActiveEvents();
      } else {
        let randomEvent = activeEvents[Math.floor(Math.random() * activeEventsLength)];
        let remain = activeEvents.filter(event => event.id !== randomEvent.id)
        setActiveEvent(randomEvent);
        setActiveEventsState(remain);
      }
 }

  // Set active events by selecting a random sport
  const setActiveEvents = () => {
    let sport = setActiveCategory();
    let eventsState = events;
    setActiveCategoryState(sport)
    let activeEvents = eventsState.filter(event => event.sport === sport);
    setActiveEvents(activeEvents);
    setActiveEvent();
    return activeEvents;
  }

  const cleanState = () => {
    setIsLoading(false);
    setEvents([]);
    setActiveEventsState([]);
    setPreviousCategory("");
    setActiveCategoryState("");
    setCategoriesState([]);
    setActiveEventState({});
  }

  // POST a vote for specific event
  // Then set a new active event
  const sendVote = (vote) => {
    const data= {
      event: activeEvent.id,
      user: "user@mail.com",
      homeName: 0,
      awayName: 0,
      draw: 0
    }
    data[vote]=1;
    fetch(API, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then( response => {
      if (!response.ok) { throw new Error('Network response was Not OK') }
    })
    .then(setActiveEvent())
    .catch((error) => {
      console.error( error);
    })
  }
  
  const fetchData = () => {
    setIsLoading(true)
    fetch(API)
      .then(response => {
        if (!response.ok){ throw new Error('Network response was Not OK') }
        return response.json()
      })
      .then(events => {
        setEvents(events)
        setCategories(events);
        setActiveEvents();
      })
      .then(setIsLoading(false))
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    fetchData()
  }, []);

    return (
      <div>
        <Modal
          sport = {previousCategory}
          hideModal = {hideModal}
          isOpen = {modalIsOpen}
          modalIsActive = {modalIsActive}
        />
        <PollForm
          isLoading = {isLoading}
          event = {activeEvent}
          sendVote = {sendVote}
        />
      </div>
    );
  }


export default PollList;
