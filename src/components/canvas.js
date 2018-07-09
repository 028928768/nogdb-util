import React, { Component } from 'react';
import Graph from "react-graph-vis";



let graphCanvas = {
    nodes: [
      { id: "1", label: "Bill", group: "A" },
      { id: "2", label: "Queen", group: "A" },
      { id: "3", label: "King", group: "A" },
      { id: "4", label: "Jack", group: "A", title: "Popup show!!" },
      { id: "5", label: "Barry", group: "A" }
    ],
    edges: [
      { id: "1", from: "1", to: "2", label: "AAA", color: { color: "Crimson" } },
      {  from: "1", to: "4", label: "CCC", color: { color: "Magenta" } },
      {  from: "3", to: "5", label: "BBB", color: { color: "Navy" } },
      {  from: "4", to: "2", label: "DDD", color: { color: "YellowGreen" } }
    ]
  };
  
  const options = {
    groups: {
      A: { color: { background: "red", border: "red" }, size: 25 },
      B: { color: { background: "orange", border: "orange" }, size: 25 },
      C: { color: { background: "green", border: "green" }, size: 25 },
      D: { color: { background: "pink", border: "pink" }, size: 25 }
    },
    layout: {
      hierarchical: false
    },
    edges: {
      color: {
        hover: "blue",
        highlight: "yellow"
      },
      width: 3
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
      font: {
        size: 22
      }
    },
    interaction: {
      hover: true,
      selectable: true,
      selectConnectedEdges: false
    },
    manipulation: {
      enabled: true
    }
  };

class Canvas extends Component {
    render () {
         const {state} = this.props;
       

        return (
            <div className="Canvas" align="center"> 
                   <Graph
              graph={state.graphCanvas} 
              options={state.options}
              />
            
            </div>
        )
    }
}
export default Canvas