import { Layout } from "antd"
import { FunctionComponent } from "react"

const { Footer } = Layout

const FooterLayout: FunctionComponent = () => {
  return (
    <Footer style={{ textAlign: "center", padding: "8px" }}>
      Sistem Informasi Evaluasi @2023
    </Footer>
  )
}

export default FooterLayout
