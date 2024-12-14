import React from 'react';
import './Modal.css';  // Optional for styling

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;  // Don't render the modal if it's not visible

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
