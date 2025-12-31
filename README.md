# Interactive Mindmap UI

A premium, data-driven mindmap visualization built for the Frontend Internship assignment.

## 🚀 Technologies Used
- **React (Vite)**: Core framework for building the interactive UI.
- **React Flow**: Powerful library for rendering node-based graphs and mindmaps.
- **Dagre**: Used for automatic hierarchical layout calculation (Parent → Child).
- **Lucide React**: Premium icon set for a modern aesthetic.
- **Vanilla CSS**: Custom design system with glassmorphism and dark mode.

## 🧠 Architecture & Approach
### 1. Data-Driven Core
The entire application is driven by a structured `mindmapData.json` file. 
- **Transformation**: The hierarchical JSON is flattened into nodes and edges using a recursive `traverse` function located in `src/utils/transformData.js`.
- **Layouting**: The flattened data is passed through the `Dagre` layout engine to automatically calculate `x` and `y` coordinates, ensuring a clean "Left-to-Right" tree structure.

### 2. State Management
- **React Flow Hooks**: `useNodesState` and `useEdgesState` manage the visual elements.
- **Visibility Logic**: A custom `updateVisibility` function handles the "Collapse/Expand" feature by recursively hiding/showing child nodes based on the parent's `isExpanded` state.

### 3. User Experience (UX)
- **Hover Intelligence**: Hovering over any node reveals a contextual tooltip with a short summary.
- **Interactive Editing**: Selecting a node opens a side panel where you can edit the label and description in real-time.
- **Visual Feedback**: Selection highlights the node and its immediate connections with brand-colored glows and animations.

## ✨ Functional Requirements Met
- ✅ **Mindmap Visualization**: Hierarchical graph structure.
- ✅ **Hover Interactions**: Instant quick-info tooltips.
- ✅ **Click Interactions**: Smooth collapse/expand and edge highlighting.
- ✅ **Viewport Controls**: Fit to View and Reset Zoom functionality.
- ✅ **Manual Editing**: Live node updates via the Sidebar.
- ✅ **Data-Driven**: Modifying `mindmapData.json` instantly updates the visualization structure.

## 🛠️ How to Data-Drive
To update the mindmap, simply edit `src/data/mindmapData.json`. The UI will automatically:
1. Re-calculate the hierarchy.
2. Re-apply the layout.
3. Update all node labels, descriptions, and metadata.

---

*Developed with ❤️ as part of the Frontend UI Internship Assignment.*
