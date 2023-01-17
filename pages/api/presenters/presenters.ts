// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PresenterType } from "../../../utils/typings";
import presenters from "../../../utils/data/presenters";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PresenterType[]>
) {
  if (req.method === "GET") {
    let data = presenters
    if(req.query.status){
      const presentersFiltered = presenters.filter(function (pre)
      {
        return pre.status == req.query.status
      })
      data = presentersFiltered
    }
    res.status(200).json(data);
  } else if (req.method === "POST") {
    let presenter = req.body.presenter;
    presenter["id"] = presenter.length + 1;
    presenters.push(presenter)
    res.status(200).json(presenter);
  }
}
