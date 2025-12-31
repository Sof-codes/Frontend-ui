import React from 'react';
import { X, Save, Info } from 'lucide-react';

const Sidebar = ({ node, setNodes, setSelectedNode }) => {
    if (!node) {
        return (
            <aside className="sidebar empty">
                <div className="empty-state">
                    <Info size={48} className="text-muted" />
                    <p>Select a node to view details</p>
                </div>
            </aside>
        );
    }

    const handleChange = (field, value) => {
        setNodes((nds) =>
            nds.map((n) => {
                if (n.id === node.id) {
                    return {
                        ...n,
                        data: {
                            ...n.data,
                            [field]: value
                        }
                    };
                }
                return n;
            })
        );
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Node Details</h2>
                <button className="close-btn" onClick={() => setSelectedNode(null)}>
                    <X size={20} />
                </button>
            </div>

            <div className="sidebar-content">
                <div className="form-group">
                    <label>Label</label>
                    <input
                        type="text"
                        value={node.data.label}
                        onChange={(e) => handleChange('label', e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={node.data.details || ''}
                        onChange={(e) => handleChange('details', e.target.value)}
                        className="textarea-field"
                        rows={6}
                    />
                </div>

                <div className="metadata-section">
                    <h3>Metadata</h3>
                    <div className="metadata-item">
                        <span className="meta-label">ID:</span>
                        <span className="meta-value">{node.id}</span>
                    </div>
                    <div className="metadata-item">
                        <span className="meta-label">Position:</span>
                        <span className="meta-value">
                            {Math.round(node.position.x)}, {Math.round(node.position.y)}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
