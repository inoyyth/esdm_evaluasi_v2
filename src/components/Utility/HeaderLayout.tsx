import {
  Col,
  Layout,
  Row,
  Dropdown,
  Menu,
  Space,
  Drawer,
  Button,
  Modal,
} from "antd"
import { FunctionComponent, useState } from "react"
import {
  CaretRightOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons"
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

  const confirm = () => {
    Modal.confirm({
      title: "Logout",
      icon: <ExclamationCircleOutlined rev={null} />,
      content: "Yakin keluar?",
      okText: "Ya",
      cancelText: "Tidak",
      onOk: () => {
        logout()
      },
    })
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
      <Header className="h-auto p-0">
        <Row>
          <Col span={24} className="px-4 py-2 bg-black">
            <div className="flex justify-between">
              <Button
                type="primary"
                ghost
                icon={<HomeOutlined rev={null} />}
                size="small"
                className="flex items-center"
                onClick={() => {
                  window.location.replace("/")
                }}
              >
                Dashboard
              </Button>
              <Button
                type="link"
                icon={<LogoutOutlined rev={null} />}
                size="small"
                danger
                className="flex items-center"
                onClick={() => confirm()}
              >
                Logout
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} sm={24} xs={24}>
            <div className="w-full h-[100px] md:h-[250px] bg-headerBanner bg-cover bg-center"></div>
          </Col>
        </Row>
      </Header>
      <div className="px-4 font-bold bg-gray-200">{nama_depan}</div>
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
            <span className="font-bold">
              <a href="/evaluasi">Evaluasi</a>
            </span>
          </div>
          {/* <div className="flex items-center gap-2">
            <CaretRightOutlined rev={null} />
            <span className="font-bold">Profile</span>
          </div> */}
          <div className="flex items-center gap-2">
            <CaretRightOutlined rev={null} />
            <span className="font-bold" onClick={() => logout()}>
              Logout
            </span>
          </div>
        </div>
      </Drawer>
    </Wrapper>
  )
}

export default HeaderLayout
