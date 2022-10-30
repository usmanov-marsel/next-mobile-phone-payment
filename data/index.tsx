import { IMobileOperator, MobileOperatorEnum } from "../interfaces/operator.interface";
import MtsIcon from "./icons/mts.svg";
import BeelineIcon from "./icons/beeline.svg";
import MegafonIcon from "./icons/megafon.svg";
import ReactDOMServer from "react-dom/server";

export const operators: IMobileOperator[] = [
  {
    route: "mts",
    title: "МТС",
    icon: ReactDOMServer.renderToString(<MtsIcon />),
    id: MobileOperatorEnum.MTS,
  },
  {
    route: "beeline",
    title: "Билайн",
    icon: ReactDOMServer.renderToString(<BeelineIcon />),
    id: MobileOperatorEnum.Beeline,
  },
  {
    route: "megafon",
    title: "Мегафон",
    icon: ReactDOMServer.renderToString(<MegafonIcon />),
    id: MobileOperatorEnum.Megafon,
  },
];
