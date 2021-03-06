import React, { Component } from "react";
import Modal from "react-modal";
import $ from "jquery";
import "./App.css";
import { Alert } from "reactstrap";
import {TabContent,TabPane,Nav,NavItem,NavLink,Card,Button,CardTitle,CardText,Row,Col} from "reactstrap";
import classnames from "classnames";
import NogDBTitle from '../components/title';
import Console from '../components/console';
import Canvas from '../components/canvas';
import History from '../components/history';
import { connect} from 'react-redux';
import {addnode,clearcanvas,fullscreen,exitfullscreen} from '../actions/mainButtonAction'
import NodePropertyMenu from '../components/nodepropsmenu';
import EdgePropertyMenu from '../components/edgepropsmenu';

const customStyle = {
  content: {
    posittion: "absolute",
    top: "20px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    marginRight: "15%",
    marginLeft: "15%",
    marginTop: "15%",
    marginBottom: "15%"
  }
};
const customAddNodeStyle = {
  content: {
    posittion: "absolute",
    top: "20px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    marginRight: "15%",
    marginLeft: "15%",
    marginTop: "10%",
    marginBottom: "10%"
  }
};
const customEditRStyle = { 
  content : {
    posittion:'absolute',
    top    : '20px',
    left   : '40px',
    right  : '40px',
    bottom : '40px',
    marginRight  : '15%',
    marginLeft   : '15%',
    marginTop    : '10%',
    marginBottom : '10%' 
  }
} ;
const customCreateEdgeModal = {
  content: {
    position: "absolute",
    top: "20px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    marginRight: "15%",
    marginLeft: "15%",
    marginTop: "15%",
    marginBottom: "15%"
  }
};

  const mapStateToProps = state => {
    return {
      graph:state.graph,
      scale:state.scale,
      data:state.data
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onAddnode: newNode => {
        dispatch (addnode(newNode))
      },
      onClearCanvas : nullCanvas => {
        dispatch (clearcanvas(nullCanvas))
      },
      onSetFullSceen :() => {
        dispatch (fullscreen())
      },
      onExitFullScreen : () => {
        dispatch (exitfullscreen())
      }
      
    }
  }



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textvalue: " ",
      srcvalue: " ",
      dscvalue: " ",
      editnodename: " ",
      isAddNodeActive: false,
      isAddEdgeActive2: false,
      isEditNodeActive: false,
      isDeleteNodeActivate: false,
      isDeleteRelationActivate: false,
      isCreateRelationActive: false,
      isEditRelationActive:false,
      page: 1,
      prevNodeID: " ",
      flagisAddtoCanvas: true,
      CreateDate: "",
      isEdgeproperty: false,
      createEdgeMode: false,
      isAlertShow: false,
      NodeLabel: " ",
      isCreateRAlertShow:false
    };
    this.handleAddNodebutton = this.handleAddNodebutton.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditNodeName = this.handleEditNodeName.bind(this);
    this.handleClearCanvas = this.handleClearCanvas.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
    // this.handleSrcChange = this.handleSrcChange.bind(this);
    // this.handleDscChange = this.handleDscChange.bind(this);
    // this.AddEdgeToCanvas = this.AddEdgeToCanvas.bind(this);
    // this.handleIncoming = this.handleIncoming.bind(this);
    // this.handleOutcoming = this.handleOutcoming.bind(this);
    // this.setToPreviousGraph = this.setToPreviousGraph.bind(this);
    // this.handleRemoveNode = this.handleRemoveNode.bind(this);
    // this.handleDeleteNode = this.handleDeleteNode.bind(this);
    // this.handleDeleteRelation = this.handleDeleteRelation.bind(this);
    // this.AddNodeToDatabase = this.AddNodeToDatabase.bind(this);
    // this.setFlagtoAddDatabase = this.setFlagtoAddDatabase.bind(this);
    // this.AddEdgeToDatabase = this.AddEdgeToDatabase.bind(this);
    // this.AddNodeToCanvas = this.AddNodeToCanvas.bind(this);
    // this.getNodeName = this.getNodeName.bind(this);
    // this.getCreateDate = this.getCreateDate.bind(this);
    // this.Resetalldisplaydata = this.Resetalldisplaydata.bind(this);
    // this.resetrid = this.resetrid.bind(this);
    // this.resetNodeclass = this.resetNodeclass.bind(this);
    // this.resetNodename = this.resetNodename.bind(this);
    // this.setDisplayprop = this.setDisplayprop.bind(this);
    // this.setHideprop = this.setHideprop.bind(this);
    // this.setDisplayEdge = this.setDisplayEdge.bind(this);
    // this.setHideEdge = this.setHideEdge.bind(this);
    // this.toggle = this.toggle.bind(this);
    // this.handleNodeID2 = this.handleNodeID2.bind(this);
    // this.updateNodeName = this.updateNodeName.bind(this);
    // this.handleAlertTrue = this.handleAlertTrue.bind(this);
    // this.handleAlertFalse = this.handleAlertFalse.bind(this);
    // this.getinRelationNode = this.getinRelationNode.bind(this);
    // this.getoutRelationNode = this.getoutRelationNode.bind(this);
    // this.setridDisplayFormat = this.setridDisplayFormat.bind(this);
    // this.saveNodeLabel = this.saveNodeLabel.bind(this);
    // this.toggleRelationMenu = this.toggleRelationMenu.bind(this);
    // this.toggleCreateRelationModalTrue = this.toggleCreateRelationModalTrue.bind(this);
    // this.handleCreateRelationbutton = this.handleCreateRelationbutton.bind(this);
    // this.toggleCreateRelationModalFalse = this.toggleCreateRelationModalFalse.bind(this);
    // this.toggleCreateRAlertmsgTrue  = this.toggleCreateRAlertmsgTrue.bind(this);
    // this.setridRelationDisplayFormat = this.setridRelationDisplayFormat.bind(this);
    // this.setclassRelationDisplayFormat = this.setclassRelationDisplayFormat.bind(this);
    // this.setinRelationDisplayFormat = this.setinRelationDisplayFormat.bind(this);
    // this.setoutRelationDisplayFormat = this.setoutRelationDisplayFormat.bind(this);
    // this.setmessageDisplayFormat = this.setmessageDisplayFormat.bind(this);
   
  }
  
  handleAddNodebutton() {
    let newNode = 
      {
        id: this.state.textvalue,
        label: this.state.textvalue,
        group: this.state.group
      }
    ;
   

    this.props.onAddnode(newNode)
    // this.AddNodeToDatabase(newNode);
    // this.AddNodeToCanvas(newNode, this.state.graph.edges);
    this.toggleModalAddNode();
  }
  toggleModalAddNode = () => {
    this.setState({
      isAddNodeActive: !this.state.isAddNodeActive,
      page: 1
    });
  };
  handleNextPage = () => {
    let g = document.getElementById("select-id");
    let selectGroup;

    for (let i =0; i<g.options.lenght;i++){
      if (g.option[i].selected ===true){
        selectGroup = g.options[i].value;
        break;
      }
    }
    this.setState({
      page:2,
       group:selectGroup
    });
  }
  selectBoxList=(graph)=>{
    let arr =[]
    const list =Object.keys(graph.options.groups)
    for(let ele in list){
      arr.push(<option key={ele} value ={list[ele]}>{list[ele]}</option>)
    }
    return arr
  }
  handleChange(e){
    this.setState({
      textvalue:e.target.value
    })
  }
  handleEditNodeName(e) {
        this.setState({
          editnodename: e.target.value
        });
      }

  handleClearCanvas() {
      let nullgraph ={
        nodes:[],
        edges:[]
      }
        this.props.onClearCanvas(nullgraph)
        this.setState({ graph: { nodes: [], edges: [] } });
      }
  handleFullscreen = () => {
    $("#Canvas").addClass("CanvasFullScreen");
    this.setState(prevState => ({
      isFullscreen: !prevState.isFullscreen
    }));
  };
  render() {
    const {graph,scale,data} = this.props;
    let pheader;
    if (scale.isFullscreen === true) {
      pheader = null;
    } else {
       pheader = <NogDBTitle/>
    }
    let consolebox;
    if (scale.isFullscreen === true) {
      consolebox = null;
    } else {
      consolebox = <Console/>
    }
    let historybox;
    if (scale.isFullscreen === true){
      historybox = null;
    } else {
      historybox = <History/>
    }
    let Nodetabbars;
    if (scale.NodeMenu === true ){
      Nodetabbars = <NodePropertyMenu/>
    } else if (scale.NodeMenu ===false){
      Nodetabbars = null;
    }
    let Edgetabbars;
    if (scale.EdgeMenu === true){
      Edgetabbars = <EdgePropertyMenu/>
    }else if (scale.EdgeMenu === false){
      Edgetabbars = null;
    }
    
   
    return(
      <div id='test-div'>
      {pheader}
      {/* <NodePropertyMenu/> */}
      {Nodetabbars} {Edgetabbars}
      {consolebox}



      <button id="Addnode-modal" onClick={this.toggleModalAddNode}>Add node</button>
        <Modal
          isOpen={this.state.isAddNodeActive}
          contentLabel="addnode Modal"
          onRequestClose={this.toggleModalAddNode}
          style={customAddNodeStyle}
        >
         
          <div id="AddnodeModal-header">
            Add new node 
            <button id="hidemodal-button" onClick={this.toggleModalAddNode}>Hide Modal</button>
          </div>
          {this.state.page === 1 ? (
            <div id="addnodemodal-middle-div">  
              Hello middle 1 <hr />
              Class :  <select id="select-id"> {this.selectBoxList(graph)} </select>
            </div>
          ) : (
            <div id="addnodemodal-middle-div">

              <div id="edit-middle-div"> Group : {this.state.nodeClass} <br /><br></br>
                <div id="inside-editmid-div"><br/>
                  <h5 id="Editnode-classname">name </h5>
                  <input type="node-edit" placeholder="Edit...." className="Node-editor" onChange={this.handleChange}/>
                  <select id="select-nodetype">
                    <option value="String">String </option>
                    <option value="Integer">Integer </option>
                    <option value="etc">Etc </option>
                  </select>
                  <br />
                 
                  <form action="/action_page.php">
                    CreateDate: <input type="date" name="bday" />{" "}
                    <input type="submit" />
                    <input type="time" id="myTime" value="22:15:00" />
                    <select id="select-nodetype">       
                      <option value="String">String </option>
                      <option value="Integer">Integer </option>
                      <option value="etc">Etc </option>
                    </select>
                  </form>
                </div>
              </div>


              Hello middle 2 
              {/* <input type="text" placeholder="Node name...." className="Nodetext" onChange={this.handleChange}/> */}
            </div>
          )}
          {this.state.page === 1 ? (
            <div id="addnodemodal-top-div">
             
              Bottom modal 1 <br></br><br></br>
              <button id="modal-cancel-button" onClick={this.toggleModalAddNode} >Cancel</button>
              <button id="modal-next-button" onClick={this.handleNextPage}>Next</button>
            </div>
          ) : (
            <div id="addnodemodal-bottom-div">  
              Bottom modal 2 
              <button id="modal-cancel-button" onClick={this.toggleModalAddNode}> Cancel</button>
              <button id="Addnode-button" onClick={this.handleAddNodebutton}>Add node</button>
            </div>
          )}
        </Modal>
        { scale.isFullscreen === false ? (
        <button id="FullScreen-button" onClick={this.props.onSetFullSceen}>
          Full screen
        </button>
        ) : (
          <button id="FullScreen-button" onClick={this.props.onExitFullScreen}>
          Exit Fullscreen
        </button>
        )
        }
        <button id="Clear-Canvas" onClick={this.handleClearCanvas}>
         Clear Canvas
        </button>


          
      <Canvas
        state = {graph}
    
      />
   
      {historybox}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

  
//   setridRelationDisplayFormat = () => {
//     this.setState(prevState => {
//       let canvasNode = prevState.graph.nodes.slice();
//       let canvasEdge = prevState.graph.edges.slice();
//       let backUp;
//       for (let ele in graphDB.edges) {
//         if ( graphDB.edges[ele].id === this.state.relationID) {      
//           backUp = graphDB.edges[ele];
//           break;
//         }
//       }
//       let chosen;
//       for (let ele in canvasEdge) {
//         if (this.state.relationID === canvasEdge[ele].id) {
//           chosen = canvasEdge[ele];

//           const update = { ...chosen, label: backUp.id };
//           canvasEdge[ele] = update;
          
//         }
//       }
//       return {
//         graph: {
//           nodes: canvasNode,
//           edges: canvasEdge
//         }
//       };
//     });
//   }


//   setclassRelationDisplayFormat = () =>{
//    //cann't store and query yet
//   }


//   setinRelationDisplayFormat = () =>{
//     this.setState(prevState => {
//       let canvasNode = prevState.graph.nodes.slice();
//       let canvasEdge = prevState.graph.edges.slice();
//       let backUp;
//       for (let ele in graphDB.edges) {
//         if ( graphDB.edges[ele].id === this.state.relationID) {      
//           backUp = graphDB.edges[ele];
//           break;
//         }
//       }
//       let chosen;
//       for (let ele in canvasEdge) {
//         if (this.state.relationID === canvasEdge[ele].id) {
//           chosen = canvasEdge[ele];

//           const update = { ...chosen, label: backUp.to };
//           canvasEdge[ele] = update;
          
//         }
//       }
//       return {
//         graph: {
//           nodes: canvasNode,
//           edges: canvasEdge
//         }
//       };
//     });
//   }
//   setoutRelationDisplayFormat =() =>{
//     this.setState(prevState => {
//       let canvasNode = prevState.graph.nodes.slice();
//       let canvasEdge = prevState.graph.edges.slice();
//       let backUp;
//       for (let ele in graphDB.edges) {
//         if ( graphDB.edges[ele].id === this.state.relationID) {      
//           backUp = graphDB.edges[ele];
//           break;
//         }
//       }
//       let chosen;
//       for (let ele in canvasEdge) {
//         if (this.state.relationID === canvasEdge[ele].id) {
//           chosen = canvasEdge[ele];

//           const update = { ...chosen, label: backUp.from };
//           canvasEdge[ele] = update;
          
//         }
//       }
//       return {
//         graph: {
//           nodes: canvasNode,
//           edges: canvasEdge
//         }
//       };
//     });
//   }
//   setinRelationRDisplayFormat = () =>{

//   }
//   // setoutRelationDisplayFormat = () => {

//   // }
//   setmessageDisplayFormat = () => {

//   }
//   toggleCreateRAlertmsgTrue = () => {
//     this.setState({
//       isCreateRAlertShow:true
//     })
//   }
//   toggleCreateRAlertmsgFalse = () =>{
//     this.setState({
//       isCreateRAlertShow:false
//     })
//   }
//   handleCreateRelationbutton = () => {
//     this.AddEdgeToDatabase([
//       { from: this.state.srcEdge, to: this.state.dscEdge }
//     ]);
//     this.AddEdgeToCanvas([
//       { from: this.state.srcEdge, to: this.state.dscEdge }
//     ]);
//     this.toggleCreateRelationModalFalse();
//     this.toggleCreateRAlertmsgTrue();
    
//   };
//   setSrcEdge = src => {
//     this.setState({
//       srcEdge: src
//     });
//   };
//   setDecEdge = dest => {
//     this.setState({
//       dscEdge: dest
//     });
//   };
//   toggleCreateRelationModalTrue = () => {
//     this.setState({
//       isCreateRelationActive:true
//     });
//   };
//   toggleCreateRelationModalFalse = () =>{
//     this.setState({
//       isCreateRelationActive:false
//     })
//     this.InitializePage();
//   }
//   toggleRelationMenu = () => {
//     this.setState(prevState => ({
//       showRelationMenu: !prevState.showRelationMenu
//     }));
//   };

//   saveNodeLabel = NodeLabel => {
//     this.setState({
//       NodeLabel: NodeLabel
//     });
//   };

//   setclassDisplayFormat = () => {
//     this.setState(prevState => {
//       let canvasNode = prevState.graph.nodes.slice();
//       let canvasEdge = prevState.graph.edges.slice();
//       let backUp;
//       for (let ele in graphDB.nodes) {
//         if (this.state.nodeID === graphDB.nodes[ele].id) {
//           backUp = graphDB.nodes[ele];
//           break;
//         }
//       }
//       let chosen;
//       for (let ele in canvasNode) {
//         if (this.state.nodeID === canvasNode[ele].id) {
//           chosen = canvasNode[ele];

//           const update = { ...chosen, label: backUp.group };
//           canvasNode[ele] = update;
//           console.log(canvasNode[ele]);
//         }
//       }
//       return {
//         graph: {
//           nodes: canvasNode,
//           edges: canvasEdge
//         }
//       };
//     });
//   };

//   setNameDisplayFormat = () => {
//     this.setState(prevState => {
//       let canvasNode = prevState.graph.nodes.slice();
//       let canvasEdge = prevState.graph.edges.slice();
//       let backUp;
//       for (let ele in graphDB.nodes) {
//         if (this.state.nodeID === graphDB.nodes[ele].id) {
//           backUp = graphDB.nodes[ele];
//           break;
//         }
//       }
//       let chosen;
//       for (let ele in canvasNode) {
//         if (this.state.nodeID === canvasNode[ele].id) {
//           chosen = canvasNode[ele];

//           const update = { ...chosen, label: backUp.label };
//           canvasNode[ele] = update;
//           console.log(canvasNode[ele]);
//         }
//       }
//       return {
//         graph: {
//           nodes: canvasNode,
//           edges: canvasEdge
//         }
//       };
//     });
//   };

//   setridDisplayFormat = () => {
//     this.setState(prevState => {
//       let canvasNode = prevState.graph.nodes.slice();
//       let canvasEdge = prevState.graph.edges.slice();
//       let backUp;
//       for (let ele in graphDB.nodes) {
//         if ( graphDB.nodes[ele].id === this.state.nodeID) {      
//           backUp = graphDB.nodes[ele];
//           break;
//         }
//       }
//       let chosen;
//       for (let ele in canvasNode) {
//         if (this.state.nodeID === canvasNode[ele].id) {
//           chosen = canvasNode[ele];

//           const update = { ...chosen, label: backUp.id };
//           canvasNode[ele] = update;
//           console.log(canvasNode[ele]);
//         }
//       }
//       return {
//         graph: {
//           nodes: canvasNode,
//           edges: canvasEdge
//         }
//       };
//     });
//   };


//   handleAlertTrue = () => {
//     this.setState({
//       isAlertShow: true
//     });
//   };
//   handleAlertFalse = () => {
//     this.setState({
//       isAlertShow: false
//     });
//   };
//   setDisplayprop = () => {
//     this.setState({
//       isPropertyDisplay: "nodeTrue"
//     });
//   };
//   setHideprop = () => {
//     this.setState({
//       isPropertyDisplay: "nodeFalse"
//     });
//   };
//   setDisplayEdge = () => {
//     this.setState({
//       isPropertyDisplay: "edgeTrue"
//     });
//   };
//   setHideEdge = () => {
//     this.setState({
//       isPropertyDisplay: "edgeFalse"
//     });
//   };
      
//   handleSrcChange(e) {
//     this.setState({
//       srcvalue: e.target.value
//     });
//   }
//   handleDscChange(e) {
//     this.setState({
//       dscvalue: e.target.value
//     });
//   }
  
//   setNewNodeName = (nodeID, newName) => {
//     this.setState(prevState => {
//       let canvasNode = prevState.graph.nodes.slice();
//       let canvasEdge = prevState.graph.edges.slice();
//       for (let ele in canvasNode) {
//         if (canvasNode[ele].id === nodeID) {
//           graphDB.nodes[ele].label = newName;
//           const updatedNode = {
//             ...canvasNode[ele],
//             label: newName
//           };
//           canvasNode[ele] = updatedNode;
//           console.log(canvasNode[ele]);
//         }
//       }

//       return {
//         graph: {
//           nodes: canvasNode,
//           edges: canvasEdge
//         }
//       };
//     });
//   };
//   updateNodeName() {
//     this.setNewNodeName(this.state.nodeID, this.state.editnodename);
//     console.log(this.state.graph.nodes);
//     this.toggleEditnodeModal();
//     this.handleAlertTrue();
//   }
//   setFlagtoAddDatabase = () => {
//     this.setState({
//       flagisAddtoCanvas: false
//     });
//   };
//   setFlagtoAddCanvas = () => {
//     this.setState({
//       flagisAddtoCanvas: true
//     });
//   };

  
//   AddNodeToDatabase = newNode => {
//     for (let ele in newNode) {
//       if (
//         JSON.stringify(graphDB.nodes).includes(JSON.stringify(newNode[ele])) ===
//         false
//       ) {
//         graphDB.nodes.push(newNode[ele]);
//       }
//     }

//     // console.log(graphDB.nodes)
//   };
//   AddNodeToCanvas = (newNode, E) => {
//     let CanvasNode = this.state.graph.nodes.slice();

//     for (let ele in newNode) {
//       if (
//         JSON.stringify(CanvasNode).includes(JSON.stringify(newNode[ele])) ===
//         false
//       ) {
//         CanvasNode.push(newNode[ele]);
//       }
//     }
//     this.setState({
//       graph: { nodes: CanvasNode, edges: E }
//     });
//   };
//   handleCreateEdgebutton = () => {
//     let newEdge = [{ from: this.state.srcvalue, to: this.state.dscvalue }];
//     this.AddEdgeToDatabase(newEdge);
//     this.AddEdgeToCanvas(newEdge);
//     this.toggleModalCreateEdge();
//   };

//   AddEdgeToCanvas = newEdge => {
//     let CanvasNode = this.state.graph.nodes.slice();
//     let CanvasEdge = this.state.graph.edges.slice();

//     for (let ele in newEdge) {
//       if (
//         JSON.stringify(CanvasEdge).includes(JSON.stringify(newEdge[ele])) ===
//         false
//       ) {
//         CanvasEdge.push(newEdge[ele]);
//       }
//     }
//     this.setState({ graph: { nodes: CanvasNode, edges: CanvasEdge } });
//     return CanvasEdge;
//   };

//   AddEdgeToDatabase = newEdge => {
//     for (let ele in newEdge) {
//       if (
//         JSON.stringify(graphDB.edges).includes(JSON.stringify(newEdge[ele])) ===
//         false
//       ) {
//         graphDB.edges.push(newEdge[ele]);
//       }
//     }
//     console.log(graphDB);
//   };

  
//   toggleFullScreen() {
//     if (
//       (document.fullScreenElement && document.fullScreenElement !== null) ||
//       (!document.mozFullScreen && !document.webkitIsFullScreen)
//     ) {
//       if (document.documentElement.requestFullScreen) {
//         document.documentElement.requestFullScreen();
//       } else if (document.documentElement.mozRequestFullScreen) {
//         document.documentElement.mozRequestFullScreen();
//       } else if (document.documentElement.webkitRequestFullScreen) {
//         document.documentElement.webkitRequestFullScreen(
//           Element.ALLOW_KEYBOARD_INPUT
//         );
//       }
//     } else {
//       if (document.cancelFullScreen) {
//         document.cancelFullScreen();
//       } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//       } else if (document.webkitCancelFullScreen) {
//         document.webkitCancelFullScreen();
//       }
//     }
//   }
 


//   toggleEditnodeModal = () => {
//     this.setState({
//       isEditNodeActive: !this.state.isEditNodeActive
//     });
//   };
//   toggleDeletenodeModal = () => {
//     this.setState({
//       isDeleteNodeActivate: !this.state.isDeleteNodeActivate
//     });
//   };
//   toggleEditRelationModal = () => {
//     this.setState({
//       isEditRelationActive:!this.state.isEditRelationActive
//     })
//   }
//   toggleDeleteRelationModal = () => {
//     this.setState({
//       isDeleteRelationActivate: !this.state.isDeleteRelationActivate
//     });
//   };
//   toggleShowMenu = () => {
//     this.setState(prevState => ({
//       showMenu: !prevState.showMenu
//     }));
//   };


  
  // handleNodeID(nodeIDs) {
  //   this.setState({
  //     nodeID: nodeIDs[0]
  //   });
  //   console.log(this.state.nodeID);
  // }
//   handleNodeID2 = nodeIDs => {
//     this.setState(prevState => ({
//       nodeID: nodeIDs[0],
//       prevNodeID: prevState.nodeID
//     }));
//     console.log(this.state.nodeID);
//     console.log(this.state.prevNodeID);
//   };

 
//   getCreateDate = () => {
//     for (let ele in this.state.graph.nodes) {
//       if (this.state.graph.nodes[ele].id === this.state.nodeID) {
//         this.setState({
//           CreateDate: this.state.graph.nodes[ele].createdate
//         });
//       }
//     }
//   };
//   handleIncoming = () => {
//     let ArrayEdge = [];
//     let ArrayNode = [];
//     for (let ele in graphDB.edges) {
//       if (graphDB.edges[ele].to === this.state.nodeID) {
//         // CanvasEdge.push(graphDB.edges[ele])
//         ArrayEdge.push(graphDB.edges[ele]);
//       }
//     }

//     for (let ele in ArrayEdge) {
//       for (let ele2 in graphDB.nodes) {
//         if (
//           ArrayEdge[ele].from === graphDB.nodes[ele2].id ||
//           graphDB.nodes[ele2].id === this.state.nodeID
//         )
//           // CanvasNode.push(graphDB.nodes[ele2])
//           ArrayNode.push(graphDB.nodes[ele2]);
//       }
//     }

//     let E = this.AddEdgeToCanvas(ArrayEdge);
//     console.log(E);
//     this.AddNodeToCanvas(ArrayNode, E);
//   };
//   handleOutcoming = () => {
//     let ArrayEdge = [];
//     let ArrayNode = [];

//     for (let ele in graphDB.edges) {
//       if (graphDB.edges[ele].from === this.state.nodeID) {
//         ArrayEdge.push(graphDB.edges[ele]);
//       }
//     }
//     for (let ele in ArrayEdge) {
//       for (let ele2 in graphDB.nodes) {
//         if (
//           ArrayEdge[ele].to === graphDB.nodes[ele2].id ||
//           graphDB.nodes[ele2].id === this.state.nodeID
//         )
//           ArrayNode.push(graphDB.nodes[ele2]);
//       }
//     }
//     let E = this.AddEdgeToCanvas(ArrayEdge);

//     this.AddNodeToCanvas(ArrayNode, E);
//   };
//   changeRelationMode = () => {
//     this.setState({
//       createEdgeMode: true
//     });
//   };
//   handleCreateRelation = () => {
//     this.changeRelationMode();
//     let src = this.state.nodeID;
//     let dest = this.state.prevNodeID;
//   };

//   handleRemoveNode = () => {
//     let BackupNode = this.state.graph.nodes.slice();
//     let BackupEdges = this.state.graph.edges.slice();
//     // let index = this.state.graph.nodes.indexOf(this.state.nodeID);
//     for (let ele1 in BackupNode) {
//       if (BackupNode[ele1].id === this.state.nodeID) {
//         console.log(ele1);
//         BackupNode.splice(ele1, 1);
//       }
//     }

//     console.log(this.state.graph.nodes);
//     this.setState({ graph: { nodes: BackupNode, edges: BackupEdges } });
//     this.toggleShowMenu();
//   };
//   handleRemoveRelation = () => {
//     let BackupNode = this.state.graph.edges.slice();
//     let BackupEdges = this.state.graph.edges.slice();

//     for (let ele1 in BackupEdges) {
//       if (BackupEdges[ele1].id === this.state.relationID) {
//         BackupEdges.splice(ele1, 1);
//       }
//     }

//     this.setState({ graph: { nodes: BackupNode, edges: BackupEdges } });
//     this.toggleRelationMenu();
//   };

//   handleDeleteRelation = () => {
//     for (let ele1 in graphDB.edges) {
//       if (graphDB.edges[ele1].id === this.state.relationID) {
//         graphDB.edges.splice(ele1, 1);
//       }
//     }
//     this.handleRemoveRelation();
//     this.toggleDeleteRelationModal();
//   };
//   handleDeleteNode = () => {
//     for (let ele1 in graphDB.nodes) {
//       if (graphDB.nodes[ele1].id === this.state.nodeID) {
//         graphDB.nodes.splice(ele1, 1);
//       }
//     }
//     this.handleRemoveNode();
//     this.toggleDeletenodeModal();
//   };
//   Resetalldisplaydata = () => {
//     this.resetrid();
//     this.resetNodeclass();
//     this.resetNodename();
//   };
//   resetrid = () => {
//     this.setState({
//       nodeID: ""
//     });
//   };
//   resetNodeclass = () => {
//     this.setState({
//       nodeClass: ""
//     });
//   };
//   resetNodename = () => {
//     this.setState({
//       NodeName: ""
//     });
//   };
//   handleSize25 = () => {
//     this.changeSize(25);
//   };
//   handleSize50 = () => {
//     this.changeSize(50);
//   };
//   handleSize75 = () => {
//     this.changeSize(75);
//   };
//   handleSize100 = () => {
//     this.changeSize(100);
//   };
//   changeSize = size => {
//     this.setState(prevState => {
//       let externalOp = prevState.options.groups;
//       let tempGroup;
//       for (let ele in this.state.graph.nodes) {
//         if (prevState.graph.nodes[ele].id === prevState.nodeID) {
//           tempGroup = prevState.graph.nodes[ele].group;
//           break;
//         }
//       }
//       if (tempGroup === "A") {
//         const updateSize = { ...externalOp.A, size: size };
//         const updateGroup = { ...externalOp, A: updateSize };
//         return {
//           options: {
//             groups: updateGroup
//           }
//         };
//       } else if (tempGroup === "B") {
//         const updateSize = { ...externalOp.B, size: size };
//         const updateGroup = { ...externalOp, B: updateSize };
//         return {
//           options: {
//             groups: updateGroup
//           }
//         };
//       } else if (tempGroup === "C") {
//         const updateSize = { ...externalOp.C, size: size };
//         const updateGroup = { ...externalOp, C: updateSize };
//         return {
//           options: {
//             groups: updateGroup
//           }
//         };
//       } else if (tempGroup === "D") {
//         const updateSize = { ...externalOp.D, size: size };
//         const updateGroup = { ...externalOp, D: updateSize };
//         return {
//           options: {
//             groups: updateGroup
//           }
//         };
//       }
//     });
//   };
//   selectedColor = () => {
//     this.setState(prevState => {
//       let externalOp = prevState.options.groups;
//       let color = document.getElementById("select-nodecolor").value;
//       let selectGroup;
//       for (let ele in this.state.graph.nodes) {
//         if (this.state.nodeID === this.state.graph.nodes[ele].id) {
//           selectGroup = this.state.graph.nodes[ele].group;
//         }
//       }
//       console.log(color);
//       console.log(externalOp);
//       console.log(selectGroup);
//       if (selectGroup === "A") {
//         const updateColor = {
//           ...externalOp.A,
//           color: { background: color, border: color }
//         };
//         const updateGroup = { ...externalOp, A: updateColor };
//         return {
//           options: {
//             groups: updateGroup
//           }
//         };
//       } else if (selectGroup === "B") {
//         const updateColor = {
//           ...externalOp.B,
//           color: { background: color, border: color }
//         };
//         const updateGroup = { ...externalOp, B: updateColor };
//         return {
//           options: {
//             groups: updateGroup
//           }
//         };
//       } else if (selectGroup === "C") {
//         const updateColor = {
//           ...externalOp.C,
//           color: { background: color, border: color }
//         };
//         const updateGroup = { ...externalOp, C: updateColor };
//         return {
//           options: {
//             groups: updateGroup
//           }
//         };
//       } else if (selectGroup === "D") {
//         const updateColor = {
//           ...externalOp.D,
//           color: { background: color, border: color }
//         };
//         const updateGroup = { ...externalOp, D: updateColor };
//         return {
//           options: {
//             groups: updateGroup
//           }
//         };
//       }
//     });
//   };
//   render() {


//     let tabbars;
//     if (this.state.isPropertyDisplay === "nodeTrue") {
//       tabbars = (
//         <div className="Left-tab">
//           <div id="topbar-prop">
//             Node <button onClick={this.setHideprop}>Hide </button>
//           </div>

//           <Nav tabs>
//             <NavItem>
//               <NavLink
//                 className={classnames({ active: this.state.activeTab === "1" })}
//                 onClick={() => {
//                   this.toggle("1");
//                 }}
//               >
//                 Properties
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 className={classnames({ active: this.state.activeTab === "2" })}
//                 onClick={() => {
//                   this.toggle("2");
//                 }}
//               >
//                 Settings
//               </NavLink>
//             </NavItem>
//           </Nav>
//           <TabContent activeTab={this.state.activeTab}>
//             <TabPane tabId="1">
//               <Row>
//                 <Col sm="12">
//                   <h4>Tab 1 Contents</h4>
//                   @rid : {this.state.nodeID} <br />
//                   @class : {this.state.nodeClass} <br />
//                   CreatedDate : {this.state.CreateDate} <br />
//                   name : {this.state.NodeName} <br />
//                 </Col>
//               </Row>
//             </TabPane>
//             <TabPane tabId="2">
//               <Row>
//                 <Col sm="12">
//                   <h4>Tab 2 Contents </h4>
//                   <p> Display Format </p>
//                   <input
//                     type="text"
//                     placeholder="display format..."
//                     className="Displayformat-text"
//                   />
//                   <button onClick={this.setridDisplayFormat}> @rid</button>
//                   <button onClick={this.setclassDisplayFormat}>@class</button>
//                   <button> createdate </button>
//                   <button onClick={this.setNameDisplayFormat}> name </button>

//                   <br />
//                   <p> Node Size </p>
//                   <button onClick={this.handleSize25}>25</button>
//                   <button onClick={this.handleSize50}>50</button>
//                   <button onClick={this.handleSize75}>75</button>
//                   <button onClick={this.handleSize100}>100</button>
//                   <p> display node size </p>
//                   <p> Node Color </p>
//                   <select id="select-nodecolor" onChange={this.selectedColor}>
//                     <option value="red">Red</option>
//                     <option value="orange">Orange</option>
//                     <option value="green">Green</option>
//                     <option value="blue">Blue</option>
//                     <option value="yellow">Yellow</option>
//                     <option value="aqua">Aqua</option>
//                     <option value="purple">Purple</option>
//                   </select>
//                 </Col>
//               </Row>
//             </TabPane>
//           </TabContent>
//         </div>
//       );
//     } else if (this.state.isPropertyDisplay === "nodeFalse") {
//       tabbars = null;
//     } else if (this.state.isPropertyDisplay === "edgeTrue") {
//       tabbars = (
        
     

//     let alertmsg;
//     if (this.state.isAlertShow === true) {
//       alertmsg = (
//         <Alert color="success" id="alertmsg">
//           Edit node succesfully .
//         </Alert>
//       );
//     } else if (this.state.isAlertShow === false) {
//       alertmsg = null;
//     }
//     let alertcreateRelationmsg;
//     if (this.state.isCreateRAlertShow === true){
//       alertcreateRelationmsg = 
//       <Alert color="success" id="CreateRmsg">
//       Create Relationship succesfully.
//       </Alert>
//     }else if(this.state.isCreateRAlertShow ===false){
//       alertcreateRelationmsg = null;
//     }

//    
//     let relationbox;

  

//     return (
//       <div className="App">
//         <header className="App-header" />
//         {pheader}
//         {alertmsg}
//         {alertcreateRelationmsg}
//         {tabbars}
//         {consolebox}

//         <br />
//         <br />
//         {/* <p className="Display-msg">Displaying { Nodenumber = this.state.graph.nodes.length} nodes, {Relationnumber = this.state.graph.edges.length} relationships. </p> */}
//         <br />
//         <br />
        
//         {this.isFullscreen === true ? (
//           <div>
          
//             <p> Test parah </p>
//           </div>
//         ) : (
//           <div className="Canvas" align="center">
//             {commandbox}
//             {relationbox}

            // <Graph
            //   graph={this.state.graph}
            //   options={this.state.options}
            //   events={{
                // selectNode: function(event) {
                //   if (this.state.createEdgeMode === false) {
                //     this.handleNodeID(event.nodes);
                //   } else {
                //     this.handleNodeID2(event.nodes);
                //   }
                //   if (this.state.createEdgeMode === true) {
                //     const src = this.state.prevNodeID.toString();
                //     const dest = this.state.nodeID.toString();
                //     this.setSrcEdge(src);
                //     this.setDecEdge(dest);
                //     this.toggleCreateRelationModalTrue();
                //     this.state.createEdgeMode = false;
                //   }

                //   //this.handleNodeID(event.nodes);
                //   this.handleNodeClass();
                //   this.getNodeName();
                //   // this.getCreateDate();
                //   this.toggleShowMenu();
                //   this.setDisplayprop();
                //   console.log(this.state.isPropertyDisplay);
                // }.bind(this),

                // deselectNode: function(event) {
                //   console.log(event), this.toggleShowMenu();
                //   // this.Resetalldisplaydata();
                //   console.log(this.state.isPropertyDisplay);
                //   //this.toggleRelationMenu();
                //   this.setHideEdge();
                //   this.setHideprop();
                //   this.handleAlertFalse();
                //   this.toggleCreateRAlertmsgFalse();
                // }.bind(this),

                // selectEdge: function(event) {
                //   this.handlerelationID(event.edges);
                //   this.getinRelationNode();
                //   this.getoutRelationNode();
                //   this.toggleRelationMenu();
                //   this.setDisplayEdge();
                //   console.log(this.state.isPropertyDisplay);
                // }.bind(this),
                // deselectEdge: function(event) {
                //   //console.log(event);
                //   //console.log("This is popup!!")
                //   this.toggleRelationMenu();

                //   this.setHideEdge();
                //   this.setHideprop();
                //   console.log(this.state.isPropertyDisplay);
                // }.bind(this)
            //   }}
            // />
        //   </div>
        // )}
//         <button id="his-button" onClick={this.toggleShowMenu}>
//           Command
//         </button>
//       </div>
//     );
//   }
// }

// export default App;







// let Nodenumber;
// let Relationnumber;
// let NodeValue;

//  let classListEdge = {
//    groups : {
//      AAA:{color:"Crimson"},
//      BBB:{color:"Navy"},
//      CCC:{color:"Magenta"},
//      DDD:{color:"YellowGreen"}

//    }
//  }

// let graphDB = {
//   nodes: [
//     { id: "1", label: "Bill", group: "A" },
//     { id: "2", label: "Queen", group: "A" },
//     { id: "3", label: "King", group: "A" },
//     { id: "4", label: "Jack", group: "A" },
//     { id: "5", label: "Barry", group: "A" },
//     { id: "6", label: "Jane", group: "B" },
//     { id: "7", label: "John", group: "B" },
//     { id: "8", label: "Alex", group: "B" },
//     { id: "9", label: "Bob", group: "B" },
//     { id: "10", label: "Car", group: "B" },
//     { id: "11", label: "Death", group: "C" },
//     { id: "12", label: "Elf", group: "C" },
//     { id: "13", label: "Frank", group: "C" },
//     { id: "14", label: "Oliver", group: "C" },
//     { id: "15", label: "Ryu", group: "C" },
//     { id: "16", label: "Max", group: "D" },
//     { id: "17", label: "Leon", group: "D" },
//     { id: "18", label: "Chris", group: "D" },
//     { id: "19", label: "Jill", group: "D" },
//     { id: "20", label: "Herry", group: "D" }
//   ],
//   edges: [
//     { id: "1", from: "1", to: "2", label: "AAA", color: { color: "Crimson" } },
//     { from: "1", to: "4", label: "CCC", color: { color: "Magenta" } },
//     { from: "1", to: "15", label: "BBB", color: { color: "Navy" } },
//     { from: "1", to: "18", label: "DDD", color: { color: "YellowGreen" } },
//     { from: "2", to: "7", label: "AAA", color: { color: "Crimson" } },
//     { from: "2", to: "14", label: "CCC", color: { color: "Magenta" } },
//     { from: "2", to: "19", label: "DDD", color: { color: "YellowGreen" } },
//     { from: "3", to: "5", label: "BBB", color: { color: "Navy" } },
//     { from: "4", to: "2", label: "DDD", color: { color: "YellowGreen" } },
//     { from: "6", to: "10", label: "DDD", color: { color: "YellowGreen" } },
//     { from: "6", to: "11", label: "CCC", color: { color: "Magenta" } },
//     { from: "7", to: "8", label: "DDD", color: { color: "YellowGreen" } },
//     { from: "7", to: "19", label: "AAA", color: { color: "Crimson" } },
//     { from: "8", to: "2", label: "CCC", color: { color: "Magenta" } },
//     { from: "8", to: "6", label: "BBB", color: { color: "Navy" } },
//     { from: "9", to: "17", label: "CCC", color: { color: "Magenta" } },
//     { from: "10", to: "1", label: "CCC", color: { color: "Magenta" } },
//     { from: "10", to: "8", label: "BBB", color: { color: "Navy" } },
//     { from: "12", to: "5", label: "BBB", color: { color: "Navy" } },
//     { from: "12", to: "11", label: "DDD", color: { color: "YellowGreen" } },
//     { from: "12", to: "15", label: "AAA", color: { color: "Crimson" } },
//     { from: "13", to: "17", label: "BBB", color: { color: "Navy" } },
//     { from: "14", to: "20", label: "CCC", color: { color: "Magenta" } },
//     { from: "16", to: "3", label: "CCC", color: { color: "Magenta" } },
//     { from: "16", to: "7", label: "BBB", color: { color: "Navy" } },
//     { from: "17", to: "19", label: "CCC", color: { color: "Magenta" } },
//     { from: "18", to: "20", label: "AAA", color: { color: "Crimson" } },
//     { from: "19", to: "4", label: "DDD", color: { color: "YellowGreen" } },
//     { from: "20", to: "1", label: "CCC", color: { color: "Magenta" } }
//   ]
// };