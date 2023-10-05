import { FunctionComponent, useState } from "react"
import { Alert, Button, Checkbox, Form, Input, Layout } from "antd"
import axios, { AxiosError } from "axios"
import cookies from "next-cookies"
import jwt from "jsonwebtoken"
import { GetServerSideProps } from "next"
import { isNil } from "lodash"
import { useRouter } from "next/router"
import { Wrapper } from "@components/Login/index.style"

const { Content } = Layout

const Login: FunctionComponent = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()

  const onFinish = async (values: any) => {
    await axios
      .post("/api/auth/login/", {
        data: values,
      })
      .then((res: any) => {
        router.reload()
      })
      .catch((err: AxiosError<any>) => {
        if (err?.response?.status === 401) {
          setShowAlert(true)
          setErrorMessage("Email atau Password salah!")
        }
        console.log("failed", err)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className="flex flex-col md:flex-col items-center justify-between h-[100vh] gap-8 md:gap-0">
      <div className="w-full mt-8 md:mt-auto md:w-1/2">
        <div className="text-[30px] md:text-[50px] font-bold text-center drop-shadow-md stroke-current">
          SISTEM INFORMASI EVALUASI TERINTEGRASI
        </div>
      </div>
      <div className="relative w-full h-full md:relative md:w-1/2">
        <div className="w-full p-3">
          <Form
            name="basic"
            labelCol={{ sm: 24, xs: 24 }}
            wrapperCol={{ span: 24, sm: 24, xs: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="w-auto p-6 border-2 border-slate-500 border-solid rounded-tl-xl rounded-br-xl md:pr-12 md:pt-12"
            layout="vertical"
          >
            <Form.Item
              label="Masukkan Email/NIK/NIP"
              name="nik"
              rules={[
                { required: true, message: "Mohon masukkan Email/NIK/NIP!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="">
          {showAlert && (
            <Alert
              message={errorMessage}
              type="error"
              closable
              onClose={() => setShowAlert(false)}
            />
          )}
        </div>
        <div className="absolute w-full text-center bottom-1">version 2.0</div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async (
  context: any
) => {
  const c: any = cookies(context)
  const authCookies: string = c["esdm_survey"]
  const jwtData: any = jwt.decode(authCookies)
  console.log(jwtData)
  if (!isNil(authCookies)) {
    return {
      props: {},
      redirect: {
        destination: "/",
      },
    }
  }
  return {
    props: {},
  }
}

export default Login
