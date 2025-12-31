import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { ChevronRight, ChevronDown, Circle, Layers } from 'lucide-react';

const CustomNode = ({ data, isConnectable, selected }) => {
    return (
        <div className={`custom-node-wrapper ${selected ? 'selected' : ''}`}>

            {/* Tooltip for Hover Summary */}
            <div className="node-tooltip">
                <div className="tooltip-header">{data.label}</div>
                <div className="tooltip-body">
                    {data.details ? data.details.substring(0, 60) + (data.details.length > 60 ? '...' : '') : 'No details available'}
                </div>
            </div>

            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="custom-handle target"
            />

            <div className="custom-node-content">
                <div className="node-icon">
                    <Layers size={16} />
                </div>
                <div className="node-info">
                    <span className="node-title">{data.label}</span>
                    {/* Optional: subtotals or badges could go here */}
                </div>

                {data.hasChildren && (
                    <div className="expand-indicator">
                        {data.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                )}
            </div>

            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="custom-handle source"
            />
        </div>
    );
};

export default memo(CustomNode);
