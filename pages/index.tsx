import type { NextPage } from "next";
import { MobileOperator } from "../components/MobileOperator/MobileOperator";
import { operators } from "../data";
import styles from "../styles/Home.module.css";

interface HomeProps extends Record<string, unknown> {}

const Home: NextPage<HomeProps> = () => {
  return (
    <ul className={styles.wrapper}>
      {operators.map((o, i) => (
        <MobileOperator operator={o} key={o.id} index={i} />
      ))}
    </ul>
  );
};

export default Home;
