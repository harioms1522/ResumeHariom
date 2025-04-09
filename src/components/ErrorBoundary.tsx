import { ErrorBoundary } from 'react-error-boundary';
import { Button, Box, Typography } from '@mui/material';

import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Oops! Something went wrong 😵
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                {error.message}
            </Typography>
            <Button variant="contained" onClick={resetErrorBoundary}>
                Try Again
            </Button>
        </Box>
    );
};

import { ReactNode } from 'react';

const ErrorBoundaryWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {
            // Reset state or navigate somewhere
            window.location.reload();
        }}>
            {children}
        </ErrorBoundary>
    );
};

export default ErrorBoundaryWrapper;
export { ErrorBoundaryWrapper, ErrorFallback };