import React, {Component} from "react"
import Graph from "./graph"
import faker from "faker"
import {options, graph} from "./fixtures"
import {Provider} from "react-redux"
import store from "./store"
import Form from "./Form"
import set from "lodash/set"
import { Container } from 'semantic-ui-react'

function toKeyValue(listOfObjects) {
  let obj = {}
  listOfObjects.forEach(e => (obj[e.id] = e))
  return obj
}

function toPlainList(object) {
  return Object.values(object)
}

class App extends Component {
  constructor(props) {
    super(props)
    const convertedNodes = toKeyValue(graph.nodes)
    this.state = {
      nodes: convertedNodes,
      edges: graph.edges,
      selectedNode: 0
    }
  }

  onAdd = () => {
    const exampleNode = {
      id: faker.random.number(),
      label: faker.name.firstName(),
      color: "#e0df41"
    }
    this.setState(({nodes}) => ({
      nodes: nodes.push(exampleNode)
    }))
  }

  getNodeIndex = (nodes, selectedNode) =>
    nodes.findIndex(item => item.get("id") === selectedNode)

  updateNode = (nodes, selectedNode) => {
    return nodes.update(this.getNodeIndex(nodes, selectedNode), item =>
      item.set("label", "poiwuer")
    )
  }

  handleSubmit = values => {
    this.setState(({nodes}) => ({nodes: set(nodes, values.id, values)}))
  }

  render() {
    const graphe = {
      nodes: toPlainList(this.state.nodes),
      edges: this.state.edges
    }

    const selectNode = node => this.setState(() => ({selectedNode: node}))
    let events = {
      select: event => {
        const {nodes} = event
        console.log(nodes)
        selectNode(nodes[0])
      }
    }

    const currentNode = this.state.nodes[this.state.selectedNode]
    return (
      <Provider store={store}>
        <Container>
          <div style={{ margin: 24 }}>
            <Graph graph={graphe} options={options} events={events} />
            <Form
              onSubmit={this.handleSubmit}
              initialValues={currentNode}
              currentNode={currentNode}
            />
          </div>
        </Container>
      </Provider>
    )
  }
}

export default App
