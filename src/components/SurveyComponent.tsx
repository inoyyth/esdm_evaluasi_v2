import { FunctionComponent } from "react"
import * as Survey from "survey-react"
import "survey-core/defaultV2.min.css"
import "survey-core/modern.min.css"
import noUiSlider from "nouislider"
import "nouislider/dist/nouislider.min.css"
// @ts-ignore
import * as widgets from "surveyjs-widgets"

type Props = {
  data: any
}

const SurveyComponent: FunctionComponent<Props> = (props: Props) => {
  const { data } = props

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
  }
  // Apply Theme
  Survey.StylesManager.applyTheme("defaultV2")
  // Survey.Survey.cssType = "bootstrap"
  widgets.nouislider(Survey)

  // Create a Model
  const survey = new Survey.Model(surveyJson)

  survey.onComplete.add((survey: any) => {
    console.log(survey.data)
  })

  return (
    <div>
      <Survey.Survey model={survey} />
    </div>
  )
}

export default SurveyComponent
