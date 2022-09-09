import React from 'react';

function Error({ message }) {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return message === null ? null : <div style={errorStyle}>{message}</div>;
}

export default Error;
