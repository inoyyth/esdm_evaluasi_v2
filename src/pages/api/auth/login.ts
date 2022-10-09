// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError, AxiosResponse } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import Cookies from "cookies"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    var date = new Date()
    const cookies = new Cookies(req, res)
    const {
      body: { data },
    } = req
    const result: any = await axios
      .post(`${process.env.API_URL}/api/peserta-login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse<any>) => {
        cookies.set("esdm_survey", JSON.stringify(response.data.data), {
          expires: new Date(date.setDate(date.getDate() + 7)),
          httpOnly: false,
        })
        return response
      })
      .catch((error: AxiosError<any>) => {
        return error
      })
    console.log(result)
    if (result.status === 200) {
      res.status(result.status).json({
        success: true,
        data: result.data,
      })
    } else if (result.response?.status === 401) {
      res.status(result.response.status).json({
        success: false,
        code: result.response.status,
        message: "Unauthorized, username or password is incorrect",
      })
    } else {
      res.status(500).json({
        success: false,
        coder: 500,
        message: "internal server error",
      })
    }
  }
}
