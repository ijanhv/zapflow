"use client";
import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import ZapDetails from "./zap-details";

// Define node types
const nodeTypes = {
  custom: ZapDetails,
};

const initialNodes = [
  {
    id: "1",
    type: "custom", // Use the custom node type
    position: { x: 0, y: 0 },
    data: {
      label: "Node 1",
      icon: "🔔",
      title: "Custom Node 1",
      subline: "This is a custom node",
    },
  },
  {
    id: "2",
    type: "custom", // Use the custom node type
    position: { x: 0, y: 200 },
    data: {
      label: "Node 2",
      icon: "📁",
      title: "Custom Node 2",
      subline: "Another custom node",
    },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const CreateNewZap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  console.log(nodes);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "custom",
      position: { x: 0, y: nodes.length * 200 },
      data: {
        label: `Node ${nodes.length + 1}`,
        icon: "💡",
        title: `Custom Node ${nodes.length + 1}`,
        subline: "New custom node",
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="h-[100vh] w-[100vw]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />

        <Background  gap={12} size={1} />
      </ReactFlow>
      <button
        onClick={addNewNode}
        className="absolute bottom-4 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Node
      </button>
    </div>
  );
};

export default CreateNewZap;
