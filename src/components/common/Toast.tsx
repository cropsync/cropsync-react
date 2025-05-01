import React from 'react';
import { ToastMessage } from '../../types';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';
import './Toast.scss';

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { id, type, message } = toast;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="toast__icon toast__icon--success" />;
      case 'warning':
        return <FaExclamationTriangle className="toast__icon toast__icon--warning" />;
      case 'error':
        return <FaExclamationCircle className="toast__icon toast__icon--error" />;
      default:
        return <FaInfoCircle className="toast__icon toast__icon--info" />;
    }
  };

  return (
    <div className={`toast toast--${type}`}>
      <div className="toast__content">
        {getIcon()}
        <p className="toast__message">{message}</p>
      </div>
      <button
        type="button"
        className="toast__close"
        onClick={() => onClose(id)}
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast; 