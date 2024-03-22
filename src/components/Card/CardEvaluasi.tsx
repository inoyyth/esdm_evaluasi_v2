import { Button, Card, Modal } from "antd"
import { FunctionComponent, useState } from "react"
import { Wrapper } from "./CardEvaluasi.style"
import { isUndefined } from "lodash"
import moment from "moment"
import dynamic from "next/dynamic"
import { Model } from "@components/DataTable/survey/TenagaPengajarDatatable"

const Survey = dynamic(() => import("@components/Modal/Survey"), {
  ssr: false,
})

const Tracer = dynamic(() => import("@components/Modal/Tracer"), {
  ssr: false,
})

type Props = {
  id: string | number
  id_diklat: number
  id_kategori: number
  id_master_diklat: number
  id_pengajar?: number
  id_jadwal?: number
  title: string
  pengajar?: string
  waktu_mulai?: string
  waktu_selesai?: string
  total_pertanyaan: number
  fetchData?: () => void
  fetchHasSurveyData?: () => void
  userData: any
  isPengajar?: boolean
  isTracer?: boolean
  nmkategori: string
  status?: "finished" | "pending" | "new"
  totalTerjawab?: number
  opening?: any
  closing?: any
}

const CardEvaluasi: FunctionComponent<Props> = (props: Props) => {
  const {
    id,
    id_kategori,
    id_master_diklat,
    title,
    pengajar,
    waktu_mulai,
    waktu_selesai,
    total_pertanyaan,
    fetchData,
    fetchHasSurveyData,
    userData,
    isPengajar = false,
    id_diklat,
    id_jadwal,
    nmkategori,
    id_pengajar,
    isTracer,
    status = "new",
    totalTerjawab = 0,
    closing,
    opening,
  } = props
  const [showSurvey, setShowSurvey] = useState<boolean>(false)
  const [showTracer, setShowTracer] = useState<boolean>(false)
  const [showOpening, setShowOpening] = useState<boolean>(false)

  const model: Model = {
    id: id,
    judul: title,
    id_kategori: id_kategori,
    id_master_diklat: id_master_diklat,
    id_diklat: id_diklat,
    id_user: userData.id,
    id_jadwal_diklat: id_jadwal,
    jadwal: {
      waktu_mulai: !isUndefined(waktu_mulai) ? waktu_mulai : "",
      waktu_selesai: !isUndefined(waktu_selesai) ? waktu_selesai : "",
    },
    pengajar: {
      nama_depan: !isUndefined(pengajar) ? pengajar : "",
      nama_belakang: "",
    },
  }

  return (
    <Wrapper>
      <Card
        onClick={() => {
          // setShowSurvey(true)
        }}
      >
        <div className="px-3">
          <div className="font-bold">
            {isPengajar && `Materi`} {title}
          </div>
          {!isUndefined(pengajar) && (
            <div className="mt-2 text-xs">
              <b>Pengajar</b>: {pengajar}
            </div>
          )}
          {!isUndefined(waktu_mulai) && !isUndefined(waktu_selesai) && (
            <>
              <div className="mt-2 text-xs">
                <b>Waktu Mulai</b>:{" "}
                {moment(waktu_mulai).format("ddd, D MMM YYYY HH:mm:ss")}
              </div>
              <div className="mt-2 text-xs">
                <b>Waktu Selesai</b>:{" "}
                {moment(waktu_selesai).format("ddd, D MMM YYYY HH:mm:ss")}
              </div>
            </>
          )}
          <div className="mt-2">
            <span className="text-xs">
              <b>Jumlah Pertanyaan</b>: {total_pertanyaan}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xs">
              <b>Pertanyaan Terjawab</b>:{" "}
              {status === "finished" ? total_pertanyaan : totalTerjawab}
            </span>
          </div>
        </div>
        <div className="mt-4">
          {status === "finished" && (
            <div className="h-[32px] bg-blue-500 py-1 text-center text-white rounded-b-xl">
              Terselesaikan
            </div>
          )}
          {status === "new" && (
            <Button
              className="w-full rounded-b-xl"
              type="primary"
              danger
              onClick={() => {
                if (opening) {
                  setShowOpening(true)
                } else {
                  if (isTracer) {
                    setShowTracer(true)
                  } else {
                    setShowSurvey(true)
                  }
                }
              }}
            >
              Mulai Survey
            </Button>
          )}
          {status === "pending" && (
            <Button
              className="w-full bg-yellow-300 rounded-b-xl"
              onClick={() => {
                if (isTracer) {
                  setShowTracer(true)
                } else {
                  setShowSurvey(true)
                }
              }}
            >
              Lanjutkan Survey
            </Button>
          )}
        </div>
      </Card>
      <Modal
        title={`Survey ${nmkategori}`}
        open={showSurvey}
        // onOk={handleOk}
        className="w-full sm:w-[700px]"
        onCancel={() => {
          if (!isUndefined(fetchData)) {
            fetchData()
          }
          if (!isUndefined(fetchHasSurveyData)) {
            fetchHasSurveyData()
          }
          setShowSurvey(false)
        }}
        footer={null}
      >
        <Survey
          model={model}
          userData={userData}
          pengajar={pengajar}
          isPengajar={isPengajar}
          idJadwalDiklat={id_jadwal}
          idPengajar={id_pengajar}
          closing={closing}
        />
      </Modal>
      <Modal
        title={`Survey ${nmkategori}`}
        open={showTracer}
        // onOk={handleOk}
        className="w-full sm:w-[700px]"
        onCancel={() => {
          if (!isUndefined(fetchData)) {
            fetchData()
          }
          if (!isUndefined(fetchHasSurveyData)) {
            fetchHasSurveyData()
          }
          setShowTracer(false)
        }}
        footer={null}
      >
        <Tracer
          model={model}
          userData={userData}
          pengajar={pengajar}
          isPengajar={isPengajar}
          idJadwalDiklat={id_jadwal}
          idPengajar={id_pengajar}
          hideModal={() => {
            if (!isUndefined(fetchData)) {
              fetchData()
            }
            if (!isUndefined(fetchHasSurveyData)) {
              fetchHasSurveyData()
            }
            setShowTracer(false)
          }}
          closing={closing}
        />
      </Modal>
      <Modal
        title={`Pengantar`}
        open={showOpening}
        // onOk={handleOk}
        className="w-full sm:w-[700px]"
        onOk={() => {
          if (isTracer) {
            setShowTracer(true)
          } else {
            setShowSurvey(true)
          }
          setShowOpening(false)
        }}
        onCancel={() => {
          setShowOpening(false)
        }}
        okText="Lanjut isi kuesioner"
        cancelText="Batalkan"
      >
        <div dangerouslySetInnerHTML={{ __html: opening }} />
      </Modal>
    </Wrapper>
  )
}

export default CardEvaluasi
