// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import presenters from "../../../utils/data/presenters";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { pid }:any = req.query;


  if (req.method === "DELETE") {
    res.end(`delete presenter: ${pid}`);
  }

  if (req.method === "PATCH") {
    res.end(`editing presenter: ${pid}`);
  }
  if (req.method === "GET") {
    const presenter = presenters.find(
        (presenter) => presenter.id == parseInt(pid)
      );
      res.status(200).json(presenter);
  }
  
}
