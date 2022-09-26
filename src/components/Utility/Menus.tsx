import React, { FunctionComponent, useEffect } from "react"
import { LaptopOutlined } from "@ant-design/icons"
import { Menu, MenuProps } from "antd"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"

type Props = {
  pages: any
}

const Menus: FunctionComponent<Props> = (props: Props) => {
  const { pages } = props
  const router = useRouter()

  const logout: Function = async () => {
    await axios
      .post("/api/auth/logout/")
      .then((res: any) => {
        console.log("res", res)
        router.reload()
      })
      .catch((err: AxiosError<any>) => {
        // if (err?.response?.status === 401) {
        //   setShowAlert(true)
        //   setErrorMessage('Email atau Password salah!')
        // }
        console.log("failed", err)
      })
  }

  const menuItems: Function = () => {
    const menu: MenuProps["items"] = [
      {
        key: "dashboard",
        icon: <LaptopOutlined />,
        label: "Dashboard",
        onClick: (item) => {
          router.push("/")
        },
      },
      {
        key: "survey",
        icon: <LaptopOutlined />,
        label: "Survey",
        children: [
          {
            key: "listSurvey",
            label: "List Survey",
            onClick: (item) => {
              router.push("/survey")
            },
          },
        ],
      },
    ]
    return menu
  }

  useEffect(() => {}, [props.pages])
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[pages]}
      defaultOpenKeys={[pages]}
      style={{ height: "100%" }}
      items={menuItems()}
    />
  )
}

export default Menus
