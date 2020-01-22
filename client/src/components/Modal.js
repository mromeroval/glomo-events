import React from 'react';

class Modal extends React.Component{

  render(){
    if (!this.props.isOpen) {
      return null;
    }
    
    if (!this.props.modalIsActive) {
      return (
        <div className="bg-modal">
        <div className="modal-content">
          <div className="modal-message">
            <h3>You have voted for all the events!</h3>
          </div>
        </div>
      </div>
      )
    }

    return (
      <div className="bg-modal">
        <div className="modal-content">
          <div className="modal-message">
            <h3>You have voted for all the</h3>
            <h3>{this.props.sport} events!</h3>
            <p>Would you like to keep voting for another category?</p>
            <button className="btn btn-modal" onClick={this.props.hideModal}> Keep voting </button>
          </div>
        </div>
      </div>
    )
  }
}


export default Modal;