import { Col, Layout, Row, Dropdown, Menu, Space, Drawer } from "antd"
import { FunctionComponent, useState } from "react"
import { CaretRightOutlined, MenuOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import { Wrapper } from "./HeaderLayout.style"

type Props = {
  userData: any
}

const { Header } = Layout

const HeaderLayout: FunctionComponent<Props> = (props: Props) => {
  const {
    userData: { nama_depan },
  } = props
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

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
    <Wrapper>
      <Header className="h-full p-0 header bg-lightYellow">
        <Row>
          <Col span={24} sm={24} xs={24}>
            <div className="flex justify-between px-4 font-bold logo md:justify-start">
              <div>Sistem Informasi Evaluasi</div>
              <div>
                <MenuOutlined
                  rev={null}
                  style={{ color: "#000" }}
                  onClick={() => {
                    setDrawerOpen(true)
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Header>
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={() => {
          setDrawerOpen(false)
        }}
        open={drawerOpen}
        key="right"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CaretRightOutlined rev={null} />
            <span className="font-bold">
              <a href="/">Dashboard</a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CaretRightOutlined rev={null} />
            <span className="font-bold">Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <CaretRightOutlined rev={null} />
            <span className="font-bold">Evaluasi</span>
          </div>
          <div className="flex items-center gap-2">
            <CaretRightOutlined rev={null} />
            <span className="font-bold">Logout</span>
          </div>
        </div>
      </Drawer>
    </Wrapper>
  )
}

export default HeaderLayout
