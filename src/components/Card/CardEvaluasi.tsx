import { Card } from "antd"
import { FunctionComponent } from "react"
import { Wrapper } from "./CardEvaluasi.style"
import { isUndefined } from "lodash"
import moment from "moment"

type Props = {
  title: string
  pengajar?: string
  waktu_mulai?: string
  waktu_selesai?: string
  totalQuestion: number
}

const CardEvaluasi: FunctionComponent<Props> = (props: Props) => {
  const { title, pengajar, waktu_mulai, waktu_selesai, totalQuestion } = props
  console.log("waktu", waktu_mulai, waktu_selesai)
  return (
    <Wrapper>
      <Card>
        <div className="font-bold">{title}</div>
        {!isUndefined(pengajar) && (
          <div className="mt-2 text-xs">Pengajar: {pengajar}</div>
        )}
        {!isUndefined(waktu_mulai) && !isUndefined(waktu_selesai) && (
          <>
            <div className="mt-2 text-xs">
              Waktu Mulai:{" "}
              {moment(waktu_mulai).format("ddd, D MMM YYYY HH:mm:ss")}
            </div>
            <div className="mt-2 text-xs">
              Waktu Selesai:{" "}
              {moment(waktu_selesai).format("ddd, D MMM YYYY HH:mm:ss")}
            </div>
          </>
        )}
        <div>
          <span className="text-xs">Pertanyaan: {totalQuestion}</span>
        </div>
      </Card>
    </Wrapper>
  )
}

export default CardEvaluasi
