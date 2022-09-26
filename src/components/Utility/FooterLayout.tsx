import { Layout } from "antd";
import { FunctionComponent } from "react"

const { Footer } = Layout;

const FooterLayout: FunctionComponent = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  )
}

export default FooterLayout