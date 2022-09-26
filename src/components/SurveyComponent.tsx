import { FunctionComponent } from "react"
import * as Survey from "survey-react"
// Default V2 theme
import "survey-core/defaultV2.min.css"
// Modern theme
import "survey-core/modern.min.css"

const surveyJson = {
  pages: [
    {
      name: "PersonalDetails",
      elements: [
        {
          type: "text",
          name: "FirstName",
          title: "Enter your first name:",
        },
        {
          type: "text",
          name: "LastName",
          title: "Enter your last name:",
        },
        {
          type: "panel",
          name: "Contacts",
          state: "collapsed",
          title: "Contacts (optional)",
          elements: [
            {
              type: "text",
              name: "Telegram",
              title: "Telegram:",
            },
            {
              type: "text",
              name: "GitHub",
              title: "GitHub username:",
            },
          ],
        },
      ],
    },
  ],
}

const SurveyComponent: FunctionComponent = () => {
  // Apply Theme
  Survey.StylesManager.applyTheme("defaultV2")
  // Create a Model
  const survey = new Survey.Model(surveyJson)

  return (
    <div>
      <Survey.Survey model={survey} />
    </div>
  )
}

export default SurveyComponent
