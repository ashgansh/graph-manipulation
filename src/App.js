import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './graph'
import { fromJS, Map, List } from 'immutable';
import  faker  from 'faker';

let graph = {
  nodes: [
      {id: 1, label: 'Node 1', color: '#e04141'},
      {id: 2, label: 'Node 2', color: '#e09c41'},
      {id: 3, label: 'Node 3', color: '#e0df41'},
      {id: 4, label: 'Node 4', color: '#7be041'},
      {id: 5, label: 'Node 5', color: '#41e0c9'}
    ],
  edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
};

let options = {
    layout: {
        hierarchical: false
    },
    edges: {
        color: "#000000"
    }
};

class App extends Component {
  constructor(props) {
    console.log('hello')
    super(props)
    this.state = {
      nodes: fromJS(graph.nodes),
      edges: fromJS(graph.edges),
      selectedNode: 0,
    }
  }

  onAdd = () => {
    const exampleNode = {id: faker.random.number(), label: faker.name.firstName(), color: '#e0df41'}
    this.setState(({nodes}) => ({
      nodes: nodes.push(exampleNode)
    }))
  }

  //  getId = (element) => {
  //    const id = 2 
  //    return element.id === id
  //  }
  getNodeIndex = (nodes, selectedNode) => (
    nodes.findIndex((item) => item.get('id') === selectedNode)
  )

  updateNode = (nodes, selectedNode) => {
    return nodes.update(
      this.getNodeIndex(nodes, selectedNode),
      (item) => item.set('label', 'poiwuer')
    )
  }


  onModify = () => {
    this.setState(({nodes, selectedNode}) => ({nodes: this.updateNode(nodes, selectedNode)}))
  }

  renderAttributes = () => {
    const { nodes, selectedNode } = this.state;
    const nodeIndex = this.getNodeIndex(nodes, selectedNode);
    const node = nodes.get(nodeIndex)
    console.log(node)
    return node.map((attribute, index) => (
      <div key={index}>
        <label>{attribute}</label>
        <input value={node.get(attribute)}/>
      </div>
    ))
  }
  render() {
    const graphe = { nodes: this.state.nodes.toJS(), edges: this.state.edges.toJS() }

    const selectNode = (node) => this.setState(() => ({selectedNode: node}));
    let events = {
      select: (event) => {
        const { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
        selectNode(nodes[0])
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        <Graph graph={graphe} options={options} events={events} />
        <button onClick={this.onAdd}>my input</button>
        <button onClick={this.onModify}>modify</button>
        {this.state.selectedNode > 0 && this.renderAttributes()}
      </div>
    );
  }
}

export default App;
