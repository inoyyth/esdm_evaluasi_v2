import { FunctionComponent } from "react"
import * as Survey from "survey-react"
import "survey-core/defaultV2.min.css"
import "survey-core/modern.min.css"
import noUiSlider from "nouislider"
import "nouislider/dist/nouislider.min.css"
// @ts-ignore
import * as widgets from "surveyjs-widgets"
import axios from "axios"

type Props = {
  data: any
  model: any
  idJadwalDiklat?: any
  userData: any
}

const SurveyComponent: FunctionComponent<Props> = (props: Props) => {
  const { data, model, idJadwalDiklat, userData } = props

  const surveyJson = {
    pages: data?.data,
    visiblePages: true,
    widthMode: "responsive",
    pagePrevText: "Sebelumnya",
    pageNextText: "Selanjutnya",
    completeText: "Selesaikan",
    startSurveyText: "Mulai",
    questionDescriptionLocation: "underInput",
    completedHtml: "<h3>Terima kasih, Anda telah menyelesaikan Survey</h3>",
    firstPageIsStarted: false,
    showProgressBar: "bottom",
    showQuestionNumbers: "off",
  }
  // Apply Theme
  Survey.StylesManager.applyTheme("defaultV2")
  // Survey.Survey.cssType = "bootstrap"
  widgets.nouislider(Survey)

  // Create a Model
  const survey = new Survey.Model(surveyJson)

  survey.onComplete.add((survey: any) => {
    console.log("model", model)
    console.log(survey.data)
    console.log("idJadwalDiklat", idJadwalDiklat)
    axios
      .post("/api/answer", {
        data: {
          id_kategori: model?.id_kategori,
          id_evaluasi: model?.id,
          id_user: userData?.id,
          id_diklat: model?.id_diklat,
          id_jadwal_diklat: idJadwalDiklat?.id,
          detail_answer: survey.data,
        },
      })
      .then((res: any) => {
        console.log("response", res)
      })
  })

  return (
    <div>
      <Survey.Survey model={survey} />
    </div>
  )
}

export default SurveyComponent
