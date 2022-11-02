import { useRouter } from "next/router";
import CancelIcon from "../../data/icons/x-mark.svg";
import styles from "./CancelButton.module.css";

export const CancelButton = () => {
  const router = useRouter();
  return (
    <button
      className={styles.back}
      onClick={() => {
        router.back();
      }}
    >
      <CancelIcon />
    </button>
  );
};
