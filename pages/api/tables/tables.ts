// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TableType } from "../../../utils/typings";
import tables from "../../../utils/data/tables";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TableType[]>
) {

  if (req.method === "GET") {
    let data = tables
    res.status(200).json(data);
  } else if (req.method === "POST") {
    let table = req.body.table;
    table["id"] = table.length + 1;
    tables.push(table)
    res.status(200).json(table);
  }
}
