import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './graph'
import { fromJS, Map, List } from 'immutable';
import  faker  from 'faker';
import { options, graph } from './fixtures'
import { Provider } from 'react-redux';
import store from './store';
import Form from './Form';
import set from 'lodash/set';

function toKeyValue(listOfObjects) {
  let obj = {};
  listOfObjects.forEach((e) => obj[e.id] = e);
  return obj;
}

function toPlainList(object) {
  return Object.values(object);
}

class App extends Component {
  constructor(props) {
    super(props)
    const convertedNodes = toKeyValue(graph.nodes) 
    this.state = {
      nodes: convertedNodes,
      edges: graph.edges,
      selectedNode: 0,
    }
  }

  onAdd = () => {
    const exampleNode = {id: faker.random.number(), label: faker.name.firstName(), color: '#e0df41'}
    this.setState(({nodes}) => ({
      nodes: nodes.push(exampleNode)
    }))
  }

  getNodeIndex = (nodes, selectedNode) => (
    nodes.findIndex((item) => item.get('id') === selectedNode)
  )

  updateNode = (nodes, selectedNode) => {
    return nodes.update(
      this.getNodeIndex(nodes, selectedNode),
      (item) => item.set('label', 'poiwuer')
    )
  }


  //  onModify = () => {
  //    this.setState(({nodes, selectedNode}) => ({nodes: Object.assign(nodes[selectedNode] }))
  //  }

  //  renderAttributes = () => {
  //    const { nodes, selectedNode } = this.state;
  //    const nodeIndex = this.getNodeIndex(nodes, selectedNode);
  //    const node = nodes.get(nodeIndex)
  //    return node.map((value, attribute, key) => (
  //      <div key={node.get('id')}>
  //        <label>{attribute}</label>
  //        <input value={value} />
  //      </div>
  //    ))
  //  }
  handleSubmit = (e) => {
    console.log(set)
    this.setState(({nodes}) => ({nodes: set(nodes, e.id, e)}))
  }
  render() {
    const graphe = { nodes: toPlainList(this.state.nodes), edges: this.state.edges}

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


    const currentNode = this.state.nodes[this.state.selectedNode]
    return (
      <Provider store={store}>
        <div>
          <Graph graph={graphe} options={options} events={events} />
          <Form onSubmit={this.handleSubmit} initialValues={currentNode} currentNode={currentNode} />
        </div>
      </Provider>
    );
  }
}

export default App;
