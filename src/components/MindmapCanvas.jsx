import React, { useCallback } from 'react';
import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    Panel,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';

import Toolbar from './Toolbar';

const nodeTypes = {
    custom: CustomNode,
};

const MindmapCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onNodeClick }) => {
    return (
        <div className="mindmap-wrapper">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                minZoom={0.1}
                maxZoom={4}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: '#b1b1b7', strokeWidth: 2 },
                }}
                proOptions={{ hideAttribution: true }}
            >
                <Toolbar />
                <Background variant="dots" gap={25} size={1} color="rgba(0,0,0,0.05)" />
            </ReactFlow>
        </div>
    );
};

export default MindmapCanvas;
