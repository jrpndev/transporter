import React from 'react';
import { Props } from './interface';

export const YStack: React.FC<Props> = ({ children, style }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                ...style, 
            }}
        >
            {children}
        </div>
    );
};
