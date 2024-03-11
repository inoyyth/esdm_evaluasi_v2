// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError, AxiosResponse } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import Cookies from "cookies"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = new Cookies(req, res)
  if (req.method === "POST") {
    const {
      body: { data },
    } = req
    const result: any = await axios
      .post(`${process.env.API_URL}/api/tracer`, JSON.stringify(data), {
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

    if (result.status === 200) {
      res.status(result.status).json({
        success: true,
        data: result.data,
      })
    } else if (result.response.status === 400) {
      res.status(result.response.status).json({
        success: false,
        message: result.response.data.message,
      })
    }
  }
}
