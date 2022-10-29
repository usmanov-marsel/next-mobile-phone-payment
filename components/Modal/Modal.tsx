import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Modal.module.css";

interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean;
}

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (isOpen) {
    return <div className={styles.modal}>{children}</div>;
  } else {
    return <></>;
  }
};
