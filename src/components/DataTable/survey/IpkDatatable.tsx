import { FunctionComponent, useEffect, useRef, useState } from "react"
import { Button, Input, Space, Table } from "antd"
import axios from "axios"
import type { FilterConfirmProps } from "antd/es/table/interface"
import type { ColumnsType, ColumnType } from "antd/es/table"
import { SearchOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"

type Props = {
  categoryId: number
}

type Model = {
  id: string
  judul_diklat: string
  tgl_pelaksanaan_awal: string
  tgl_pelaksanaan_selesai: string
  tempat_diklat: string
  jenis_diklat: string
}

const ListSurveyDatatable: FunctionComponent<Props> = (props: Props) => {
  const { categoryId } = props
  const router = useRouter()
  const searchInput = useRef<any>(null)
  const [datas, setDatas] = useState<any>({
    data: [],
    total: 0,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [filter, setFilter] = useState<Model>({
    id: "",
    judul_diklat: "",
    tgl_pelaksanaan_awal: "",
    tgl_pelaksanaan_selesai: "",
    tempat_diklat: "",
    jenis_diklat: "",
  })
  const [pagination, setPagination] = useState<any>({
    page: 1,
    pageSize: 10,
  })

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any
  ) => {
    const x = {
      ...filter,
      [dataIndex]: selectedKeys[0],
    }
    setFilter(x)
    confirm({ closeDropdown: true })
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
  }
  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
  })

  const columns: ColumnsType<any> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_row, _record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Judul",
      dataIndex: "judul",
      key: "judul",
      ...getColumnSearchProps("judul"),
    },
    {
      title: "Jadwal Diklat",
      dataIndex: "jadwal",
      key: "jadwal",
      ...getColumnSearchProps("jadwal"),
      render: (_, record) => (
        <span>{`${record?.jadwal?.waktu_mulai} - ${record?.jadwal?.waktu_selesai}`}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 30,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            onClick={() => {
              console.log("record", record)
              router.push("/survey")
              // setIsedit(true)
              // setModel(record)
              // setModalTitle(`Update ${record.judul_diklat}`)
              // setShowModal(true)
            }}
          >
            Ikuti Survey
          </Button>
        </Space>
      ),
    },
  ]

  const fetchData: Function = async () => {
    setLoading(true)
    axios
      .get("/api/survey", {
        params: {
          pageNumber: pagination?.page,
          pageSize: pagination?.pageSize,
          sortdatafield: "id",
          sortorder: "desc",
          id_kategori: categoryId,
          ...filter,
        },
      })
      .then((res: any) => {
        setDatas({
          data: res?.data?.data,
          total: res?.data?.meta?.pagination?.total,
        })
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
    console.log("main jabatan")
  }, [filter, pagination])

  return (
    <Table
      bordered
      size="small"
      scroll={{ x: 900 }}
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={datas?.data}
      pagination={{
        position: ["bottomLeft"],
        defaultCurrent: 1,
        total: datas.total,
        onChange: (page, pageSize) => {
          setPagination({
            page: page,
            pageSize: pageSize,
          })
        },
        showSizeChanger: true,
        onShowSizeChange: (current, pageSize) => {
          console.log(current, pageSize)
        },
      }}
    />
  )
}

export default ListSurveyDatatable
