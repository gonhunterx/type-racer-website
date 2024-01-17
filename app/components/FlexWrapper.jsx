import React from 'react';

const CenteredWrapper = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Centers vertically
    }}>
      {children}
    </div>
  );
};

export default CenteredWrapper;
