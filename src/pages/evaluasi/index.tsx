import type { GetServerSideProps, NextPage } from "next"
import { isNil } from "lodash"
import cookies from "next-cookies"
import jwt from "jsonwebtoken"
import { Provider } from "react-redux"
import { store } from "app/store"
import { Breadcrumb, Col, Layout, Row } from "antd"
import Header from "@components/Utility/HeaderLayout"
import Footer from "@components/Utility/FooterLayout"
import { useState } from "react"
import React from "react"
import "antd/dist/antd.css"
// import CardDiklat from "@components/Card/CardDiklat"

type Props = {
  children: any
  user: any
}

const Home: NextPage<Props> = (props: Props) => {
  const { user: esdm_survey } = props
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
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
              <span className="text-xs">Evaluasi</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="px-4 py-4 mb-8">
          <div className="mb-2 text-base font-bold">List Evaluasi</div>
          {/* <div className="flex flex-col gap-4">
            <CardDiklat />
            <CardDiklat />
          </div> */}
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
