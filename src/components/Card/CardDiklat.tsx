import { FunctionComponent } from "react"
import { Card } from "antd"
import { Wrapper } from "./CardDiklat.style"
import {
  CheckCircleOutlined,
  ExportOutlined,
  WarningOutlined,
} from "@ant-design/icons"
import moment from "moment"
import "moment/locale/id"

type Props = {
  id: number
  id_diklat: number
  judul: string
  lokasi: string
  tipe_diklat: string
  nmsatker: string
  tanggal_mulai: string
  tanggal_selesai: string
  jadwal: any[]
  metode_pelaksanaan: string
}

const CardDiklat: FunctionComponent<Props> = (props: Props) => {
  const {
    id,
    judul,
    lokasi,
    tipe_diklat,
    tanggal_mulai,
    nmsatker,
    tanggal_selesai,
    metode_pelaksanaan,
    jadwal,
    id_diklat,
  } = props
  return (
    <Wrapper>
      <Card
        size="small"
        title={
          <div
            className="cursor-pointer"
            onClick={() => window.location.replace(`/evaluasi/${id_diklat}`)}
          >
            {judul}
          </div>
        }
      >
        <div className="p-3">
          <div>
            <b>Lokasi:</b> {lokasi}
          </div>
          <div>
            <b>Metode:</b> {metode_pelaksanaan}
          </div>
          <div>
            <b>Jenis Pelatihan:</b> {tipe_diklat}
          </div>
          <div>
            <b>Satuan Kerja:</b> {nmsatker}
          </div>
          <div>
            <b>Jadwal:</b> {moment(tanggal_mulai).format("ddd, D MMM YYYY")} -{" "}
            {moment(tanggal_selesai).format("ddd, D MMM YYYY")}
          </div>
        </div>
        <div className="px-3 py-1 bg-slate-200">
          <div className="flex justify-between gap-3">
            <div className="flex items-center">
              <ExportOutlined rev={null} />
              <span>10</span>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined rev={null} style={{ color: "green" }} />
              <span>10</span>
            </div>
            <div className="flex items-center">
              <WarningOutlined rev={null} style={{ color: "red" }} />
              <span>10</span>
            </div>
          </div>
        </div>
      </Card>
    </Wrapper>
  )
}

export default CardDiklat
