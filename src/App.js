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
let graphDB = {
  nodes: [
    { id: "1", label: 'Bill', group: 'A' },
    { id: "2", label: 'Queen', group: 'A' },
    { id: "3", label: 'King', group: 'A' },
    { id: "4", label: 'Jack', group: 'A', title: 'Popup show!!' },
    { id: "5", label: 'Barry', group: 'A' },
    { id: "6", label: 'Jane', group: 'B' },
    { id: "7", label: 'John', group: 'B' },
    { id: "8", label: 'Alex', group: 'B' },
    { id: "9", label: 'Bob', group: 'B' },
    { id: "10", label: 'Car', group: 'B' },
    { id: "11", label: 'Death', group: 'C' },
    { id: "12", label: 'Elf', group: 'C' },
    { id: "13", label: 'Frank', group: 'C' },
    { id: "14", label: 'Oliver', group: 'C' },
    { id: "15", label: 'Ryu', group: 'C' },
    { id: "16", label: 'Max', group: 'D' },
    { id: "17", label: 'Leon', group: 'D' },
    { id: "18", label: 'Chris', group: 'D' },
    { id: "19", label: 'Jill', group: 'D' },
    { id: "20", label: 'Herry', group: 'D' }
  ],
  edges: [
    { from: "1", to: "2" },
    { from: "1", to: "4" },
    { from: "1", to: "15" },
    { from: "1", to: "18" },
    { from: "2", to: "7" },
    { from: "2", to: "14" },
    { from: "2", to: "19" },
    { from: "3", to: "5" },
    { from: "4", to: "2" },
    { from: "6", to: "10" },
    { from: "6", to: "11" },
    { from: "7", to: "8" },
    { from: "7", to: "19" },
    { from: "8", to: "2" },
    { from: "8", to: "6" },
    { from: "9", to: "17" },
    { from: "10", to: "1" },
    { from: "10", to: "8" },
    { from: "12", to: "5" },
    { from: "12", to: "11" },
    { from: "12", to: "15" },
    { from: "13", to: "17" },
    { from: "14", to: "20" },
    { from: "16", to: "3" },
    { from: "16", to: "7" },
    { from: "17", to: "19" },
    { from: "18", to: "20" },
    { from: "19", to: "4" },
    { from: "20", to: "1" }
  ]
};
 let graphCanvas = {
  nodes: [
    { id: "1", label: 'Bill', group: 'A' },
    { id: "2", label: 'Queen', group: 'A' },
    { id: "3", label: 'King', group: 'A' },
    { id: "4", label: 'Jack', group: 'A', title: 'Popup show!!' },
    { id: "5", label: 'Barry', group: 'A' }
  ],
  edges: [
    { from: "1", to: "2" },
    { from: "1", to: "4" },
    { from: "3", to: "5" },
    { from: "4", to: "2" }
  ]
};

const options = {
  groups: {
    A: { color: { background: 'red', border: 'red' }, },
    B: { color: { background: 'orange', border: 'orange' } },
    C: { color: { background: 'green', border: 'green' } },
    D: { color: { background: 'pink', border: 'pink' } },
  },
  layout: {
    hierarchical: false
  },
  edges: {
    color: {
      hover: "blue",
      highlight: "yellow",
      inherit: 'from'
    }
  },
  nodes: {
    color: {
      hover: {
        border: "blue"
      },
      highlight: {
        border: "yellow"
      }
    },
    shape: "dot",
    size: 25,
    font:{
      size: 22
    }


  },
  interaction: {
    hover: true,
    selectable: true,
    selectConnectedEdges: true
  },
  manipulation: {
    enabled: true
  }
};



class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      graph: graphCanvas,
      textvalue :" ",
      srcvalue: " ",
      dscvalue: " ",
      clear:[data],
      isActive:false,
      isActive2:false,
      isEditNodeActive:false,
      isDeleteNodeActivate:false,
      page: 1,
      showMenu : false,
      isFullscreen:false,
      nodeID :" ",
      nodeClass:" ",
      flagisAddtoCanvas:true
  
      
    }
    this.handleAddNodebutton = this.handleAddNodebutton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSrcChange = this.handleSrcChange.bind(this);
    this.handleDscChange = this.handleDscChange.bind(this);
    this.AddEdgetoCanvas = this.AddEdgetoCanvas.bind(this);
    this.handleClearCanvas = this.handleClearCanvas.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.toggleShowMenu = this.toggleShowMenu.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.handleNodeID = this.handleNodeID.bind(this);
    this.handleNodeClass = this.handleNodeClass.bind(this);
    this.handleIncoming = this.handleIncoming.bind(this);
    this.handleOutcoming = this.handleOutcoming.bind(this);
    this.setToPreviousGraph = this.setToPreviousGraph.bind(this);
    this.handleRemoveNode = this.handleRemoveNode.bind(this);
    this.handleDeleteNode = this.handleDeleteNode.bind(this);
    this.AddNodeToDatabase = this.AddNodeToDatabase.bind(this);
    this.setFlagtoAddDatabase = this.setFlagtoAddDatabase.bind(this);
    this.AddEdgeToDatabase = this.AddEdgeToDatabase.bind(this);
    this.AddNodeToCanvas = this.AddNodeToCanvas.bind(this);
    
    
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
    setFlagtoAddDatabase = () =>{
      this.setState({
        flagisAddtoCanvas:false
      })
    }
    setFlagtoAddCanvas = () =>{
      this.setState({
        flagisAddtoCanvas:true
      })
    }
    
    handleAddNodebutton(){

      let newNode =[{id:this.state.textvalue,label:this.state.textvalue}]
      // let CanvasNode =this.state.graph.nodes.slice()
      // let CanvasEdge =this.state.graph.edges.slice()
      let check 
    
      this.AddNodeToDatabase(newNode)
      this.AddNodeToCanvas(newNode)
      

      this.toggleModal();
    }
    AddNodeToDatabase = (newNode) =>{ 
        
        for(let ele in newNode){
          if(JSON.stringify(graphDB.nodes).includes(JSON.stringify(newNode[ele]))===false){
            graphDB.nodes.push(newNode[ele]) 
          }             
        }

        // console.log(graphDB.nodes)
       
  
    }
    AddNodeToCanvas = (newNode) => {
      let CanvasNode = this.state.graph.nodes.slice();
      let CanvasEdge = this.state.graph.edges.slice();

      for(let ele in newNode){
        if(JSON.stringify(CanvasNode).includes(JSON.stringify(newNode[ele]))===false){
          CanvasNode.push(newNode[ele]) 
        }             
      }
      this.setState({
        graph:{nodes:CanvasNode,edges:CanvasEdge}
      })
      
    }
    handleCreateEdgebutton = () =>{
      let newEdge =[{from: this.state.srcvalue,to: this.state.dscvalue}]
      this.AddEdgeToDatabase(newEdge);
      this.AddEdgetoCanvas(newEdge);
      this.toggleModalCreateEdge();
    }
  
    AddEdgetoCanvas = (newEdge) =>{
    let CanvasNode =this.state.graph.nodes.slice()
    let CanvasEdge =this.state.graph.edges.slice()
    for(let ele in newEdge){     
      if(JSON.stringify(CanvasEdge).includes(JSON.stringify(newEdge[ele]))===false){
        CanvasEdge.push(newEdge[ele])
      }
    } 
    this.setState(
      {graph:{nodes:CanvasNode,edges:CanvasEdge}}
    )
    
    }
  
     
    AddEdgeToDatabase = (newEdge) => {

      for(let ele in newEdge){     
        if(JSON.stringify(graphDB.edges).includes(JSON.stringify(newEdge[ele]))===false){
          graphDB.edges.push(newEdge[ele])
        }
     
      }
    console.log(graphDB)
    
    
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
      toggleModalAddNode = () => {
        this.setState({
          isActive:!this.state.isActive,
          page :1
        })
      }
      toggleModalCreateEdge = () =>{
        this.setState({
          isActive2:!this.state.isActive2
        })
      }
      toggleEditnodeModal = () =>{
        this.setState({
          isEditNodeActive:!this.state.isEditNodeActive
        })
      }
      toggleDeletenodeModal = () => {
        this.setState({
          isDeleteNodeActivate:!this.state.isDeleteNodeActivate
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
      handleNodeID (nodeIDs){
        this.setState({
          nodeID: nodeIDs[0]
        })

      }
      handleNodeClass (nodeclass){
        let key,keys = [];
        for (key in nodeclass){
          keys.push(key);
        }
        console.log(keys);
        // for (let ele in this.state.graph.nodes){
        //   if(this.state.graph.nodes.group.includes(nodeclass[ele]) ===true && this.state.graph.nodes.id == this.state.nodeID){
        //     this.setState ({
        //       nodeClass: Object.keys(nodeclass)
        //     })
        //   }
        // }
        this.setState ({
          nodeClass: keys
        })
        console.log(this.state.nodeClass);
    }
      handleIncoming = () => {
          let CanvasNode = this.state.graph.nodes.slice();
          let CanvasEdge = this.state.graph.edges.slice();
          let Array1 = [];
          let Array2 = [];
          for(let ele in graphDB.edges){
            if(graphDB.edges[ele].to === this.state.nodeID ){
              // CanvasEdge.push(graphDB.edges[ele])
               Array1.push(graphDB.edges[ele])
             
            }   
            
          } 
          console.log(Array1);
           this.AddEdgetoCanvas(Array1)

          for(let ele in Array1){
            for(let ele2 in graphDB.nodes){
                  if(Array1[ele].from === graphDB.nodes[ele2].id || graphDB.nodes[ele2].id === this.state.nodeID)
                    // CanvasNode.push(graphDB.nodes[ele2])
                    Array2.push(graphDB.nodes[ele2])
              
            }
          } 
          console.log(Array2);     
           this.AddNodeToCanvas(Array2)
           
      }
      handleOutcoming = () => {
        let CanvasNode = this.state.graph.nodes.slice();
        let CanvasEdge = this.state.graph.edges.slice();
        let Array1 = [];
        let Array2 = [];
        let Array3 = [];
           for(let ele3 in graphDB.nodes){
             if(graphDB.nodes[ele3].id === this.state.nodeID){
               Array1.push(graphDB.nodes[ele3])
               
             }   
           }this.AddNodeToCanvas(Array1)
           for(let ele1 in graphDB.edges){
          
             if(graphDB.edges[ele1].from === this.state.nodeID ){
             Array2.push(graphDB.edges[ele1])
             }   

           }
           this.AddEdgetoCanvas(Array2);
           for(let ele1 in Array2){
             for(let ele3 in graphDB.nodes){
                  if(Array2[ele1].to === graphDB.nodes[ele3].id ||graphDB.nodes[ele3].id === this.state.nodeID)
                    Array3.push(graphDB.nodes[ele3])
                  
            }
          }  this.AddNodeToCanvas(Array3);
          

          
      }
      handleRemoveNode = () => {
        let BackupNode =this.state.graph.nodes.slice()
        let BackupEdges =this.state.graph.edges.slice()
        // let index = this.state.graph.nodes.indexOf(this.state.nodeID);
        for (let ele1 in BackupNode){
          if(BackupNode[ele1].id === this.state.nodeID){
            console.log(ele1);
            BackupNode.splice(ele1,1);
            
          }
        }
       
        console.log(this.state.graph.nodes)
        this.setState(
          {graph:{nodes:BackupNode,edges:BackupEdges}}
       )
      }
      handleDeleteNode = () =>{
        for (let ele1 in graphDB.nodes){
          if(graphDB.nodes[ele1].id === this.state.nodeID){
            graphDB.nodes.splice(ele1,1);
          }
        }
        console.log(graphDB);
         this.handleRemoveNode();
        this.toggleDeletenodeModal();
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
         <div className="Left-tab">
         <div id="topbar-prop"> Node <button>Hide </button></div>
         <div id="properties-prop"> Properties</div>
         <div id="setting-prop"> Setting </div>
              @rid    :  {this.state.nodeID} <br></br>
              @class  :  {this.state.nodeClass} <br></br>
         </div>
         
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
                <button id="Addnode-button" onClick={this.handleAddNodebutton} >Add node</button>
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
            <button id="Edge-button" onClick={this.handleCreateEdgebutton}>Create edge2</button>
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
                this.handleNodeClass(options.groups);
                this.toggleShowMenu();
                console.log(event.nodes)
              }).bind(this),
              deselectNode : (function(event){
                console.log(event),
                this.toggleShowMenu();
                

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
           <button id='Incoming-button' title="Incoming Relationship" onClick={this.handleIncoming}> Incoming </button>
           {/* <button title="Incoming Relationship" onClick={this.handleIncoming(NodeValue)}> Incoming </button> */}
           <button id='Outcoming-button' title="Outcoming Relationship" onClick={this.handleOutcoming}> Outcoming </button>
           <section>
           <button id='Edit-button' onClick={this.toggleEditnodeModal}> Edit node{this.state.nodeID} </button>
           <Modal isOpen={this.state.isEditNodeActive} contentLabel='Node Editor'
           onRequestClose={this.toggleEditnodeModal} style={customCreateEdgeModal}>

           <div id='edit-top-div'> Edit Node</div>
            <div id='edit-middle-div'> Classname : User <br></br>
                <div id='inside-editmid-div'> <br></br>
                    <h5 id='Editnode-classname'>User </h5>
                    <input type="node-edit" placeholder="Edit...." className="Node-editor" onChange={this.handleSrcChange}/>
                    <select id="select-nodetype"  > <option value="String">String </option> 
                                          <option value="Integer">Integer </option>
                                          <option value="etc">Etc </option>
                  </select> <br></br>
                    {/* <h5 id='CreateDate'>CreateDate</h5> */}
                     <form action="/action_page.php">CreateDate: <input type="date" name="bday"/> <input type="submit"/>
                     <input type="time" id="myTime" value="22:15:00"/>
                     <select id="select-nodetype"  > <option value="String">String </option> 
                                          <option value="Integer">Integer </option>
                                          <option value="etc">Etc </option>
                     </select> 
                     </form> 
                    
                   
                    
               </div>
            </div>
            <div id ="edge-bottom-div">
            <br></br>
            <button id="cancel-edge" onClick={this.toggleEditnodeModal}>Cancel </button>
            <button id="Edge-button" >Save Change</button>
            </div>


           </Modal>  


           </section>
           <button id='createRelation-button' title="create relationship"> CreateRelation </button>
           <button id='removeNode-button' title="remove node from canvas" onClick={this.handleRemoveNode}> Remove </button>
           <section>
           <button id='deleteNode-button'title="delete node from Database" onClick={this.toggleDeletenodeModal} > Delete </button>
              <Modal isOpen={this.state.isDeleteNodeActivate} contentLabel="DeleteNodeModal"
              onRequestClose={this.toggleDeletenodeModal} style={customCreateEdgeModal}>
                <div id="top-deletenode-div" > DeleteNode </div>
                <div id="middle-deletenode-div" > Deleting node {this.state.nodeID} will permanantly be removed from your Database
                </div>
                <div id="bottom-deletenode-div" >
                <button onClick={this.toggleDeletenodeModal}> No,keep Node</button>
                <button onClick={this.handleDeleteNode}> Yes,Delete Node! </button>
                   </div>

              </Modal>
           </section>
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