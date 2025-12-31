import dagre from 'dagre';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 220;
const nodeHeight = 80;

// Layout function
export const getLayoutedElements = (nodes, edges, direction = 'LR') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    // Only layout visible nodes?? 
    // Dagre crashes if we pass nodes that are not connected properly or if we mix hidden nodes?
    // We should only pass non-hidden nodes to dagre.

    const visibleNodes = nodes.filter(n => !n.hidden);
    const visibleEdges = edges.filter(e => {
        const sourceNode = nodes.find(n => n.id === e.source);
        const targetNode = nodes.find(n => n.id === e.target);
        return sourceNode && !sourceNode.hidden && targetNode && !targetNode.hidden;
    });

    visibleNodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    visibleEdges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        if (node.hidden) return node;

        const nodeWithPosition = dagreGraph.node(node.id);
        if (!nodeWithPosition) return node; // specific case logic

        return {
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: newNodes, edges };
};

export const transformData = (data) => {
    const nodes = [];
    const edges = [];

    const traverse = (node, parentId = null) => {
        const nodeId = String(node.id);

        nodes.push({
            id: nodeId,
            type: 'custom',
            data: {
                label: node.label,
                details: node.details,
                isExpanded: true,
                hasChildren: !!(node.children && node.children.length > 0)
            },
            position: { x: 0, y: 0 },
        });

        if (parentId) {
            edges.push({
                id: `e${parentId}-${nodeId}`,
                source: parentId,
                target: nodeId,
                type: 'smoothstep',
                animated: true,
            });
        }

        if (node.children) {
            node.children.forEach((child) => traverse(child, nodeId));
        }
    };

    traverse(data);

    return getLayoutedElements(nodes, edges, 'LR');
};

// Helper to determine visibility based on expansion state
export const updateVisibility = (nodes, edges) => {
    const adj = {};
    edges.forEach(e => {
        if (!adj[e.source]) adj[e.source] = [];
        adj[e.source].push(e.target);
    });

    const incoming = new Set(edges.map(e => e.target));
    const roots = nodes.filter(n => !incoming.has(n.id));

    const visibleIds = new Set();
    const traverse = (nId) => {
        visibleIds.add(nId);
        const node = nodes.find(n => n.id === nId);
        if (node && node.data && node.data.isExpanded) {
            const children = adj[nId] || [];
            children.forEach(childId => traverse(childId));
        }
    };
    roots.forEach(r => traverse(r.id));

    const updatedNodes = nodes.map(n => ({
        ...n,
        hidden: !visibleIds.has(n.id)
    }));

    const updatedEdges = edges.map(e => ({
        ...e,
        hidden: !visibleIds.has(e.source) || !visibleIds.has(e.target)
    }));

    return { nodes: updatedNodes, edges: updatedEdges };
};
