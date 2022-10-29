import { IMobileOperator, MobileOperatorEnum } from "../interfaces/operator.interface";
import MtsIcon from "./icons/mts.svg";
import BeelineIcon from "./icons/beeline.svg";
import MegafonIcon from "./icons/megafon.svg";

export const operators: IMobileOperator[] = [
  {
    route: "mts",
    title: "МТС",
    icon: <MtsIcon />,
    id: MobileOperatorEnum.MTS,
  },
  {
    route: "beeline",
    title: "Билайн",
    icon: <BeelineIcon />,
    id: MobileOperatorEnum.Beeline,
  },
  {
    route: "megafon",
    title: "Мегафон",
    icon: <MegafonIcon />,
    id: MobileOperatorEnum.Megafon,
  },
];
