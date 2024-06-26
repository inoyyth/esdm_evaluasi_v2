import type { GetServerSideProps, NextPage } from "next"
import { isNil } from "lodash"
import cookies from "next-cookies"
import jwt from "jsonwebtoken"
import { Provider } from "react-redux"
import { store } from "app/store"
import { Breadcrumb, Button, Col, Layout, Row } from "antd"
import Header from "@components/Utility/HeaderLayout"
import Footer from "@components/Utility/FooterLayout"
import { useEffect, useState } from "react"
import React from "react"
import "antd/dist/antd.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import CardDiklat from "@components/Card/CardDiklat"
import axios from "axios"

type Props = {
  children: any
  user: any
}

const { Content, Sider } = Layout

ChartJS.register(ArcElement, Tooltip, Legend)

const Home: NextPage<Props> = (props: Props) => {
  const { user: esdm_survey } = props
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [listSurvey, setListSurvey] = useState<any>({
    data: [],
    total: 0,
  })
  const [hasAnswered, setHasAnswered] = useState<any>(null)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const data = {
    labels: ["Sudah Isi Evaluasi", "Belum Isi Evaluasi"],
    datasets: [
      {
        label: "# Evaluasi",
        data: [12, 12],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const fetchData: Function = async () => {
    axios
      .get("/api/survey", {
        params: {
          pageNumber: 1,
          pageSize: 1000,
          sortdatafield: "id",
          sortorder: "desc",
          id_peserta: esdm_survey?.id,
          is_published: true,
          group_by: "id_diklat",
          pasca_diklat: true,
        },
      })
      .then((res: any) => {
        setListSurvey({
          data: res?.data?.data,
          total: res?.data?.meta?.pagination?.total,
        })
      })
  }

  const fetchHasSurveyData: Function = async () => {
    axios
      .get("/api/answer", {
        params: {
          pageNumber: 1,
          pageSize: 500,
          sortdatafield: "id",
          sortorder: "desc",
          id_user: esdm_survey?.id,
          pasca_diklat: true,
        },
      })
      .then((res: any) => {
        setHasAnswered(res?.data?.data)
      })
  }

  useEffect(() => {
    fetchData()
    fetchHasSurveyData()
  }, [])

  return (
    <Provider store={store}>
      <Row>
        <Col span={24}>
          <Header userData={esdm_survey} />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="px-4 py-4 mb-8">
          <div className="mb-2 text-base font-bold border-b-[1px] border-black border-solid">
            Daftar Pasca Diklat
          </div>
          <div className="mb-2 text-rose-600">
            Pilih Pasca Diklat untuk mengisi survey/evaluasi
          </div>
          <div className="flex flex-col gap-4">
            {listSurvey.data.map((v: any, i: number) => {
              return <CardDiklat key={i} {...v} isEpd={true} />
            })}
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
