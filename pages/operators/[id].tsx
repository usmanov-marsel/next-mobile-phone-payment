import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import axios from "axios";
import { operators } from "../../data";
import { ParsedUrlQuery } from "querystring";
import { FormPayment } from "../../components/FormPayment/FormPayment";
import { IMobileOperator } from "../../interfaces/operator.interface";

interface OperatorPageProps extends Record<string, unknown> {
  operatorName: string;
}
interface IPath {
  id: string;
}

const OperatorPage: NextPage<OperatorPageProps> = ({ operatorName }: OperatorPageProps) => {
  return <FormPayment operatorName={operatorName} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = operators.map((o) => `/operators/${o.route}`);
  // for (const m of firstLevelMenu) {
  //   const { data: menu } = await axios.post<MenuItem[]>(
  //     process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
  //     {
  //       firstCategory: m.id,
  //     }
  //   );
  //   paths = paths.concat(menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`)));
  // }
  return {
    paths,
    fallback: true,
  };
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
