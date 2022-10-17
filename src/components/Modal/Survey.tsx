import { Model } from "@components/DataTable/survey/TenagaPengajarDatatable"
import axios from "axios"
import dynamic from "next/dynamic"
import { FunctionComponent, useEffect, useRef, useState } from "react"

const SurveyComponent = dynamic(() => import("@components/SurveyComponent"), {
  ssr: false,
})

type Props = {
  model: Model
}

const Survey: FunctionComponent<Props> = (props: Props) => {
  const { model } = props
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
        Tenaga Pengajar:{" "}
        <b>
          {model?.pengajar?.nama_depan} {model?.pengajar?.nama_belakang}
        </b>
      </div>
      <SurveyComponent data={data} model={model} />
    </div>
  )
}

export default Survey
