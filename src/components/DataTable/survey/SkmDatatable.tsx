import { FunctionComponent, useEffect, useRef, useState } from "react"
import { Button, Input, Space, Table } from "antd"
import axios from "axios"
import type { FilterConfirmProps } from "antd/es/table/interface"
import type { ColumnsType, ColumnType } from "antd/es/table"
import { SearchOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"

type Props = {
  categoryId: number
  userData: any
}

export type Model = {
  id: string
  judul: string
  id_kategori: string
  id_master_diklat: string
  jadwal: {
    waktu_mulai: string
    waktu_selesai: string
  }
  pengajar: {
    nama_depan: string
    nama_belakang: string
  }
}

export type Filter = {
  id_kategori: number
}

const ListSurveyDatatable: FunctionComponent<Props> = (props: Props) => {
  const {
    categoryId,
    userData: { id },
  } = props
  const router = useRouter()
  const searchInput = useRef<any>(null)
  const [datas, setDatas] = useState<any>({
    data: [],
    total: 0,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [filter, setFilter] = useState<Filter>({
    id_kategori: categoryId,
  })
  const [model, setModel] = useState<Model>({
    id: "",
    judul: "",
    id_kategori: "",
    id_master_diklat: "",
    jadwal: {
      waktu_mulai: "",
      waktu_selesai: "",
    },
    pengajar: {
      nama_depan: "",
      nama_belakang: "",
    },
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
      title: "Pengajar",
      dataIndex: "pengajar",
      key: "pengajar",
      render: (_, record) => (
        <span>{`${record?.pengajar?.nama_depan} ${record?.pengajar?.nama_belakang}`}</span>
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
              setModel(record)
              setShowModal(true)
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
          id_peserta: id,
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
