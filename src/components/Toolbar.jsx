import React from 'react';
import { Panel, useReactFlow } from 'reactflow';
import { Maximize, ZoomIn, ZoomOut, Home } from 'lucide-react';

const Toolbar = () => {
    const { fitView, zoomIn, zoomOut, setViewport } = useReactFlow();

    const handleReset = () => {
        setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
    };

    return (
        <Panel position="bottom-center">
            <div className="custom-toolbar">
                <button onClick={() => zoomIn()} title="Zoom In">
                    <ZoomIn size={18} />
                </button>
                <button onClick={() => zoomOut()} title="Zoom Out">
                    <ZoomOut size={18} />
                </button>
                <div className="divider" />
                <button onClick={() => fitView({ padding: 0.2, duration: 800 })} title="Fit View">
                    <Maximize size={18} />
                </button>
                <button onClick={handleReset} title="Reset Viewport">
                    <Home size={18} />
                </button>
            </div>
        </Panel>
    );
};

export default Toolbar;
