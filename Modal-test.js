import React, { Component } from 'react';
import './App.css';
import Modal from 'react-modal'

const customStyle = {
  content : {
    posittion:'absolute',
    top  : '20px',
    left : '40px',
    right : '40px',
    bottom : '40px',
    marginRight:'15%',
    marginLeft:'15%',
    marginTop:'15%',
    marginBottom:'15%'
  
  }
};

class App extends Component {
  constructor(props){
    super(props); 
    this.state = {
      showModal:false
    }
    this.handleOpenModal= this.handleOpenModal.bind(this);
    this.handleCloseModal= this.handleCloseModal.bind(this);
  }
  handleOpenModal(){
    this.setState({showModal:true});
  }
  handleCloseModal(){
    this.setState({showModal:false});
  }
  toggleModal = () =>{
    this.setState({
      showModal:!this.state.showModal
    })
  }
  render() {
  
    return (
    
       <div className="App">
         <header className="App-header">  
         </header>
         <p className="App-intro"> NogDB Graph UI </p> 
         <div className="Top-Box" align="center">Limit</div>
         <p className="Display-msg">Displaying ... nodes, ... relationships. </p>
           <br/>
           <section>
             <button onClick={this.toggleModal}>Showmodal </button>
             <Modal isOpen={this.state.showModal} contentLabel = "Minimal Modal" 
                    onRequestClose={this.state.toggleModal}
                    style = {customStyle} >Hello From modal 
             <button onClick={this.toggleModal}>Hide Modal</button>
             </Modal>
             </section>

          <div className="Canvas" align="center">Canvas area </div>

       </div>
    );
  }
}

export default App;
