import React, { Component } from 'react';
import Graph from "react-graph-vis";




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