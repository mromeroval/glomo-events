import React from 'react';

const PollForm = props =>  {

  const handleClick = (name) => {
    props.sendVote(name)
  }

  const {isLoading, event} = props;
    if (isLoading) {
        return <h3>...Loading</h3>
    }

    return(
      <div>
        <div className="container">
          <h1 className="title">Sports Poll</h1>
          <hr />
          <h1 className="sport-title">{event.sport}</h1>
          <hr />
          <p><span className="label">Country :</span> {event.country}</p>
          <p><span className="label">Group : </span> {event.event_group}</p>

          <div className="versus">
                <div className="vs-area vs-area-top">
                <h2>{event.homeName}</h2>
              </div>
              <div className="vs-area">
                <h2>V/S</h2>
              </div>
              <div className="vs-area vs-area-bottom">
                <h2>{event.awayName}</h2>
              </div>
          </div>

          <hr />
          <h1>Vote</h1>
          <hr />

          <main id="main">
            <section id="voting-section" className="grid">
              <div className="content-wrap">
                <ul>
                  <li>
                    <div className="card">
                      <div className="card-content">
                        <h3>{event.homeName}</h3>
                        <button className="btn" name="homeName" onClick = {handleClick.bind(this,'homeName')}>Home Wins</button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="card">
                      <div className="card-content">
                        <button className="btn btn-draw" name="draw" onClick = {handleClick.bind(this,'draw')}>Draw</button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="card">
                      <div className="card-content">
                        <h3>{event.awayName}</h3>
                        <button className="btn" name="awayName" onClick = {handleClick.bind(this,'awayName')}>Away Wins</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </main>

          <footer id="main-footer">
            <p><span className="label">Event:</span></p>
            <p>{event.name}</p>
          </footer>

        </div>
      </div>
    )

}

export default PollForm;
