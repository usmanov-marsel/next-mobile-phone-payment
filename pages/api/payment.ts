import type { NextApiRequest, NextApiResponse } from "next";

function getRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const randomValue = getRandomInRange(0, 1);
  if (randomValue != 0) {
    res.status(200).end();
  } else {
    res.status(500).end();
  }
}
