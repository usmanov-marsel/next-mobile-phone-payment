export enum MobileOperatorEnum {
  MTS,
  Beeline,
  Megafon,
}

export interface IMobileOperator {
  route: string;
  title: string;
  icon: JSX.Element;
  id: MobileOperatorEnum;
}
