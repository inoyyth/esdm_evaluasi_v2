import { Layout } from "antd";
import { FunctionComponent } from "react"

const { Header } = Layout;

const HeaderLayout: FunctionComponent = () => {
  return (
    <Header className="header">
      <div className="logo">
        <img src="https://1.bp.blogspot.com/-bNLzEtz7lcA/XF-I1k-MMXI/AAAAAAAAJfM/u8ClnQ8vG_AEU__UQx0usEbx52Z1_LA3ACLcBGAs/s640/Logo%2BKementerian%2BEnergi%2Bdan%2BSumber%2BDaya%2BMineral%2B%2528ESDM%2529%2B-%2BDownload%2BFile%2BVector%2BPNG.jpg"
        width={100} />
        </div>
    </Header>
  )
}

export default HeaderLayout