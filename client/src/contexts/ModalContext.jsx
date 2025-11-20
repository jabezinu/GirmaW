import { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'OK',
    cancelText: 'Cancel',
    showCancel: false,
  });

  const showAlert = (message, title = 'Alert') => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        title,
        message,
        onConfirm: () => resolve(true),
        confirmText: 'OK',
        showCancel: false,
      });
    });
  };

  const showConfirm = (message, title = 'Confirm', confirmText = 'OK', cancelText = 'Cancel') => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        title,
        message,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
        confirmText,
        cancelText,
        showCancel: true,
      });
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (modalState.onConfirm) modalState.onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    if (modalState.onCancel) modalState.onCancel();
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
        showCancel={modalState.showCancel}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}