import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import axios from "axios";
import { operators } from "../../data";
import { ParsedUrlQuery } from "querystring";
import { FormPayment } from "../../components/FormPayment/FormPayment";
import { IMobileOperator } from "../../interfaces/operator.interface";

interface OperatorPageProps extends Record<string, unknown> {
  operatorName: string;
}

const OperatorPage: NextPage<OperatorPageProps> = ({ operatorName }: OperatorPageProps) => {
  return <FormPayment operatorName={operatorName} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: operators } = await axios.get<IMobileOperator[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/operators"
    );
    const paths = operators.map((o) => `/operators/${o.route}`);
    return {
      paths,
      fallback: true,
    };
  } catch {
    const paths = ["/operators/mts", "/operators/megafon", "/operators/beeline"];
    return {
      paths,
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<OperatorPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const operator = operators.find((o) => o.route === params.id);
  if (!operator) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      operatorName: operator.title,
    },
  };
};

export default OperatorPage;
