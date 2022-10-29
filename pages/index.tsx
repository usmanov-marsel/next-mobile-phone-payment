import type { GetStaticProps, NextPage } from "next";
import axios from "axios";
import { IMobileOperator } from "../interfaces/operator.interface";
import { MobileOperator } from "../components/MobileOperator/MobileOperator";
import { operators } from "../helpers";
import styles from "../styles/Home.module.css";
import Link from "next/link";

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
