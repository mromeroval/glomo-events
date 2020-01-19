import React from 'react';
// import image from '../lights.jpg';

const API = 'http://localhost:5000/api/events';

class PollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      events: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ events: data }));
  }

  render() {
    return (
      <div>
      <h1>Sports Poll</h1>
      <div id="container">
        <div className="bgImage">
        {/* <img src={image} alt="background"/> */}
        <header id="header" className="grid">
          
          <h1>Soccer</h1>
          <h2>Event Name</h2>
          <p>Country - Group</p>
        </header>

        <main id="main">
          <section id="voting-section" className="grid">
            <div className="content-wrap">
              Voting area
              <ul>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <h2>Home</h2>
                      <h3>Name of Home</h3>
                      <button className="btn" /> 
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <h2>Draw</h2>
                      <button className="btn" /> 
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <h2>Away</h2>
                      <h3>Name of Away</h3>
                      <button className="btn" /> 
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </main>

        <footer id="main-footer" className="grid">
          <h3>Footer</h3>
        </footer>
        </div>
      </div>
      </div>
    );
  }
}

export default PollList;
