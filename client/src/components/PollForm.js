import React from 'react';

class PollForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      away: 0,
      home: 0,
      draw: 0
    }
  }
  
  render(){
    const {isLoading, event} = this.props;
      if (isLoading) {
          return <h3>...Loading</h3>
      }

    return(
      
      <div id="container">
        <div className="bgImage"></div>
        <h1 className="title">Sports Poll</h1>
        <hr />

        <header id="header">
          
          <h1 className="sport-title">{event.sport}</h1>
            <p>Country : {event.country}</p>
            <p>Group : {event.event_group}</p>
            <div className="vs-area vs-area-top">
              <h2>{event.homeName}</h2>
            </div>
            <div className="vs-area">
              <h1>V/S</h1>
            </div>
            <div className="vs-area vs-area-bottom">
              <h2>{event.awayName}</h2>
            </div>
        </header>

        <hr />
        <h1 className="title">Vote</h1>
        <hr />

        <main id="main">
          <section id="voting-section" className="grid">
            <div className="content-wrap">
              <ul>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <h2>{event.homeName}</h2>
                      <button className="btn">Home Wins</button> 
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <button className="btn">Draw</button> 
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <h2>{event.awayName}</h2>
                      <button className="btn">Away Wins</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </main>

        <footer id="main-footer">
          <p>Event</p>
          <p>{event.name}</p>
        </footer>
        
      </div>
    )
  }

}

export default PollForm;