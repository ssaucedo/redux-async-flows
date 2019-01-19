import React from "react";
import Tree from "react-d3-tree";

const myTreeData = [
  {
    name: "start flow",
    attributes: {
      keyA: "val A"
    },
    children: [
      {
        name: "user choice",
        attributes: {
          keyA: "val A"
        },
        children: [
          {
            name: "left",
            children: [{ name: "1", children: [{ name: "2" }] }]
          },
          {
            name: "right",
            children: [{ name: "1", children: [{ name: "2" }] }]
          }
        ]
      }
    ]
  }
];

const containerStyles = {
  width: "100%",
  height: "100vh"
};

export default class CenteredTree extends React.PureComponent {
  state = {};

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 8
      }
    });
  }

  render() {
    return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree
          zoom={0.7}
          data={myTreeData}
          translate={this.state.translate}
          orientation={"vertical"}
        />
      </div>
    );
  }
}
