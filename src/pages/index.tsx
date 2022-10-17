import type { GetServerSideProps, NextPage } from "next"
import { isNil } from "lodash"
import cookies from "next-cookies"
import jwt from "jsonwebtoken"
import { Provider } from "react-redux"
import { store } from "app/store"
import { Breadcrumb, Button, Col, Layout, Row } from "antd"
import Header from "@components/Utility/HeaderLayout"
import Footer from "@components/Utility/FooterLayout"
import Menus from "@components/Utility/Menus"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { useState } from "react"
import React from "react"

type Props = {
  children: any
  user: any
}

const { Content, Sider } = Layout

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
        <Col span={24}>
          <Content style={{ padding: "0 16px" }}>
            <Row>
              <Col span={24}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
            <Row>
              <Col span={4} xs={24} sm={5}>
                <Sider
                  className="site-layout-background"
                  width="100%"
                  collapsible={false}
                  collapsed={collapsed}
                  onCollapse={toggleCollapsed}
                >
                  <Menus
                    defaultSelectedKeys={`dashboard`}
                    defaultOpenKeys="dashboard"
                  />
                </Sider>
              </Col>
              <Col span={20} xs={24} sm={19}>
                <Content className="mx-0 mt-4 sm:mt-0 sm:mx-4 min-h-[200px]">
                  <div className="text-center">
                    Selamat Datang di Survey PPSDM KEBTKE
                  </div>
                </Content>
              </Col>
            </Row>
          </Content>
        </Col>
      </Row>
      <Row>
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
