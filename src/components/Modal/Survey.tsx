import { Model } from "@components/DataTable/survey/TenagaPengajarDatatable"
import axios from "axios"
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
}

const Survey: FunctionComponent<Props> = (props: Props) => {
  const { model, idJadwalDiklat, userData, isPengajar, pengajar } = props
  const [data, setData] = useState<any>(null)

  const fetchData: Function = async () => {
    axios
      .get("/api/survey-pertanyaan", {
        params: {
          pageNumber: 1,
          pageSize: 100,
          sortdatafield: "id",
          sortorder: "desc",
          id_evaluasi: model?.id,
        },
      })
      .then((res: any) => {
        setData(res?.data)
        console.log("res", res)
      })
  }

  useEffect(() => {
    fetchData()
  }, [model])
  return (
    <div>
      <div>
        Mata Diklat: <b>{model?.judul}</b>
      </div>
      <div>
        Tenaga Pengajar: <b>{pengajar}</b>
      </div>
      <SurveyComponent
        data={data}
        model={model}
        idJadwalDiklat={idJadwalDiklat}
        userData={userData}
      />
    </div>
  )
}

export default Survey
