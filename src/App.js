import React, {Component} from "react"
import Graph from "./graph"
import {options, graph} from "./fixtures"
import {Provider} from "react-redux"
import store from "./store"
import Form from "./Form"
import PropertyForm from "./PropertyForm"
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
    const convertedNodes = toKeyValue(graph.nodes);
    this.state = {
      nodes: convertedNodes,
      edges: graph.edges,
      selectedNode: 0,
    }
  }


  handleSubmit = values => {
    this.setState(({nodes}) => ({nodes: set(nodes, values.id, values)}))
  }

  handleAddProperty = ({nodeKey, nodeValue}) => {

    this.setState(({nodes, selectedNode}) => {
      const newValue = Object.assign(nodes[selectedNode], {[nodeKey]: nodeValue})
      console.log(nodes[selectedNode], 'selectedNode')
      console.log(newValue, 'newVa')
      return ({nodes: set(nodes, selectedNode, newValue)})
    })
  }


  render() {
    const graphe = {
      nodes: toPlainList(this.state.nodes),
      edges: this.state.edges
    }

    const selectNode = nodeID => {
      return this.setState(({nodes}) => ({selectedNode: nodeID}))
    }

    // this is were we receive the events from vis
    // refer to vis documentation for additional information
    let events = {
      select: event => {
        const {nodes} = event
        selectNode(nodes[0])
      }
    }

    // curly braces are a way to destructure objects in js (es6 <)
    const { selectedNode, nodes } = this.state;
    const currentNode = nodes[selectedNode]
    console.log(currentNode)

    return (
      <Provider store={store}>
        <Container>
          <div style={{ margin: 24 }}>
            <Graph graph={graphe} options={options} events={events} />
            <Form
              onSubmit={this.handleSubmit}
              initialValues={currentNode}
            />
            { currentNode &&
                <PropertyForm
                  onSubmit={this.handleAddProperty}
                  initialValues={currentNode}
                />
            }
          </div>
        </Container>
      </Provider>
    )
  }
}

export default App
