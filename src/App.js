import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import Modal from 'react-modal';
import './App.css';
 const customStyle = { 
   content : {
     posittion:'absolute',
     top    : '20px',
     left   : '40px',
     right  : '40px',
     bottom : '40px',
     marginRight  : '15%',
     marginLeft   : '15%',
     marginTop    : '15%',
     marginBottom : '15%' 
   }
 } ;
 const customCreateEdgeModal = {
    content : {
      position:'absolute',
      top   : '20px',
      left  : '40px',
      right : '40px',
      bottom : '40px',
      marginRight : '15%',
      marginLeft  : '15%',
      marginTop   : '15%',
      marginBottom: '15%'
    }
 };

 let data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]

};
 let Nodenumber;
 let Relationnumber;
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
      color: 'Red',
      size: 120,
      highlightStrokeColor: 'blue'
  },
  link: {
      highlightColor: 'lightblue'
  }
};
const onClickNode = function(nodeId) {
  window.alert('Clicked node ${nodeId}');
};

const onMouseOverNode = function(nodeId) {
  window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
  // window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function(source, target) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
  window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
  window.alert(`Mouse out link between ${source} and ${target}`);
};

class Edge extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: null,
    };
  }
}
class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      value1 : [data.nodes],
      textvalue :" ",
      value2 : [data.links],
      srcvalue: " ",
      dscvalue: " ",
      clear:[data],
      isActive:false,
      isActive2:false,
      page: 1
      
    }
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSrcChange = this.handleSrcChange.bind(this);
    this.handleDscChange = this.handleDscChange.bind(this);
    this.handleDelTodoItem = this.handleAddTodoItem.bind(this);
    this.handleAddEdge = this.handleAddEdge.bind(this);
    this.handleClearCanvas = this.handleClearCanvas.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
  }
    handleChange(e){
      this.setState({
        textvalue:e.target.value
      })
    }
    handleSrcChange(e){
      this.setState({
        srcvalue:e.target.value
      })
    }
    handleDscChange(e){
      this.setState({
        dscvalue:e.target.value
      })
    }
    
    handleAddTodoItem(){
      let newNode ={id:this.state.textvalue}
      this.state.value1[0].push(newNode)
      this.setState(
        this.state
      )
      this.state
    }
    handleAddEdge(){
      let newEdge ={source:this.state.srcvalue,target:this.state.dscvalue}
      this.state.value2[0].push(newEdge)
      this.setState(
        this.state
      )
      this.state
      console.log(newEdge);
    }
    handleClearCanvas(){
      while(this.state.value2[0].length>0)
      this.state.value2[0].pop();
      while(this.state.value1[0].length>1)
      this.state.value1[0].pop();
      this.setState(
        this.state
      )
      console.log(this.state.value1[0]);
    }
    toggleFullScreen() {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
       (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {  
          document.documentElement.requestFullScreen();  
        } else if (document.documentElement.mozRequestFullScreen) {  
          document.documentElement.mozRequestFullScreen();  
        } else if (document.documentElement.webkitRequestFullScreen) {  
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
        }  
      } else {  
        if (document.cancelFullScreen) {  
          document.cancelFullScreen();  
        } else if (document.mozCancelFullScreen) {  
          document.mozCancelFullScreen();  
        } else if (document.webkitCancelFullScreen) {  
          document.webkitCancelFullScreen();  
        }  
      }  
    }
      toggleModal = () => {
        this.setState({
          isActive:!this.state.isActive,
          page :1
        })
      }
      toggleModal2 = () =>{
        this.setState({
          isActive2:!this.state.isActive2
        })
      }
      handleNextPage = () => {
        console.log('Next!!!')
        this.setState({ page: 2 });
      }
      InitializePage = () => {
        this.setState({
          page:1
        });
      }
      CalltMultiplefunctionAtonce=() =>{
        this.InitializePage;
        this.toggleModal;
      }
    
  render() {
    let { value }  = this.state;
    return (
       <div className="App">
         <header className="App-header">  
         </header>
         <p className="App-intro"> NogDB Graph UI </p> 
         <div className="Top-Box" align="center">Limit</div>
         <p className="Display-msg">Displaying { Nodenumber = data.nodes.length} nodes, {Relationnumber = data.links.length} relationships. </p>
           <br/>
            <section>
            <button id ="Addnode-modal" onClick={this.toggleModal}>Add node </button>
             <Modal isOpen={this.state.isActive} contentLabel = "addnode Modal" 
                    onRequestClose={this.state.toggleModal}
                    style = {customStyle} > <div id="Modal-header"> Add new node 
             <button id="hidemodal-button" onClick={this.toggleModal}>Hide Modal</button>
             </div>
             {
               this.state.page === 1 ? (
                <div id="modal-middle-div"> Hello middle 1 <hr></hr>
                  <select id="select-id"  > <option value="Default Class">Default Class </option> 
                                          <option value="Class A">Class A </option>
                                          <option value="Class B">Class B </option>
                  </select>
                </div>
               ) : (
                <div id="modal-middle-div"> Hello middle 2 <hr></hr>
                   <input type="text" placeholder="Node name...." className="Nodetext" onChange={this.handleChange} />
                </div>
               )
             }
             
             {
               this.state.page === 1 ? (
              <div id="modal-bottom-div"> Bottom modal 1 <hr></hr>
              <button id="modal-cancel-button" onClick={this.toggleModal} >Cancel </button>
              <button id="modal-next-button" onClick={this.handleNextPage} >Next </button>
             
              </div>
               ) : (
                <div id="modal-bottom-div"> Bottom modal 2 <hr></hr>
                <button id="modal-cancel-button" onClick={this.toggleModal}> Cancel </button>
                <button id="Addnode-button" onClick={this.handleAddTodoItem} >Add node</button>
                </div>

               )
             }
             </Modal>
            </section>
           {/* <input type="text" placeholder="Node name...." className="Nodetext" onChange={this.handleChange} />
           <button id="Addnode-button" onClick={this.handleAddTodoItem}>Add node</button> */}
           {/* CreateEdge Modal */}
           <section>
           <button id="Edge-modal" onClick={this.toggleModal2}>Create edge</button>
            <Modal isOpen={this.state.isActive2}  contentLabel="CreateEdge modal "
            onRequestClose={this.state.toggleModal2}
            style = {customCreateEdgeModal}>
            <div id="edge-top-div"> CreateEdge window</div>
            <div id="edge-middle-div">  hello middle edge1
              <input type="src-Edge" placeholder="Src-Edge..." className="src_Edgetxt" onChange={this.handleSrcChange}/>
              <input type="dsc-Edge" placeholder="Dsc-Edge..." className="dsc_Edgetxt" onChange={this.handleDscChange}/>
            </div>
            <div id ="edge-bottom-div">
            <button id="cancel-edge" onClick={this.toggleModal2}>Cancel </button>
            <button id="Edge-button" onClick={this.handleAddEdge}>Create edge2</button>
            </div>

            </Modal>
           </section>
           <button id="FullScreen-button" onClick={this.toggleFullScreen}>Full screen</button>
          <button id="Clear-Canvas" onClick={this.handleClearCanvas}> Clear Canvas </button>
          <div className="Canvas" align="center">Canvas area 
          < Graph id="graph-id"
              data={data}
              config={myConfig}
              onClickNode={onClickNode}
              onClickLink={onClickLink}
              onMouseOverNode={onMouseOverNode}
              onMouseOutNode={onMouseOutNode}
              onMouseOverLink={onMouseOverLink}
              onMouseOutLink={onMouseOutLink}/>;
           </div>

       </div>
    );
  }
}

export default App;