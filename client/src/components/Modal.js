import React from 'react';

class Modal extends React.Component{
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     isOpen : false
  //   }
  //   this.handleEvent = this.handleEvent.bind(this);
  // }
  

  setNewCategory = ()=>{
    //  if (e.target.value === 'close'){
    //   this.props.resetActiveEvents()
    //  }
    // this.props.setNewCategory()
    this.props.hideModal()
  }

render(){
  if (!this.props.isOpen) {
    return null;
  }
  // const resetActiveEvents = this.props.resetActiveEvents;

  return (
    <div className="bg-modal">
      <div className="modal-content">
        <div className="modal-message">
          <h3>You have voted for all the</h3>
          <h3>{this.props.sport} events!</h3>
          <p>Would you like to keep voting for another category?</p>
          <button className="btn-modal" onClick={(this.setNewCategory)}> Keep voting </button>
          {/* <button className="btn-modal" value="close" onClick={this.handleEvent}> Cancel</button> */}
        </div>
      </div>

    </div>
  )
}
}

export default Modal;