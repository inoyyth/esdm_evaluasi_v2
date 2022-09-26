import React, { FunctionComponent, useEffect, useState } from "react"
import { Provider } from "react-redux"
import { store } from "../../app/store"
import { Breadcrumb, Layout } from "antd"
import Menus from "./Menus"
import Header from "./HeaderLayout"
import Footer from "./FooterLayout"
import dynamic from "next/dynamic"

type Props = {
  children: any
}

const { Content, Sider } = Layout

const AppLayout: FunctionComponent<Props> = (props: Props) => {
  const [page, setPage] = useState<any>(null)

  useEffect(() => {}, [])
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={300}>
              <Menus pages={(e: any) => setPage(e)} />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {page}
            </Content>
          </Layout>
        </Content>
        <Footer />
      </Layout>
    </Provider>
  )
}

export default AppLayout
