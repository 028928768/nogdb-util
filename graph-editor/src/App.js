import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';
import './App.css';
 let msg = "No Display";
 let nodeCount;

 let data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
};
 let Nodenumber;
 let Relationnumber;
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
      dscvalue: " "
      
    }
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSrcChange = this.handleSrcChange.bind(this);
    this.handleDscChange = this.handleDscChange.bind(this);
    this.handleDelTodoItem = this.handleAddTodoItem.bind(this);
    this.handleAddEdge = this.handleAddEdge.bind(this);
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
      this.state({
        
       
      }

      )
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
           <input type="text" placeholder="Node name...." className="Nodetext" onChange={this.handleChange} />
           <button id="Addnode-button" onClick={this.handleAddTodoItem}>Add node</button>
           <input type="src-Edge" placeholder="Src-Edge..." className="src_Edgetxt" onChange={this.handleSrcChange}/>
           <input type="dsc-Edge" placeholder="Dsc-Edge..." className="dsc_Edgetxt" onChange={this.handleDscChange}/>
           <button id="Edge-button" onClick={this.handleAddEdge}>Create edge</button>
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