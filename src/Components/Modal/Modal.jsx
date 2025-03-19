import * as React from 'react';
import { Dialog } from 'radix-ui';
import styles from './Modal.module.css';
import { Cross1Icon } from '@radix-ui/react-icons';

const Modal = ({ children }) => {
  return <Dialog.Root>{children}</Dialog.Root>;
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
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <label className={styles.eventLable} htmlFor="eventName">
              Event Name
            </label>
            <input
              className={styles.eventNameInput}
              type="text"
              placeholder="Enter event name"
            />
          </div>

          <div className={styles.dateTimeContainer}>
            <div className={styles.inputWrapper}>
              <label className={styles.dateLable} htmlFor="eventDate">
                Select Date
              </label>
              <input className={styles.dateInput} type="date" />
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.timeLable} htmlFor="eventTime">
                Select Time
              </label>
              <input className={styles.timeInput} type="time" />
            </div>
          </div>
        </div>

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

export default Modal;
