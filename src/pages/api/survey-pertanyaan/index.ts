// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError, AxiosResponse } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import Cookies from "cookies"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res)
  if (req.method === "GET") {
    const {
      query: { pageSize, pageNumber, sortdatafield, sortorder },
    } = req
    const data: any = await axios
      .get(`${process.env.API_URL}/api/survey-pertanyaan`, {
        params: {
          ...req.query,
          per_page: pageSize,
          page: pageNumber,
          sort_field: sortdatafield ? sortdatafield : "id",
          sort_order: sortorder ? sortorder : "desc",
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse<any>) => {
        return response
      })
      .catch((error: AxiosError<any>) => {
        console.log("error", error)
        return error
      })

    res.setHeader(
      "CacheControl",
      "public ,s-maxage=1200, stale-while-revalidate=600"
    )

    res.status(200).json(data.data)
  }
}
