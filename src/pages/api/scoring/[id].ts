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
      query: { id },
    } = req
    const data: any = await axios
      .get(`${process.env.API_URL}/api/scoring/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((response: AxiosResponse<any>) => {
        return response
      })
      .catch((error: AxiosError<any>) => {
        return error
      })
    console.log("data", data)
    res.status(200).json(data.data)
  }
}
