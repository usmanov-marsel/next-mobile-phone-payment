import type { NextApiRequest, NextApiResponse } from "next";
import { IMobileOperator } from "../../interfaces/operator.interface";

function getRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IMobileOperator[]>) {
  const randomValue = getRandomInRange(0, 1);
  console.log(randomValue);
  if (randomValue != 0) {
    res.status(200).end();
  } else {
    res.status(500).end();
  }
}
