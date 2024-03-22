import { FunctionComponent, useCallback } from "react"
import * as Survey from "survey-react"
import "survey-core/defaultV2.min.css"
import "survey-core/modern.min.css"
import noUiSlider from "nouislider"
import "nouislider/dist/nouislider.min.css"
// @ts-ignore
import * as widgets from "surveyjs-widgets"
import axios from "axios"
import { Wrapper } from "./SurveyComponent.style"
import { find, isUndefined } from "lodash"

type Props = {
  data: any
  scoring: any
  model: any
  idJadwalDiklat?: any
  userData: any
  idPengajar?: any
  closing?: any
}

type IconType = {
  text: string
  image: string
}

const SurveyComponent: FunctionComponent<Props> = (props: Props) => {
  const {
    data,
    model,
    idJadwalDiklat,
    userData,
    idPengajar,
    scoring,
    closing,
  } = props

  const surveyJson = {
    pages: data?.data?.questions,
    visiblePages: true,
    widthMode: "responsive",
    pagePrevText: "Sebelumnya",
    pageNextText: "Selanjutnya",
    completeText: "Selesaikan",
    startSurveyText: "Mulai",
    questionDescriptionLocation: "underInput",
    completedHtml: closing
      ? closing
      : "<h3>Terima kasih, Anda telah menyelesaikan Survey</h3>",
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
  survey.sendResultOnPageNext = true
  survey.currentPageNo = data?.data?.total_has_answered

  survey.onComplete.add((question: any) => {
    axios
      .post("/api/answer", {
        data: {
          id_kategori: model?.id_kategori,
          id_evaluasi: model?.id,
          id_user: userData?.id,
          id_diklat: model?.id_diklat,
          id_jadwal_diklat: idJadwalDiklat,
          detail_answer: question.data,
          id_pengajar: idPengajar,
        },
      })
      .then((res: any) => {
        // console.log("response", res)
      })
  })

  // Save survey results
  survey.onPartialSend.add((sender: Survey.SurveyModel, options: any) => {
    const questions = data?.data?.questions
    const currentPage = sender.currentPageNo

    const element_1 = questions[currentPage].elements[0].name
    const element_2 = questions[currentPage].elements[1].name
    let asw: any = {}
    asw[element_1] = sender.data?.[element_1]
    asw[element_2] = sender.data?.[element_2]
    const prm = {
      id_kategori: model?.id_kategori,
      id_evaluasi: model?.id,
      id_user: userData?.id,
      id_diklat: model?.id_diklat,
      id_jadwal_diklat: idJadwalDiklat,
      detail_answer: asw,
      id_pengajar: idPengajar,
    }

    axios
      .post("/api/answer-temporary", {
        data: prm,
      })
      .then((res: any) => {
        // console.log("response", res)
      })
  })

  const getTextSlider = useCallback(
    (value: number): IconType => {
      let text = "Baik"
      let image =
        "https://res.cloudinary.com/abbifam-com/image/upload/v1698512332/png-transparent-smile-emoji-face-with-tears-of-joy-emoji-smiley-happiness-emoticon-emoji-computer-icons-world-emoji-day-symbol-thumbnail_ounkbs.png"
      if (scoring) {
        const { data: scr } = scoring
        const sangat_baik = find(
          scr,
          (o: any) => o.type === "KRITERIA" && o.title === "SANGAT BAIK"
        )
        const baik = find(
          scr,
          (o: any) => o.type === "KRITERIA" && o.title === "BAIK"
        )
        const cukup = find(
          scr,
          (o: any) => o.type === "KRITERIA" && o.title === "CUKUP"
        )

        const kurang_baik = find(
          scr,
          (o: any) => o.type === "KRITERIA" && o.title === "KURANG"
        )

        if (value >= sangat_baik.min) {
          text = "Sangat Baik"
          image =
            "https://res.cloudinary.com/abbifam-com/image/upload/v1698512823/png-transparent-whip-emoticon-emoticon-smiley-wink-emoji-emoji-miscellaneous-bing-thumb-signal-thumbnail_gg9sd1.png"
        } else if (value >= baik.min) {
          text = "Baik"
          image =
            "https://res.cloudinary.com/abbifam-com/image/upload/v1698512332/png-transparent-smile-emoji-face-with-tears-of-joy-emoji-smiley-happiness-emoticon-emoji-computer-icons-world-emoji-day-symbol-thumbnail_ounkbs.png"
        } else if (value >= cukup.min) {
          text = "Cukup Baik"
          image =
            "https://res.cloudinary.com/abbifam-com/image/upload/v1698512956/png-transparent-iphone-emoji-sadness-smiley-emoji-electronics-face-emoticon-thumbnail_dtjsnx.png"
        } else if (value >= kurang_baik.min) {
          text = "Kurang Baik"
          image =
            "https://res.cloudinary.com/abbifam-com/image/upload/v1698512332/png-transparent-sad-emoji-art-face-with-tears-of-joy-emoji-crying-emoticon-cry-smiley-sphere-computer-icons-thumbnail_s1f4tj.png"
        } else {
          text = "Buruk"
          image =
            "https://res.cloudinary.com/abbifam-com/image/upload/v1698512332/png-transparent-emoji-sadness-emoticon-smiley-sad-emoji-crying-imoji-face-sticker-desktop-wallpaper-thumbnail_yk4xkr.png"
        }
      }

      return { text, image }
    },
    [scoring]
  )

  survey.onValueChanged.add((result: any, options: any) => {
    const value: number = options?.value
    const x = document.querySelector(".noUi-tooltip")
    const y = document.querySelector(".noUi-touch-area")
    let text = "Baik"
    let img =
      "https://res.cloudinary.com/abbifam-com/image/upload/v1698512332/png-transparent-smile-emoji-face-with-tears-of-joy-emoji-smiley-happiness-emoticon-emoji-computer-icons-world-emoji-day-symbol-thumbnail_ounkbs.png"
    if (!scoring) {
      if (value >= 90.01) {
        text = "Sangat Baik"
        img =
          "https://res.cloudinary.com/abbifam-com/image/upload/v1698512823/png-transparent-whip-emoticon-emoticon-smiley-wink-emoji-emoji-miscellaneous-bing-thumb-signal-thumbnail_gg9sd1.png"
      } else if (value >= 80.01) {
        text = "Baik"
        img =
          "https://res.cloudinary.com/abbifam-com/image/upload/v1698512332/png-transparent-smile-emoji-face-with-tears-of-joy-emoji-smiley-happiness-emoticon-emoji-computer-icons-world-emoji-day-symbol-thumbnail_ounkbs.png"
      } else if (value >= 70.01) {
        text = "Cukup Baik"
        img =
          "https://res.cloudinary.com/abbifam-com/image/upload/v1698512956/png-transparent-iphone-emoji-sadness-smiley-emoji-electronics-face-emoticon-thumbnail_dtjsnx.png"
      } else if (value >= 60.01) {
        text = "Kurang Baik"
        img =
          "https://res.cloudinary.com/abbifam-com/image/upload/v1698512332/png-transparent-sad-emoji-art-face-with-tears-of-joy-emoji-crying-emoticon-cry-smiley-sphere-computer-icons-thumbnail_s1f4tj.png"
      } else {
        text = "Buruk"
        img =
          "https://res.cloudinary.com/abbifam-com/image/upload/v1698512332/png-transparent-emoji-sadness-emoticon-smiley-sad-emoji-crying-imoji-face-sticker-desktop-wallpaper-thumbnail_yk4xkr.png"
      }
    } else {
      const r: IconType = getTextSlider(value)
      text = r.text
      img = r.image
    }
    if (x) {
      x.innerHTML +=
        "<p style='font-size:12px;margin-bottom:0px;'>" + text + "</p>"
    }
    if (y) {
      y.innerHTML = `<img src="${img}" style='padding:4px;'/>`
    }
  })

  return (
    <Wrapper>
      <Survey.Survey model={survey} />
    </Wrapper>
  )
}

export default SurveyComponent
