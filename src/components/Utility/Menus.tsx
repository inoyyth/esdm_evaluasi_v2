import React, { FunctionComponent, useEffect } from "react"
import { LaptopOutlined } from "@ant-design/icons"
import { Menu, MenuProps } from "antd"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"

type Props = {
  defaultSelectedKeys: any
  defaultOpenKeys: any
}

const Menus: FunctionComponent<Props> = (props: Props) => {
  const { defaultSelectedKeys, defaultOpenKeys } = props
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
          window.location.replace("/")
        },
      },
      {
        key: "survey",
        icon: <LaptopOutlined />,
        label: "Survey",
        children: [
          {
            key: "tenagaPengajar",
            label: "Tenaga Pengajar",
            onClick: (item) => {
              window.location.replace("/survey/tenaga-pengajar")
            },
          },
          {
            key: "penyelenggaraDiklat",
            label: "Penyelengaraan Diklat",
            onClick: (item) => {
              window.location.replace("/survey/penyelenggara-diklat")
            },
          },
          {
            key: "surveyKepuasanMasyarakat",
            label: "Survey Kepuasan Masyarakat",
            onClick: (item) => {
              window.location.replace("/survey/survey-kepuasan-masyarakat")
            },
          },
          {
            key: "indexPersepsiKorupsi",
            label: "Index Persepsi Korupsi",
            onClick: (item) => {
              window.location.replace("/survey/index-persepsi-korupsi")
            },
          },
        ],
      },
    ]
    return menu
  }

  useEffect(() => {}, [defaultSelectedKeys])
  return (
    <Menu
      mode="inline"
      theme="dark"
      defaultSelectedKeys={[defaultSelectedKeys]}
      defaultOpenKeys={["survey"]}
      style={{ height: "100%" }}
      items={menuItems()}
    />
  )
}

export default Menus
