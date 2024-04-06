import React from 'react';

const Alert = ({ message, status }) => {
  return (
    <div className={"alert-dismissible fade show mb-0 alert alert-" + status} role="alert">
      <strong>Message: </strong> {message}
    </div>
  );
};

export default Alert;
