import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import './App.css';


 let data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
};
  
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
      color: 'green',
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
class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      value: [data],
      textvalue : " ",
      test:""
      
    }
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }
    handleChange(e){
      this.setState({
        textvalue:e.target.value
      })
    }
    handleAddTodoItem(){
      this.state.value.push(this.state.textvalue)
      this.setState(
        this.state
      )
      this.state
      console.log(this.state.value);
      
      
     
    }
  
  render() {
    let { value }  = this.state;
    return (
       <div className="App">
         <header className="App-header">  
         </header>
         <p className="App-intro"> NogDB Graph UI </p> 
         <div className="Top-Box" align="center">Limit</div>
         <p className="Display-msg">Displaying ... nodes, ... relationships. </p>
           <br/>
           <input type="text" placeholder="Inputhere" className="text" onChange={this.handleChange} />
           <button id="Addnode-button" onClick={this.handleAddTodoItem}>Add node</button>
           <button id="FullScreen-button" onClick={this.decrease}>Full screen</button>
           <button id="Clear-Canvas"> Clear Canvas </button>

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