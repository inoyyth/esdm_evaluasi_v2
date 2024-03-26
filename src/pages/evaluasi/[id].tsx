import type { GetServerSideProps, NextPage } from "next"
import { findIndex, isEmpty, isNil, isUndefined } from "lodash"
import cookies from "next-cookies"
import jwt from "jsonwebtoken"
import { Provider } from "react-redux"
import { store } from "app/store"
import { Breadcrumb, Col, Collapse, Layout, Row } from "antd"
import Header from "@components/Utility/HeaderLayout"
import Footer from "@components/Utility/FooterLayout"
import { useEffect, useState } from "react"
import React from "react"
import "antd/dist/antd.css"
import CardEvaluasi from "@components/Card/CardEvaluasi"
import axios from "axios"
import moment from "moment"
import "moment/locale/id"

type Props = {
  idDiklat: number
  children: any
  user: any
}

const { Panel } = Collapse

const Home: NextPage<Props> = (props: Props) => {
  const { user: esdm_survey, idDiklat } = props
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const [listSurvey, setListSurvey] = useState<any>({
    data: [],
    total: 0,
  })
  const [hasAnswered, setHasAnswered] = useState<any>(null)
  const [totalSurveyPengajar, setTotalSurveyPengajar] = useState<number>(0)

  const fetchHasSurveyData: Function = async () => {
    axios
      .get("/api/answer", {
        params: {
          pageNumber: 1,
          pageSize: 500,
          sortdatafield: "id",
          sortorder: "desc",
          id_user: esdm_survey?.id,
          id_diklat: idDiklat,
        },
      })
      .then((res: any) => {
        setHasAnswered(res?.data?.data)
      })
  }

  const fetchData: Function = async () => {
    axios
      .get("/api/evaluasi", {
        params: {
          pageNumber: 1,
          pageSize: 1000,
          sortdatafield: "id_kategori",
          sortorder: "asc",
          id_diklat: idDiklat,
          is_published: true,
          id_user: esdm_survey?.id,
        },
      })
      .then((res: any) => {
        const dt = res?.data?.data
        setListSurvey({
          data: dt,
          total: res?.data?.meta?.pagination?.total,
        })
        const findPengajar = dt.filter((x: any) => x.is_multiple)
        console.log("pengajar length", findPengajar.length)
        if (findPengajar) setTotalSurveyPengajar(findPengajar.length)
      })
  }

  useEffect(() => {
    fetchData()
    fetchHasSurveyData()
  }, [])

  return (
    <Provider store={store}>
      <Row>
        <Col span={24}>
          <Header userData={esdm_survey} />
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          className="px-4 py-2 bg-gray-200 border-t-2 border-black border-solid"
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <span className="text-xs">
                {!isUndefined(listSurvey.data[0])
                  ? listSurvey.data[0].judul
                  : ""}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="px-4 py-4">
          <Collapse>
            <Panel header="Detail Diklat" key="1">
              <div className="p-0">
                <div>
                  <b>Lokasi:</b>{" "}
                  {!isUndefined(listSurvey.data[0])
                    ? listSurvey.data[0].lokasi
                    : ""}
                </div>
                <div>
                  <b>Metode:</b>{" "}
                  {!isUndefined(listSurvey.data[0])
                    ? listSurvey.data[0].metode_pelaksanaan
                    : ""}
                </div>
                <div>
                  <b>Tipe:</b>{" "}
                  {!isUndefined(listSurvey.data[0])
                    ? listSurvey.data[0].tipe_diklat
                    : ""}
                </div>
                <div>
                  <b>Satuan Kerja:</b>{" "}
                  {!isUndefined(listSurvey.data[0])
                    ? listSurvey.data[0].nmsatker
                    : ""}
                </div>
                <div>
                  <b>Jadwal:</b>{" "}
                  {!isUndefined(listSurvey.data[0])
                    ? moment(listSurvey.data[0].tanggal_mulai).format(
                        "ddd, D MMM YYYY"
                      )
                    : ""}{" "}
                  -{" "}
                  {!isUndefined(listSurvey.data[0])
                    ? moment(listSurvey.data[0].tanggal_selesai).format(
                        "ddd, D MMM YYYY"
                      )
                    : ""}
                </div>
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      {totalSurveyPengajar > 0 && (
        <Row>
          <Col span={24} className="px-4">
            {/* <div className="font-bold underline">Evaluasi Tenaga Pengajar</div> */}
            <Collapse>
              <Panel header="Evaluasi Tenaga Pengajar" key="1">
                <div className="flex flex-col gap-3 pt-0">
                  {!isEmpty(listSurvey.data) &&
                    listSurvey.data.map((v: any) => {
                      if (v?.is_multiple === true) {
                        return v.jadwal.map((j: any, i: number) => {
                          let status: any
                          const isFinish = findIndex(hasAnswered, {
                            id_evaluasi: v?.id,
                            id_jadwal_diklat: j?.id,
                          })
                          if (isFinish >= 0) {
                            status = "finished"
                          } else if (j.total_terjawab > 0) {
                            status = "pending"
                          } else {
                            status = "new"
                          }

                          return (
                            <CardEvaluasi
                              id={v.id}
                              id_diklat={v.id_diklat}
                              id_kategori={v.id_kategori}
                              id_master_diklat={v.id_master_diklat}
                              id_jadwal={j.id}
                              title={j?.materi}
                              id_pengajar={j.pengajar}
                              pengajar={j.nama_depan}
                              total_pertanyaan={v.total_pertanyaan}
                              waktu_mulai={j.waktu_mulai}
                              waktu_selesai={j.waktu_selesai}
                              userData={esdm_survey}
                              fetchData={() => fetchData()}
                              fetchHasSurveyData={() => fetchHasSurveyData()}
                              isPengajar={true}
                              nmkategori={v.nmkategori}
                              status={status}
                              totalTerjawab={j.total_terjawab}
                              opening={v?.opening}
                              closing={v?.closing}
                            />
                          )
                        })
                      }
                    })}
                </div>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      )}
      <Row>
        <Col span={24} className="px-4 mt-4 mb-10">
          <Collapse>
            <Panel header="List Evaluasi/Survey" key="1">
              <div className="flex flex-col gap-3 pt-4">
                {!isEmpty(listSurvey.data) &&
                  listSurvey.data.map((v: any, i: number) => {
                    if (
                      v?.is_multiple === false &&
                      v?.is_epd === false &&
                      v?.is_tracer === false
                    ) {
                      let status: any
                      const isFinish = findIndex(hasAnswered, {
                        id_evaluasi: v?.id,
                      })
                      if (isFinish >= 0) {
                        status = "finished"
                      } else if (v.total_terjawab > 0) {
                        status = "pending"
                      } else {
                        status = "new"
                      }

                      return (
                        <CardEvaluasi
                          id={v.id}
                          id_diklat={v.id_diklat}
                          id_kategori={v.id_kategori}
                          id_master_diklat={v.id_master_diklat}
                          title={v?.nmkategori}
                          total_pertanyaan={v?.total_pertanyaan}
                          userData={esdm_survey}
                          fetchData={() => fetchData()}
                          fetchHasSurveyData={() => fetchHasSurveyData()}
                          nmkategori={v.nmkategori}
                          status={status}
                          totalTerjawab={v.total_terjawab}
                          isTracer={v?.is_tracer}
                          opening={v?.opening}
                          closing={v?.closing}
                        />
                      )
                    }
                  })}
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="px-4 mt-4 mb-10">
          <Collapse>
            <Panel header="Pasca Diklat" key="1">
              <div className="flex flex-col gap-3 pt-4">
                {!isEmpty(listSurvey.data) &&
                  listSurvey.data.map((v: any, i: number) => {
                    if (v?.is_epd === true || v?.is_tracer === true) {
                      let status: any
                      const isFinish = findIndex(hasAnswered, {
                        id_evaluasi: v?.id,
                      })
                      if (isFinish >= 0) {
                        status = "finished"
                      } else if (v.total_terjawab > 0) {
                        status = "pending"
                      } else {
                        status = "new"
                      }

                      return (
                        <CardEvaluasi
                          id={v.id}
                          id_diklat={v.id_diklat}
                          id_kategori={v.id_kategori}
                          id_master_diklat={v.id_master_diklat}
                          title={v?.nmkategori}
                          total_pertanyaan={v?.total_pertanyaan}
                          userData={esdm_survey}
                          fetchData={() => fetchData()}
                          fetchHasSurveyData={() => fetchHasSurveyData()}
                          nmkategori={v.nmkategori}
                          status={status}
                          totalTerjawab={v.total_terjawab}
                          isTracer={v?.is_tracer}
                          opening={v?.opening}
                          closing={v?.closing}
                        />
                      )
                    }
                  })}
              </div>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <Row className="fixed w-full h-4 bottom-5">
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </Provider>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async (
  context: any
) => {
  const idDiklat = context.query.id
  const c: any = cookies(context)
  const authCookies: string = c["esdm_survey"]
  const jwtData: any = jwt.decode(authCookies)
  if (!isNil(authCookies)) {
    return {
      props: {
        idDiklat: idDiklat,
        user: authCookies,
      },
    }
  } else {
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    }
  }
}

export default Home
