import type { GetServerSideProps, NextPage } from "next"
import { isNil } from "lodash"
import cookies from "next-cookies"
import jwt from "jsonwebtoken"
import { Provider } from "react-redux"
import { store } from "app/store"
import { Breadcrumb, Layout } from "antd"
import Header from "@components/Utility/HeaderLayout"
import Footer from "@components/Utility/FooterLayout"
import Menus from "@components/Utility/Menus"
import dynamic from "next/dynamic"

const SurveyComponent = dynamic(() => import("@components/SurveyComponent"), {
  ssr: false,
})

type Props = {
  children: any
}

const { Content, Sider } = Layout

const Survey: NextPage<Props> = (props: Props) => {
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>Survey</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={300}>
              <Menus pages={`survey`} />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <SurveyComponent />
            </Content>
          </Layout>
        </Content>
        <Footer />
      </Layout>
    </Provider>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async (
  context: any
) => {
  const c: any = cookies(context)
  const authCookies: string = c["token"]
  const jwtData: any = jwt.decode(authCookies)

  if (!isNil(jwtData)) {
    console.log(jwtData)
    return {
      props: {
        user: jwtData.sub,
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

export default Survey
