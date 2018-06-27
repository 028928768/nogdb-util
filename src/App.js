import React, { Component } from 'react';
import Modal from 'react-modal';
import Graph from 'react-graph-vis'
import $ from 'jquery'
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
 let Nodenumber;
 let Relationnumber;
 let NodeValue;
 let data = {
  nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
  links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]

};
 let graph1 = {
    nodes: [
      {id: "1", label: 'Node 1'},
      {id: "2", label: 'Node 2'},
      {id: "3", label: 'Node 3'},
      {id: "4", label: 'Node 4',title:'Popup show!!'},
      {id: "5", label: 'Node 5'}
    ],
    edges: [
      {from: "1", to: "2"},
      {from: "1", to: "3"},
      {from: "2", to: "4"},
      {from: "2", to: "5"}
    ]
};
// let graph2 = {
//   nodes: [
  
//   ],
//   edges: [
    
//   ]
// };
let graph3 = {
  nodes: [

  ],
  edges: [

  ]
};
 let options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color:{
      color: "blue",
      hover: "blue",
      highlight: "yellow"
    }
  },
 
  interaction:{
    hover:true
  },
  manipulation:{
    enabled: true    
  }
};


class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      graph: graph1,
      prevGraph: null,
      textvalue :" ",
      srcvalue: " ",
      dscvalue: " ",
      clear:[data],
      isActive:false,
      isActive2:false,
      page: 1,
      showMenu : false,
      isFullscreen:false,
      nodeID :" ",
  
      
    }
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSrcChange = this.handleSrcChange.bind(this);
    this.handleDscChange = this.handleDscChange.bind(this);
    this.handleDelTodoItem = this.handleAddTodoItem.bind(this);
    this.handleAddEdge = this.handleAddEdge.bind(this);
    this.handleClearCanvas = this.handleClearCanvas.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.toggleShowMenu = this.toggleShowMenu.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.handleNodeID = this.handleNodeID.bind(this);
    this.handleIncoming = this.handleIncoming.bind(this);
    this.handleOutcoming = this.handleOutcoming.bind(this);
    this.setToPreviousGraph = this.setToPreviousGraph.bind(this);

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

      let newNode ={id:this.state.textvalue,label:this.state.textvalue}
      let copy1 =this.state.graph.nodes.slice()
      let copy2 =this.state.graph.edges.slice()
      let check 
      //console.log(graph.nodes[1])
      for(let ele in copy1){
        //  console.log(ele)
        if ((JSON.stringify(newNode)) === JSON.stringify(copy1[ele])){
  
          check = false
          
          break         
        }
        else{
        
          check = true
          
        }
      } 
      if(check == true || check == undefined){
        copy1.push(newNode)  
        //console.log(this.state.graph.edges)
        console.log(copy1)
        this.setState(
          {graph:{nodes:copy1,edges:copy2}}
        )
        
      } 
    }
    handleAddEdge(){
      let newEdge ={from: this.state.srcvalue,to: this.state.dscvalue}
    let copy3 =this.state.graph.nodes.slice()
    let copy4 =this.state.graph.edges.slice()
    copy4.push(newEdge)
    console.log(copy4)
    this.setState(
      {graph:{nodes:copy3,edges:copy4}}
    )
    }
    handleClearCanvas(){
    
      this.setState(
         {graph:{nodes:[],edges:[]}}
      )
     
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
       setToPreviousGraph = () => {
        this.setState({
          graph:this.state.prevGraph
        })
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
      toggleShowMenu = () => {
        this.setState(prevState => ({
          showMenu: !prevState.showMenu
        }))
      }
      handleFullscreen = () => {
        $('#Canvas').addClass('CanvasFullScreen')
        this.setState(prevState => ({
          isFullscreen:!prevState.isFullscreen
        }))
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
      handleNodeID (nodeIDs){
        this.setState({
          nodeID: nodeIDs[0]
        })

      }
      handleIncoming = () => {
        

        this.setState(prevState => {
          const newGraph = { nodes: [], edges: [] };

          // this.setGraphdata2()
          console.log(prevState.nodeID)
          for(let ele3 in prevState.graph.nodes){
            if(prevState.graph.nodes[ele3].id === prevState.nodeID){
              newGraph.nodes.push(prevState.graph.nodes[ele3])
            }   
          } 
          for(let ele in prevState.graph.edges){
            
            if(prevState.graph.edges[ele].to === prevState.nodeID ){
              newGraph.edges.push(prevState.graph.edges[ele])
            }   

          } console.log(newGraph.edges)

          for(let ele in newGraph.edges){
            for(let ele2 in prevState.graph.nodes){
                  if(newGraph.edges[ele].from === prevState.graph.nodes[ele2].id || prevState.graph.nodes[ele2].id === prevState.nodeID)
                  newGraph.nodes.push(prevState.graph.nodes[ele2])
            
            }
          } 
          

          return {
            graph: newGraph,
            prevGraph: prevState.graph
          };
        });
      
        //  this.setGraphdata2();
      }
      handleOutcoming = () => {
        

      //   for(let ele3 in graph1.nodes){
      //     if(graph1.nodes[ele3].id == this.state.nodeID){
      //       graph3.nodes.push(graph1.nodes[ele3])
      //     }   
      //   }
      //   for(let ele1 in graph1.edges){
          
      //     if(graph1.edges[ele1].from == this.state.nodeID ){
      //     graph3.edges.push(graph1.edges[ele1])
      //     }   

      //   }
      //   for(let ele1 in graph2.edges){
      //     for(let ele3 in graph1.nodes){
      //          if(graph3.edges[ele1].to == graph1.nodes[ele3].id ||graph1.nodes[ele3].id == this.state.nodeID)
      //            graph3.nodes.push(graph1.nodes[ele3])
          
      //    }
      //  } 


      //   this.setGraphdata3();
      }
  
    
  render() {
    let { value }  = this.state;
    return (
       <div className="App">
         <header className="App-header">  
         </header>
         {
           this.state.isFullscreen ===true? (
             null
           ) : (
         <p className="App-intro"> NogDB Graph UI </p> 
           )
         }
         {
           this.state.isFullscreen === true ? (
             null
           ) : (
         <div className="Top-Box" align="center">Limit</div>
           )
         }
         {/* <p className="Display-msg">Displaying { Nodenumber = this.graph.nodes.length} nodes, {Relationnumber = this.graph.edges.length} relationships. </p> */}
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
           <button id="FullScreen-button" onClick={this.handleFullscreen}>Full screen</button>
          <button id="Clear-Canvas" onClick={this.handleClearCanvas}> Clear Canvas </button>
          {
            this.isFullscreen === true ? (
              <div> <p> Test parah </p> </div>
            ) : (
          <div className="Canvas" align="center">Canvas area 
            <Graph graph={this.state.graph} options={options} 
            events={{
              select: function(event) {
                var { nodes, edges } = event;
                // console.log("Selected nodes:");
                // console.log(nodes);
                // console.log("Selected edges:");
                // console.log(edges);
                console.log("This is Select")
                
              },
              selectNode : (function(event){
                console.log(event);
                this.handleNodeID(event.nodes);
                this.toggleShowMenu();
                console.log(event.nodes)
              }).bind(this),
              deselectNode : (function(event){
                console.log(event),
                this.toggleShowMenu();
                this.setToPreviousGraph();

              }).bind(this),
              showPopup : (function(event){
                console.log(event);
                console.log("This is popup!!")
            
              }).bind(this)
              }
            } />  
                   
           </div>
            )
          }
           <button id="his-button" onClick={this.toggleShowMenu}>History</button>
           {
             this.state.showMenu === true ? (
           <div id="history-div"> Command Menu {NodeValue=this.state.nodeID}
           <button title="Incoming Relationship" onClick={this.handleIncoming}> Incoming </button>
           {/* <button title="Incoming Relationship" onClick={this.handleIncoming(NodeValue)}> Incoming </button> */}
           <button title="Outcoming Relationship" onClick={this.handleOutcoming}> Outcoming </button>
           <button> Button3 </button>
           <button> Button4 </button>
           <button> Button5 </button>
           <button> Button6 </button>
           
            </div>
             
             ) : (
            null
             )
            } 
       </div>
    );
  }
}

export default App;