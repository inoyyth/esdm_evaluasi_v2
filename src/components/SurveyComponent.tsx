import { FunctionComponent } from "react"
import * as Survey from "survey-react"
// import * as Widgets from "surveyjs-widgets"
// Default V2 theme
import "survey-core/defaultV2.min.css"
// Modern theme
import "survey-core/modern.min.css"

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
  }
  // Apply Theme
  Survey.StylesManager.applyTheme("defaultV2")
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
