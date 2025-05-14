import * as React from 'react';
import { Dialog } from 'radix-ui';
import styles from './Modal.module.css';
import { Cross1Icon } from '@radix-ui/react-icons';

const Modal = ({ children, open, onOpenChange }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};
const ModalContent = ({ title, subtitle, children }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlayStyles}></Dialog.Overlay>
      <Dialog.Content className={styles.content}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>
        <Dialog.Description className={styles.description}>
          {subtitle}
        </Dialog.Description>
        {children}
        <Dialog.Close className={styles.closeIcon}>
          <Cross1Icon></Cross1Icon>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

Modal.Trigger = Dialog.Trigger;
Modal.Content = ModalContent;
Modal.Close = Dialog.Close;

export default Modal;
