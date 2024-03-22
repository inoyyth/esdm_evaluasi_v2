import { Model } from "@components/DataTable/survey/TenagaPengajarDatatable"
import axios from "axios"
import { isEmpty } from "lodash"
import dynamic from "next/dynamic"
import { FunctionComponent, useEffect, useRef, useState } from "react"

const SurveyComponent = dynamic(() => import("@components/SurveyComponent"), {
  ssr: false,
})

type Props = {
  model: Model
  idJadwalDiklat?: any
  userData: any
  isPengajar?: boolean
  pengajar?: string
  idPengajar?: any
  closing?: any
}

const Survey: FunctionComponent<Props> = (props: Props) => {
  const {
    model,
    idJadwalDiklat,
    userData,
    isPengajar,
    pengajar,
    idPengajar,
    closing,
  } = props
  const [data, setData] = useState<any>(null)
  const [scoring, setScoring] = useState<any>(null)

  const fetchData: Function = async () => {
    axios
      .get("/api/survey-pertanyaan", {
        params: {
          pageNumber: 1,
          pageSize: 100,
          sortdatafield: "id",
          sortorder: "desc",
          id_evaluasi: model?.id,
          id_kategori: model?.id_kategori,
          id_user: model?.id_user,
          id_diklat: model?.id_diklat,
          id_jadwal_diklat: model?.id_jadwal_diklat,
        },
      })
      .then((res: any) => {
        setData(res?.data)
      })
  }

  const fetchScoring: Function = async () => {
    axios
      .get(`/api/scoring/${model?.id_kategori}`, {
        params: {},
      })
      .then((res: any) => {
        setScoring(res?.data)
      })
  }

  useEffect(() => {
    fetchData()
    fetchScoring()
  }, [model])

  return (
    <div>
      {isPengajar === true && (
        <div>
          Materi: <b>{model?.judul}</b>
        </div>
      )}
      {!isEmpty(pengajar) && (
        <div>
          Tenaga Pengajar: <b>{pengajar}</b>
        </div>
      )}
      <SurveyComponent
        data={data}
        scoring={scoring}
        model={model}
        idJadwalDiklat={idJadwalDiklat}
        userData={userData}
        idPengajar={idPengajar}
        closing={closing}
      />
    </div>
  )
}

export default Survey
