import { FunctionComponent, useEffect, useState } from "react"
import { Model } from "@components/DataTable/survey/TenagaPengajarDatatable"
import axios from "axios"
import { Button, Checkbox, Form, Input, Radio, Space } from "antd"
import { Wrapper } from "./Tracer.style"

type Props = {
  model: Model
  idJadwalDiklat?: any
  userData: any
  isPengajar?: boolean
  pengajar?: string
  idPengajar?: any
  hideModal: () => void
}

const Tracer: FunctionComponent<Props> = (props: Props) => {
  const {
    model,
    idJadwalDiklat,
    userData,
    isPengajar,
    pengajar,
    idPengajar,
    hideModal,
  } = props
  const CheckboxGroup = Checkbox.Group
  const [form] = Form.useForm()
  const [data, setData] = useState<any>(null)
  // const [show, setShow] = useState<boolean>(false)

  const onFinish = (values: any) => {
    console.log("Success:", values)
    axios
      .post("/api/tracer", {
        data: {
          id_kategori: model?.id_kategori,
          id_evaluasi: model?.id,
          id_user: userData?.id,
          id_diklat: model?.id_diklat,
          response: values,
        },
      })
      .then((res: any) => {
        hideModal()
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  const fetchData: Function = async () => {
    axios
      .get("/api/survey-pertanyaan", {
        params: {
          pageNumber: 1,
          pageSize: 100,
          sortdatafield: "id",
          sortorder: "desc",
          id_evaluasi: model?.id,
          id_kategori: model?.id_kategori,
          id_user: model?.id_user,
          id_diklat: model?.id_diklat,
          id_jadwal_diklat: model?.id_jadwal_diklat,
        },
      })
      .then((res: any) => {
        setData(res?.data?.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [model])

  return (
    <Wrapper>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {data?.questions?.map((v: any, i: number) => {
          if (v?.elements[0].type === "radiogroup") {
            return (
              <>
                <Form.Item
                  label={v?.elements[0]?.title}
                  name={v?.elements[0]?.name}
                  required={v?.elements[0].isRequired}
                  rules={[
                    {
                      required: v?.elements[0].isRequired,
                      message: "wajib dipilih",
                    },
                  ]}
                >
                  <Radio.Group
                  // onChange={(e) => {
                  //   // form.setFieldValue(v?.elements[0]?.name, e.target.value)
                  //   // console.log(e.target.value)
                  //   // console.log("cc", v?.elements[0]?.name)
                  //   // console.log("xxx", form.getFieldValue(v?.elements[0]?.name))
                  //   // setShow(!show)
                  // }}
                  >
                    <Space direction="vertical">
                      {v?.elements[0].choices?.map((c: any) => {
                        return <Radio value={c.value}>{c.text}</Radio>
                      })}
                      {v?.elements[0]?.withLainnya && (
                        <Radio value={`${v?.elements[0].name}_lainnya`}>
                          Yang Lain:
                          <Input
                            style={{ width: "100%", marginLeft: 0 }}
                            placeholder="Isi bila pilih lainnya"
                            onChange={(e) => {
                              form.setFieldValue(
                                `${v?.elements[0].name}_lainnya`,
                                e.target.value
                              )
                            }}
                          />
                        </Radio>
                      )}
                    </Space>
                  </Radio.Group>
                </Form.Item>
                {v?.elements[0]?.withLainnya && (
                  <Form.Item
                    label={`${v?.elements[0].name}_hidden`}
                    name={`${v?.elements[0].name}_lainnya`}
                    hidden
                  >
                    <Input placeholder="Isi bila pilih lainnya" />
                  </Form.Item>
                )}
                {v?.elements[0]?.withPenjelasan && (
                  <div style={{ marginTop: "-25px" }}>
                    <Form.Item
                      label="Penjelasan"
                      name={`${v?.elements[0].name}_penjelasan`}
                      required
                      rules={[
                        {
                          required: v?.elements[0].isRequired,
                          message: "wajib diisi",
                        },
                      ]}
                    >
                      <Input placeholder="Isi penjelasan" />
                    </Form.Item>
                  </div>
                )}
              </>
            )
          }

          if (v?.elements[0].type === "checkbox") {
            const options = v?.elements[0]?.choices?.map((cx: any) => {
              return { label: cx.text, value: cx.value }
            })
            if (v?.elements[0]?.withLainnya) {
              options.push({
                label: "Lainnya",
                value: `${v?.elements[0].name}_lainnya_hidden`,
              })
            }

            return (
              <>
                <Form.Item
                  label={v?.elements[0]?.title}
                  name={v?.elements[0]?.name}
                  required={v?.elements[0].isRequired}
                  rules={[
                    {
                      required: v?.elements[0].isRequired,
                      message: "wajib pilih minimal satu",
                    },
                  ]}
                >
                  <CheckboxGroup options={options} />
                </Form.Item>
                {v?.elements[0]?.withLainnya && (
                  <Form.Item
                    label={``}
                    name={`${v?.elements[0].name}_lainnya`}
                    rules={[
                      {
                        required: false,
                        message: "wajib isi",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Isi bila pilih lainnya"
                      style={{ width: "45%", marginLeft: 0 }}
                    />
                  </Form.Item>
                )}
              </>
            )
          }

          if (v?.elements[0].type === "text") {
            return (
              <Form.Item
                label={v?.elements[0]?.title}
                name={v?.elements[0]?.name}
                required={v?.elements[0].isRequired}
                rules={[
                  {
                    required: v?.elements[0].isRequired,
                    message: "wajib diisi",
                  },
                ]}
              >
                <Input placeholder="Isi jawaban" />
              </Form.Item>
            )
          }
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "16px",
            gap: "30px",
          }}
        >
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
          <Button
            type="primary"
            danger
            onClick={() => {
              hideModal()
            }}
          >
            Batalkan
          </Button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Tracer
