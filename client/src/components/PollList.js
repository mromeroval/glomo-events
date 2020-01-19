import React from 'react';
import image from '../lights.jpg';

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

        <header id="header" className="grid">
          <div className="bg-image"></div>
          <h3>Soccer</h3>
          <h3>Event Name</h3>
          <p>Country - Group</p>
          <a href="#main" id="btn">
            Vote
          </a>
        </header>

        <main id="main">
          <section id="section-a" className="grid">
            <div className="content-wrap">
              Voting area
              <ul>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <h3>Home</h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <h3>Draw</h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="card">
                    <div className="card-content">
                      <h3>Away</h3>
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
    );
  }
}

export default PollList;
