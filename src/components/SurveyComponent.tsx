import { FunctionComponent } from "react"
import * as Survey from "survey-react"
import "survey-core/defaultV2.min.css"
import "survey-core/modern.min.css"
import noUiSlider from "nouislider"
import "nouislider/dist/nouislider.min.css"
// @ts-ignore
import * as widgets from "surveyjs-widgets"
import axios from "axios"
import { Wrapper } from "./SurveyComponent.style"

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
  Survey.StylesManager.applyTheme("modern")
  // Survey.Survey.cssType = "bootstrap"
  widgets.nouislider(Survey)

  // Create a Model
  const survey = new Survey.Model(surveyJson)

  survey.onComplete.add((question: any) => {
    axios
      .post("/api/answer", {
        data: {
          id_kategori: model?.id_kategori,
          id_evaluasi: model?.id,
          id_user: userData?.id,
          id_diklat: model?.id_diklat,
          id_jadwal_diklat: idJadwalDiklat?.id,
          detail_answer: question.data,
        },
      })
      .then((res: any) => {
        console.log("response", res)
      })
  })

  survey.onValueChanged.add((result: any, options: any) => {
    const value = options?.value
    console.log("value", value)
    const x = document.querySelector(".noUi-tooltip")
    let text = "Baik"
    if (value >= 90.01) {
      text = "Sangat Baik"
    } else if (value >= 80.01) {
      text = "Baik"
    } else if (value >= 70.01) {
      text = "Cukup Baik"
    } else if (value >= 60.01) {
      text = "Kurang Baik"
    } else {
      text = "Buruk"
    }
    if (x)
      x.innerHTML += "<p style='margin: 0px;font-size: 12px;'>" + text + "</p>"
  })

  return (
    <Wrapper>
      <Survey.Survey model={survey} />
    </Wrapper>
  )
}

export default SurveyComponent
