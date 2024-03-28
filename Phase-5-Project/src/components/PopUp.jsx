import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Thank you for Scheduling an Appointment!</h2>
        <img src="https://i.ebayimg.com/images/g/zqIAAOSwO-hcNktK/s-l1200.webp" alt="Thank You Image" style={{ maxWidth: '20%', height: '100%' }}/>
      </div>
    </div>
  );
};

export default Popup;
