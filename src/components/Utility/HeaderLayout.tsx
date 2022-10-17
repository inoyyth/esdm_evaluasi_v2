import { Col, Layout, Row, Dropdown, Menu, Space } from "antd"
import { FunctionComponent } from "react"
import { DownOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import Cookies from "js-cookie"

type Props = {
  userData: any
}

const { Header } = Layout

const HeaderLayout: FunctionComponent<Props> = (props: Props) => {
  const {
    userData: { nama_depan },
  } = props
  const router = useRouter()

  const logout: Function = async () => {
    await Cookies.remove("esdm_survey")
    router.reload()
  }

  const menu = (
    <Menu
      items={[
        {
          label: "Logout",
          onClick: (item) => {
            logout()
          },
          key: "0",
        },
      ]}
    />
  )

  return (
    <Header className="header h-full">
      <Row>
        <Col span={20} sm={20} xs={24}>
          <div className="logo flex justify-center md:justify-start">
            <img
              src="https://1.bp.blogspot.com/-bNLzEtz7lcA/XF-I1k-MMXI/AAAAAAAAJfM/u8ClnQ8vG_AEU__UQx0usEbx52Z1_LA3ACLcBGAs/s640/Logo%2BKementerian%2BEnergi%2Bdan%2BSumber%2BDaya%2BMineral%2B%2528ESDM%2529%2B-%2BDownload%2BFile%2BVector%2BPNG.jpg"
              width={100}
            />
          </div>
        </Col>
        <Col span={4} sm={4} xs={24}>
          <div className="text-white flex justify-center md:justify-start">
            <Dropdown overlay={menu}>
              <a onClick={(e) => e.preventDefault()} className="text-white">
                Selamat Datang, {nama_depan} &nbsp;
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderLayout
