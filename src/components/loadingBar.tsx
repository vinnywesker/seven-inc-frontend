import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { GridOverlay } from '@material-ui/data-grid';

const LoadingBar = () => {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
}

export default LoadingBar;