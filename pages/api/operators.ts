import type { NextApiRequest, NextApiResponse } from "next";
import { operators } from "../../data";
import { IMobileOperator } from "../../interfaces/operator.interface";

export default function handler(req: NextApiRequest, res: NextApiResponse<IMobileOperator[]>) {
  const listOperators: IMobileOperator[] = operators;
  res.status(200).json(listOperators);
}
