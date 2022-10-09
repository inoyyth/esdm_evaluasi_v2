import { Col, Layout, Row } from "antd"
import { FunctionComponent } from "react"

type Props = {
  userData: any
}

const { Header } = Layout

const HeaderLayout: FunctionComponent<Props> = (props: Props) => {
  const {
    userData: { nama_depan },
  } = props
  return (
    <Header className="header">
      <Row>
        <Col span={20}>
          <div className="logo">
            <img
              src="https://1.bp.blogspot.com/-bNLzEtz7lcA/XF-I1k-MMXI/AAAAAAAAJfM/u8ClnQ8vG_AEU__UQx0usEbx52Z1_LA3ACLcBGAs/s640/Logo%2BKementerian%2BEnergi%2Bdan%2BSumber%2BDaya%2BMineral%2B%2528ESDM%2529%2B-%2BDownload%2BFile%2BVector%2BPNG.jpg"
              width={100}
            />
          </div>
        </Col>
        <Col span={4}>
          <div className="text-white">Selamat Datang, {nama_depan}</div>
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderLayout
