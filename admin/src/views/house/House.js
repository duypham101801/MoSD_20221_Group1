import React, { useEffect, useState } from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import 'antd/dist/antd.css'
import { Space, Button, Modal, Form, Input, Select, notification } from 'antd'

import Table from 'ant-responsive-table'

import { Link, useMatch, useNavigate, useParams } from 'react-router-dom'
import { getToken } from 'src/services/auth'
import { createHouse, getHouseList, deleteHouse } from 'src/services/house'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const { Option } = Select
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}
function House() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })
  const navigate = useNavigate()
  const isMatch = useMatch('/houses/:areaId')
  const { areaId } = useParams()
  const [data, setData] = useState()
  const [provinceFilter, setProvinceFilter] = useState([])
  const [districtFilter, setDistrictFilter] = useState([])
  const [areaFilter, setAreaFilter] = useState([])
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Them can')
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',

      key: 'key',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Avatar',
      dataIndex: 'urlAvatar',
      render: (urlAvatar) => (
        <>
          {
            <img
              src={urlAvatar}
              style={{ maxWidth: '130px', maxHeight: '130px', objectFit: 'cover' }}
              alt={'Error'}
            />
          }
        </>
      ),

      key: 'urlAvatar',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => <>{name}</>,

      key: 'name',
      showOnResponse: true,
      showOnDesktop: true,
    },

    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => <>{price}</>,

      key: 'price',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Total Rooms',
      dataIndex: 'count',
      render: (count) => <>{count}</>,

      key: 'count',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'House Type',
      dataIndex: 'type',
      render: (type) => <>{type}</>,

      key: 'type',
      showOnResponse: true,
      showOnDesktop: true,
    },

    {
      title: 'Action',
      dataIndex: '_id',
      render: (_id) => {
        return (
          <>
            <Button
              style={{ marginRight: 10 + 'px' }}
              type="primary"
              onClick={() => {
                navigate(`/houses/${areaId}/${_id}`)
              }}
            >
              {'Detail'}
            </Button>

            <Button type="ghost" onClick={() => handleDeleteHouse(_id)}>
              {'Delete'}
            </Button>
          </>
        )
      },

      key: '_id',
      showOnResponse: true,
      showOnDesktop: true,
    },
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getHouseList(areaId)
        if (res.houses) {
          let key = 1
          res.houses.forEach((house) => {
            house.key = key++
          })
          setData(res.houses)
        }
      } catch (err) {
        notification.error({
          message: `Error`,
          description: `${err.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        })
      }
    }
    getData()
  }, [])

  const params = useParams()

  const [houseAvatar, setHouseAvatar] = useState('')

  const handleAddHouse = (e) => {
    e.preventDefault()

    const postData = async () => {
      try {
        const valueFields = form?.getFieldsValue(true)
        const { house_name, house_desc, house_price, house_quantity, house_type } = valueFields

        const res = await createHouse(params.areaId, {
          houseName: house_name,
          houseType: house_type,
          housePrice: house_price,
          houseInfo: house_desc,
          houseCount: house_quantity,
          avatar: houseAvatar,
        })

        setVisible(false)

        if (res) {
          // render UI of list if addHouse request on backend is successful
          const data = await getHouseList(params.areaId)

          if (data.houses) {
            let key = 1

            data.houses.forEach((house) => {
              house.key = key++
            })

            setData(data.houses)

            //  setVisible(false)
            notification.success({
              message: `Notification`,
              description: `${res.message}`,
              placement: `bottomRight`,
              duration: 1.5,
            })
          }
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(postData)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 3,
          })
      }
    }

    postData()
  }

  const handleDeleteHouse = (idHouse) => {
    const delelteData = async () => {
      try {
        // const { house_name, house_desc, house_price, house_quantity, house_type } = valueFields

        const res = await deleteHouse(idHouse)

        // render list when API is successful

        if (res) {
          const data = await getHouseList(params.areaId)

          if (data.houses) {
            let key = 1

            data.houses.forEach((house) => {
              house.key = key++
            })

            notification.success({
              message: `Notification`,
              description: `${res.message}`,
              placement: `bottomRight`,
              duration: 1.5,
            })

            setData(data.houses)
          }
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(delelteData)
        } else
          notification.error({
            message: `Error`,
            description: `${err.message}`,
            placement: `bottomRight`,
            duration: 3,
          })
      }
    }

    delelteData()
  }

  return (
    <>
      <Modal
        style={{ marginTop: ' 100px ' }}
        centered={true}
        open={visible}
        title={formTitle}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal">
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="house_name"
            label={"House's Name"}
            rules={[
              {
                required: true,
                message: "Please enter the house's name!",
              },
            ]}
          >
            <Input placeholder={"Please enter the hosue's name"} />
          </Form.Item>
          <Form.Item
            value={houseAvatar}
            onChange={(e) => {
              setHouseAvatar((prev) => e.target.files[0])
            }}
            name="house_avatar"
            label={"House's Avatar"}
            rules={[
              {
                required: true,
                message: 'Please select house image',
              },
            ]}
          >
            <Input type="file" placeholder={'Please select house image'} />
          </Form.Item>
          <Form.Item
            name="house_price"
            label={"House's Price"}
            rules={[
              {
                required: true,
                message: "Please enter the house's price!",
              },
            ]}
          >
            <Input placeholder={"Please enter the house's price"} />
          </Form.Item>
          <Form.Item
            name="house_quantity"
            label={"House's Quantity"}
            rules={[
              {
                required: true,
                message: "Please enter the house's quantity!",
              },
            ]}
          >
            <Input placeholder={"Please enter the house's quantity"} />
          </Form.Item>
          <Form.Item
            name="house_desc"
            label={"House's Description"}
            rules={[
              {
                required: true,
                message: "Please enter the house's description!",
              },
            ]}
          >
            <Input placeholder={"Please enter the house's description"} />
          </Form.Item>
          <Form.Item
            name="house_type"
            label={"House's Type"}
            rules={[
              {
                required: true,
                message: "Please enter the house's type!",
              },
            ]}
          >
            <Input placeholder={"Please enter the house's type"} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              onClick={handleAddHouse}
              htmlType="submit"
              style={{ marginRight: 8 }}
            >
              {'Submit'}
            </Button>
            <Button htmlType="button" onClick={() => setVisible(false)}>
              {'Cancel'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <CCol xs={12} className="mb-4">
        <CCard>
          <CCardHeader>List Houses</CCardHeader>
          <CCardBody>
            <Button
              type="primary"
              style={{ marginBottom: 16 }}
              onClick={() => {
                setVisible(true)
                setIsUpdate(false)
                setFormTitle('Add House')
                form.resetFields()
              }}
            >
              {'Add House'}
            </Button>
            {/*<SearchForm setData={setData}></SearchForm>*/}
            <Table
              className="table-striped-rows"
              antTableProps={{
                showHeader: true,
                columns,
                dataSource: data,
                pagination: false,
              }}
              mobileBreakPoint={768}
              // columns={columns}
              // dataSource={data}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default House
