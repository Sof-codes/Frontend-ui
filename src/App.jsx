import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState } from 'reactflow';
import MindmapCanvas from './components/MindmapCanvas';
import Sidebar from './components/Sidebar';
import { transformData, updateVisibility, getLayoutedElements } from './utils/transformData';
import initialData from './data/mindmapData.json';
import './styles.css';

const AppContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Initialize Data
  useEffect(() => {
    const { nodes: initNodes, edges: initEdges } = transformData(initialData);
    setNodes(initNodes);
    setEdges(initEdges);
  }, []); // Run once on mount

  const onNodeClick = useCallback((event, node) => {
    // 1. Select Node
    setSelectedNodeId(node.id);

    // 2. Toggle Expand/Collapse (if node has children)
    if (node.data.hasChildren) {
      const nextExpanded = !node.data.isExpanded;

      setNodes(nds => {
        const updatedNodes = nds.map(n => {
          if (n.id === node.id) {
            return { ...n, data: { ...n.data, isExpanded: nextExpanded } };
          }
          return n;
        });

        const { nodes: visNodes, edges: visEdges } = updateVisibility(updatedNodes, edges);
        const { nodes: layoutedNodes } = getLayoutedElements(visNodes, visEdges, 'LR');
        return layoutedNodes;
      });

      setEdges(eds => {
        const { edges: visEdges } = updateVisibility(nodes, eds);
        return visEdges;
      });
    }
  }, [nodes, edges, setNodes, setEdges]);

  // Highlight edges connected to the selected node
  const displayEdges = edges.map(edge => ({
    ...edge,
    selected: selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId),
    animated: edge.animated || (selectedNodeId && (edge.source === selectedNodeId || edge.target === selectedNodeId))
  }));

  // Find the selected node object from the current nodes state to ensure data sync
  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  return (
    <div className="app-container">
      <div className="main-content">
        <MindmapCanvas
          nodes={nodes}
          edges={displayEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
        />
      </div>
      <Sidebar
        node={selectedNode}
        setNodes={setNodes}
        setSelectedNode={(node) => setSelectedNodeId(node ? node.id : null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}
