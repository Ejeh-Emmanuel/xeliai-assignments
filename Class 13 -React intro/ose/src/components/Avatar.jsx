import React from 'react';

function Avatar({ photo, name, size = 'medium', online = false }) {
 
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    const badgeStyle = {
        backgroundColor: online ? '#22c55e' : '#94a3b8', // Tailwind green-500 / slate-400
    };

    return (
        <div className={`avatar-container ${size}`}>
            {photo ? (
                <img src={photo} alt={name || 'User Avatar'} className="avatar-img" />
            ) : (
                /* Fallback placeholder if no photo is provided */
                <div
                    className="avatar-img"
                    style={{
                        backgroundColor: '#e2e8f0',
                        color: '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: size === 'small' ? '12px' : size === 'medium' ? '20px' : '28px'
                    }}
                >
                    {initial}
                </div>
            )}

            {/* Status indicator dot */}
            <span className="avatar-badge" style={badgeStyle} />
        </div>
    );
}

export default Avatar;