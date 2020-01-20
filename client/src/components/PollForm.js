import React from 'react';

class PollForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      awayName: 0,
      homeName: 0,
      draw: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    let name = event.target.name;
    this.setState({[name]:1})
  }
  
  render(){
    const {isLoading, event} = this.props;
      if (isLoading) {
          return <h3>...Loading</h3>
      }

    return(
      
      <div>
        <div className="container">
          <h1 className="title">Sports Poll</h1>
          <hr />
          <h1 className="sport-title">{event.sport}</h1>
          <p>Country : {event.country}</p>
          <p>Group : {event.event_group}</p>

          <header id="header">
              <div className="vs-area vs-area-top">
                <h2>{event.homeName}</h2>
              </div>
              <div className="vs-area">
                <h2>V/S</h2>
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
                        <button className="btn" name="homeName" onClick = {this.handleClick}>Home Wins</button>
                        <h3>{event.homeName}</h3>
                        
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="card">
                      <div className="card-content">
                        <button className="btn" name="draw" onClick = {this.handleClick}>Draw</button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="card">
                      <div className="card-content">
                        <h3>{event.awayName}</h3>
                        <button className="btn" name="awayName" onClick = {this.handleClick}>Away Wins</button>
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
      </div>
    )
  }

}

export default PollForm;
