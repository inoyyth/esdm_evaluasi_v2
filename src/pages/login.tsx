import { FunctionComponent, useState } from "react"
import { Alert, Button, Checkbox, Form, Input, Layout } from "antd"
import axios, { AxiosError } from "axios"
import cookies from "next-cookies"
import jwt from "jsonwebtoken"
import { GetServerSideProps } from "next"
import { isNil } from "lodash"
import { useRouter } from "next/router"

const { Content } = Layout

const Login: FunctionComponent = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()

  const onFinish = async (values: any) => {
    console.log("Success:", values)
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
    <div className="flex justify-center items-center flex-col h-[500px]">
      <div className="pb-5">
        <img src="/images/logo-esdm.png" width={100} />
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ sm: 24, xs: 24 }}
          wrapperCol={{ span: 24, sm: 24, xs: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-auto md:w-[500px] border-2 border-solid p-6 md:pr-12 md:pt-12"
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

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ sm: 24 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ sm: 24 }}>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-2">
        {showAlert && (
          <Alert
            message={errorMessage}
            type="error"
            closable
            onClose={() => setShowAlert(false)}
          />
        )}
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
    console.log(jwtData)
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
