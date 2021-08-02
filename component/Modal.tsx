import React, { FC, useRef } from "react";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  title?: string;
  onClose: () => void;
  open: boolean;
}

interface ModalTextEvent extends EventTarget {
  id: string;
}

interface ModalMouseEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  target: ModalTextEvent;
}

export const Modal: FC<ModalProps> = ({ children, title, onClose, open }) => {
  if (!open) {
    return null;
  }

  const handleOutsideClick = (e: any) => {
    if (e.target.id === "modal-id") {
      onClose();
    }
  };

  return (
    <div
      data-testid="modal-container"
      className={styles.container}
      id="modal-id"
      onClick={(e: ModalMouseEvent) => handleOutsideClick(e)}
    >
      <div className={styles.inner}>
        <header className="title-header">
          <button data-testid="close-modal-button" onClick={() => onClose()}>
            ✖️
          </button>
          {title && <h2 className="title">{title}</h2>}
        </header>
        <div className="children-container px-3 py-2">{children}</div>
      </div>
    </div>
  );
};
