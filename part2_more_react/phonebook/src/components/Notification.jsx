import React from 'react';

function Notification({ message }) {
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return message === null ? null : <div style={messageStyle}>{message}</div>;
}

export default Notification;
