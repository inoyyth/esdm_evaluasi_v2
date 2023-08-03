import type { GetServerSideProps, NextPage } from "next"
import { isNil } from "lodash"
import cookies from "next-cookies"
import jwt from "jsonwebtoken"
import { Provider } from "react-redux"
import { store } from "app/store"
import { Breadcrumb, Button, Card, Col, Layout, Row } from "antd"
import Header from "@components/Utility/HeaderLayout"
import Footer from "@components/Utility/FooterLayout"
import { useState } from "react"
import React from "react"
import "antd/dist/antd.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

type Props = {
  children: any
  user: any
}

const { Content, Sider } = Layout

ChartJS.register(ArcElement, Tooltip, Legend)

const Home: NextPage<Props> = (props: Props) => {
  const { user: esdm_survey } = props
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const data = {
    labels: ["Sudah Isi Evaluasi", "Belum Isi Evaluasi"],
    datasets: [
      {
        label: "# Evaluasi",
        data: [12, 19],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Provider store={store}>
      <Row>
        <Col span={24}>
          <Header userData={esdm_survey} />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="px-4 py-2 bg-gray-200">
          <Breadcrumb>
            <Breadcrumb.Item>
              <span className="text-xs">Dashboard</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="px-4 py-2">
          <Doughnut data={data} />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="px-4 py-4 mb-8">
          <div className="mb-2 text-base font-bold">
            Evaluasi Diklat Tertunda
          </div>
          <div>
            <Card
              size="small"
              title="Pelatihan Teknis Penyegaran Bagi Asesor Kompetensi Muda yang Ingin Menambah Bidang Kompetensi (Distribusi Tenaga Listrik) (BPE)"
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
          <div>
            <Card
              size="small"
              title="Pelatihan Teknis Penyegaran Bagi Asesor Kompetensi Muda yang Ingin Menambah Bidang Kompetensi (Distribusi Tenaga Listrik) (BPE)"
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        </Col>
      </Row>
      <Row className="fixed w-full h-4 bottom-5">
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </Provider>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async (
  context: any
) => {
  const c: any = cookies(context)
  const authCookies: string = c["esdm_survey"]
  const jwtData: any = jwt.decode(authCookies)
  console.log(authCookies)
  if (!isNil(authCookies)) {
    // console.log(jwtData)
    return {
      props: {
        user: authCookies,
      },
    }
  } else {
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    }
  }
}

export default Home
