// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import tables from "../../../utils/data/tables";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { tid }:any = req.query;


  if (req.method === "DELETE") {
    res.end(`delete table: ${tid}`);
  }

  if (req.method === "PATCH") {
    res.end(`editing table: ${tid}`);
  }
  if (req.method === "GET") {
    const table = tables.find(
        (table) => table.id == parseInt(tid)
      );
      res.status(200).json(table);
  }
  
}
