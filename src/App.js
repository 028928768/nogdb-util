import React, { Component } from 'react';
import Modal from 'react-modal';
import Graph from 'react-graph-vis'
import $ from 'jquery'
import './App.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import classnames from 'classnames';

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
    { id: "4", label: 'Jack', group: 'A'},
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
      isAddNodeActive:false,
      isAddEdgeActive2:false,
      isEditNodeActive:false,
      isDeleteNodeActivate:false,
      page: 1,
      showMenu : false,
      isFullscreen:false,
      nodeID :" ",
      prevNodeID: " ",
      nodeClass:" ",
      flagisAddtoCanvas:true,
      NodeName : "",
      CreateDate : "",
      isPropertyDisplay : false,
      createEdgeMode: false,
      group: " "
  
      
    }
    this.handleAddNodebutton = this.handleAddNodebutton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSrcChange = this.handleSrcChange.bind(this);
    this.handleDscChange = this.handleDscChange.bind(this);
    this.AddEdgeToCanvas = this.AddEdgeToCanvas.bind(this);
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
    this.getNodeName = this.getNodeName.bind(this);
    this.getCreateDate = this.getCreateDate.bind(this);
    this.Resetalldisplaydata = this.Resetalldisplaydata.bind(this);
    this.resetrid = this.resetrid.bind(this);
    this.resetNodeclass = this.resetNodeclass.bind(this);
    this.resetNodename = this.resetNodename.bind(this);
    this.setDisplayprop = this.setDisplayprop.bind(this);
    this.setHideprop = this.setHideprop.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleNodeID2= this.handleNodeID2.bind(this)
  }
    toggle = (tab) =>{
      if(this.state.activeTab !== tab){
        this.setState ({
          activeTab:tab
        });
      }
    }
    setDisplayprop = () =>{
      this.setState({
        isPropertyDisplay:true
      })
    }
    setHideprop = () =>{
      this.setState({
        isPropertyDisplay:false
      })
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
      this.AddNodeToDatabase(newNode)
      this.AddNodeToCanvas(newNode,this.state.graph.edges);
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
    AddNodeToCanvas = (newNode, E) => {
      let CanvasNode = this.state.graph.nodes.slice();
     
  
      for (let ele in newNode) {
        if (
          JSON.stringify(CanvasNode).includes(JSON.stringify(newNode[ele])) ===
          false
        ) {
          CanvasNode.push(newNode[ele]);
        }
      }
      this.setState({
        graph: { nodes: CanvasNode, edges: E }
      });
    };
    handleCreateEdgebutton = () =>{
      let newEdge =[{from: this.state.srcvalue,to: this.state.dscvalue}]
      this.AddEdgeToDatabase(newEdge);
      this.AddEdgeToCanvas(newEdge);
      this.toggleModalCreateEdge();
    }
  
    AddEdgeToCanvas = (newEdge)=> {
      let CanvasNode = this.state.graph.nodes.slice();
      let CanvasEdge = this.state.graph.edges.slice();
  
      for (let ele in newEdge) {
        if (
          JSON.stringify(CanvasEdge).includes(JSON.stringify(newEdge[ele])) ===   false ) {
          CanvasEdge.push(newEdge[ele]);
        }
      }
      this.setState({ graph: { nodes: CanvasNode, edges: CanvasEdge } });
      return CanvasEdge;
      
    };
  
     
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
          isAddNodeActive:!this.state.isAddNodeActive,
          page :1
        })
      }
      toggleModalCreateEdge = () =>{
        this.setState({
          isCreateEdgeActive:!this.state.isCreateEdgeActive
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
        let g = document.getElementById("select-id")
        let selectGroup
    
       for (let i = 0; i<g.options.length;i++){
         if(g.options[i].selected === true){
            selectGroup = g.options[i]
         break
        }
     }   
        this.setState({ 
          page: 2, 
          group: selectGroup
        });
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
        console.log(this.state.nodeID)
      }
      handleNodeID2 = (nodeIDs) => {
        this.setState(prevState => ({
          nodeID: nodeIDs[0],    
          prevNodeID: prevState.nodeID
                  
        }));
        console.log(this.state.nodeID)
                 console.log(this.state.prevNodeID)

      };
      handleNodeClass =() => {
     
        for (let ele in this.state.graph.nodes){
          if (this.state.graph.nodes[ele].id === this.state.nodeID )         
            {
              this.setState ({
            nodeClass: this.state.graph.nodes[ele].group
                            })
        
            }   
       }
    }
      getNodeName = ()=>{
        for (let ele in this.state.graph.nodes){
          if (this.state.graph.nodes[ele].id === this.state.nodeID){
            this.setState ({
              NodeName : this.state.graph.nodes[ele].label
            })
          }
        }

      }
      getCreateDate = () => {
        console.log(this.state.graph.nodes.createdate)
        for (let ele in this.state.graph.nodes){
          if(this.state.graph.nodes[ele].id === this.state.nodeID){
            this.setState ({
              CreateDate : this.state.graph.nodes[ele].createdate
            })
          }
        }
      }
    handleIncoming = () => {
      let ArrayEdge = [];
      let ArrayNode = [];
      for (let ele in graphDB.edges) {
        if (graphDB.edges[ele].to === this.state.nodeID) {
          // CanvasEdge.push(graphDB.edges[ele])
          ArrayEdge.push(graphDB.edges[ele]);
        }
      }
  
      for (let ele in ArrayEdge) {
        for (let ele2 in graphDB.nodes) {
          if (
            ArrayEdge[ele].from === graphDB.nodes[ele2].id ||
            graphDB.nodes[ele2].id === this.state.nodeID
          )
            // CanvasNode.push(graphDB.nodes[ele2])
            ArrayNode.push(graphDB.nodes[ele2]);
        }
      }
      
      let E = this.AddEdgeToCanvas(ArrayEdge);
      console.log(E)
      this.AddNodeToCanvas(ArrayNode, E);
    }
    handleOutcoming = () => {
      let ArrayEdge = [];
      let ArrayNode = [];
  
      for (let ele in graphDB.edges) {
        if (graphDB.edges[ele].from === this.state.nodeID) {
          ArrayEdge.push(graphDB.edges[ele]);
        }
      }
      for (let ele in ArrayEdge) {
        for (let ele2 in graphDB.nodes) {
          if (
            ArrayEdge[ele].to === graphDB.nodes[ele2].id ||
            graphDB.nodes[ele2].id === this.state.nodeID
          )
            ArrayNode.push(graphDB.nodes[ele2]);
        }
      }
      let E = this.AddEdgeToCanvas(ArrayEdge);
  
      this.AddNodeToCanvas(ArrayNode, E);
    }
    changeRelationMode = () => {
      this.setState({
        createEdgeMode: true
      });
    }
    handleCreateRelation = () => {
      this.changeRelationMode();
      let src = this.state.nodeID;
      let dest = this.state.prevNodeID;
    };
      selectBoxList=()=>{
        let arr =[]
        const list =Object.keys(options.groups)
        for(let ele in list){
          arr.push(<option key={ele} value ={list[ele]}>{list[ele]}</option>)
        }
        return arr
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
       this.toggleShowMenu();
      }
      handleDeleteNode = () =>{
        for (let ele1 in graphDB.nodes){
          if(graphDB.nodes[ele1].id === this.state.nodeID){
            graphDB.nodes.splice(ele1,1);
          }
        }       
         this.handleRemoveNode();
         this.toggleDeletenodeModal();
         
      }
       Resetalldisplaydata = () => {
         this.resetrid();
         this.resetNodeclass();
         this.resetNodename();
       }
       resetrid = () => {
         this.setState({
          nodeID:""
         })
       }
       resetNodeclass = () => {
         this.setState({
           nodeClass:""
         })
       }
       resetNodename = () => {
         this.setState({
             NodeName: "",
           })
        
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
           this.state.isPropertyDisplay === true? (
         <div className="Left-tab">
         <div id="topbar-prop"> Node <button onClick={this.setHideprop}>Hide </button></div>

          <Nav tabs>
            <NavItem>
                 <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                         Properties
                 </NavLink>
            </NavItem>
            <NavItem>
                  <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }} >
                        Settings
                  </NavLink>
             </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
                 @rid    :  {this.state.nodeID} <br></br>
                 @class  :  {this.state.nodeClass} <br></br>
                 CreatedDate : {this.state.CreateDate}     <br></br>
                 name    :  {this.state.NodeName}  <br></br>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
               <h4>Tab 2 Contents </h4>
               <p> Display Format </p>
               <input type="text" placeholder="display format..." className="Displayformat-text" /> 
               <button> @rid</button> <button>@class</button> <button> createdate </button> <button> name </button>
               <br></br>
               <p> Node Size </p>
               <p> display node size </p>
               <p> Node Color </p>
               <select id="select-nodecolor"  > <option value="String">Red </option> 
                                         <option value="Integer">Blue </option>
                                         <option value="etc">Yellow </option>
                 </select>
               
               
              </Col>
            </Row>
          </TabPane>
        </TabContent>
         {/* <div id="properties-prop" onClick={console.log("Preoperties is clicked!")}> Properties</div>
         <div id="setting-prop"> Setting </div>
              @rid    :  {this.state.nodeID} <br></br>
              @class  :  {this.state.nodeClass} <br></br>
              CreatedDate : {this.state.CreateDate}     <br></br>
              name    :  {this.state.NodeName}  <br></br> */}
         </div>
           ) : (
             null
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
           <br></br>
            <button id ="Addnode-modal" onClick={this.toggleModalAddNode}>Add node </button>
             <Modal isOpen={this.state.isAddNodeActive} contentLabel = "addnode Modal" 
                    onRequestClose={this.state.toggleModal}
                    style = {customStyle} > <div id="Modal-header"> Add new node 
             <button id="hidemodal-button" onClick={this.toggleModal}>Hide Modal</button>
             </div>
             {
               this.state.page === 1 ? (
                <div id="modal-middle-div"> Hello middle 1 <hr></hr>
                  <select id="select-id"  > {this.selectBoxList()} </select>
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
            
          
           <button id="Edge-modal" onClick={this.toggleModalCreateEdge}>Create edge</button>
            <Modal isOpen={this.state.isCreateEdgeActive}  contentLabel="CreateEdge modal "
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
           <button id="FullScreen-button" onClick={this.handleFullscreen}>Full screen</button>
          <button id="Clear-Canvas" onClick={this.handleClearCanvas}> Clear Canvas </button>
          {
            this.isFullscreen === true ? (
              <div> <p> Test parah </p> </div>
            ) : 
            
            (
          <div className="Canvas" align="center"> <div id="command-div">{
            this.state.showMenu === true ? (
          <div id="history-div"> Command Menu {NodeValue=this.state.nodeID}
          <button id='Incoming-button' title="Incoming Relationship" onClick={this.handleIncoming}> Incoming </button>
          {/* <button title="Incoming Relationship" onClick={this.handleIncoming(NodeValue)}> Incoming </button> */}
          <button id='Outcoming-button' title="Outcoming Relationship" onClick={this.handleOutcoming}> Outcoming </button>
          {/* <section> */}
          <button id='Edit-button' onClick={this.toggleEditnodeModal}> Edit node{this.state.nodeID} </button>
          <Modal isOpen={this.state.isEditNodeActive} contentLabel='Node Editor'
          onRequestClose={this.toggleEditnodeModal} style={customCreateEdgeModal}>

          <div id='edit-top-div'> Edit Node : {this.state.nodeID}</div>
           <div id='edit-middle-div'> Classname : {this.state.nodeClass} <br></br>
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
          {/* </section> */}
          <button id='createRelation-button' title="create relationship" onClick={this.handleCreateRelation}> CreateRelation </button>
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
              <div>
       

        
      </div>
          
            )
           } 
           
           
            </div>
            <Graph graph={this.state.graph} options={options} 
            events={{
              select: function(event) {
                // console.log("Selected nodes:");
                // console.log(nodes);
                // console.log("Selected edges:");
                // console.log(edges);
                console.log("This is Select")
                
              },
              selectNode : (function(event){
                
                if (this.state.createEdgeMode === false) {
                  this.handleNodeID(event.nodes);
                    
                 } else {
                 this.handleNodeID2(event.nodes);
                 }
                 if (this.state.createEdgeMode === true) {
                  const src = this.state.prevNodeID.toString();
                  const dest = this.state.nodeID.toString();
                   this.AddEdgeToDatabase([{ from: src, to: dest }]);
                   this.AddEdgeToCanvas([{ from: src, to: dest }]);
                   this.state.createEdgeMode = false;
                   }
                //this.handleNodeID(event.nodes);
                this.handleNodeClass();
                this.getNodeName();
                this.getCreateDate();
                this.toggleShowMenu();
                this.setDisplayprop();
                //  console.log(event.nodes)
                
                 
                 
              }).bind(this),
              deselectNode : (function(event){
                console.log(event),
                this.toggleShowMenu();
                // this.Resetalldisplaydata();
                 this.setHideprop();
                

              }).bind(this),
              showPopup : (function(event){
                //console.log(event);
                //console.log("This is popup!!")
            
              }).bind(this)
              }
            } />  
                   
           </div>
            )
          }
           <button id="his-button" onClick={this.toggleShowMenu}>Command</button>
           
       </div>
    );
  }
}

export default App;