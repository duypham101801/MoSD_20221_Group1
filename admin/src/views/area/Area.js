import React, { useState, useContext, useEffect } from 'react'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Table, Space, Button, Modal, Form, Input, Select, notification, Row, Col } from 'antd'
import SearchForm from 'src/components/search/SearchForm'
import { SearchContext } from 'src/context/SearchContext'
// Cac api get list nen co pagination
import { getToken } from 'src/services/auth'
import { createArea, getAreaList, deleteArea } from 'src/services/area'
import Search from 'src/components/area/Search'

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

function Area() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })
  const navigate = useNavigate()
  const isArea = useMatch('/areas')
  const isHouse = useMatch('/houses')
  // k nen de du lieu undefine
  const [data, setData] = useState([])
  const [file, setFile] = useState(null)
  const [video, setVideo] = useState(null)
  const [provinceFilter, setProvinceFilter] = useState([])
  const [districtFilter, setDistrictFilter] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Add car')
  const [searchForm] = Form.useForm()
  const { dispatch, searchState } = useContext(SearchContext)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => <>{name}</>,
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (_id, name) => {
        return (
          <>
            <Space size="middle">
              {isArea ? (
                <>
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate(`/areas/${_id}`)
                    }}
                  >
                    {'Detail'}
                  </Button>
                  <Button
                    type="danger"
                    htmlType="button"
                    onClick={() => onDelete(_id)}
                    style={{ marginRight: '8px' }}
                  >
                    {'Delete'}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate(`/houses/${_id}`)
                    }}
                  >
                    {'Detail'}
                  </Button>
                </>
              )}
            </Space>
          </>
        )
      },
    },
  ]
  const onDelete = async (areaId) => {
    Modal.confirm({
      title: `Delete Area `,
      icon: <ExclamationCircleOutlined />,
      content: `You are going to delete this area? Are you sure you want to do this? You can't reverse this`,
      async onOk() {
        // lay tu form item

        const deleteCategory = async () => {
          try {
            const res = await deleteArea(areaId)
            console.log(searchState)
            if (res) {
              const data = await getAreaList({
                province: searchState.provinceName,
                district: searchState.districtName,
              })
              if (data.areas) {
                let key = 1
                data.areas.forEach((area) => {
                  area.key = key++
                })
                setData(data.areas)
              }
              setVisible(false)
              notification.success({
                message: `Notification`,
                description: `${res.message}`,
                placement: `bottomRight`,
                duration: 1.5,
              })
            }
          } catch (err) {
            if (err.status === 401 && err.message === 'authorization_failed') {
              getToken(deleteCategory)
            } else
              notification.error({
                message: `Error`,
                description: `${err.message}`,
                placement: `bottomRight`,
                duration: 1.5,
              })
          }
        }
        deleteCategory()
      },
      onCancel() {
        notification.info({
          message: `Notification`,
          description: `Cancel delete area`,
          placement: `bottomRight`,
          duration: 1.5,
        })
        setVisible(false)
      },
      centered: true,
    })
  }
  // add new
  const onFinish = async (values) => {
    // limit if filter then can add area
    const inputs = values

    inputs.avatar = file
    inputs.areaVideo = URL.createObjectURL(video)
    // inputs.provinceName = searchState.province
    // inputs.districtName = searchState.district

    const addArea = async () => {
      try {
        const res = await createArea(inputs)
        if (res) {
          dispatch({
            type: 'NEW_SEARCH',
            payload: { province: inputs.provinceName, district: inputs.districtName },
          })
          const data = await getAreaList({
            province: inputs.provinceName,
            district: inputs.districtName,
          })
          if (data.areas) {
            let key = 1
            data.areas.forEach((area) => {
              area.key = key++
            })
            setData(data.areas)
          }
          // setVisible(false)
          notification.success({
            message: `Notification`,
            description: `${res.message}`,
            placement: `bottomRight`,
            duration: 1.5,
          })
        }
      } catch (err) {
        if (err.status === 401 && err.message === 'authorization_failed') {
          getToken(addArea)
        } else {
          if (err.validationErrors) {
            const error = []
            for (const [key, value] of Object.entries(err.validationErrors)) {
              error.push({ name: key, errors: [`${value}`] })
            }
            form.setFields(error)
          }
          /*
          form.setFields([
            {
              name: 'areaName',
              errors: [`${err.validationErrors.areaName}`],
            },
            {
              name: 'minPrice',
              errors: err.validationErrors.minPrice && [`${err.validationErrors.minPrice}`],
            },
            {
              name: 'maxPrice',
              errors: err.validationErrors.maxPrice && [`${err.validationErrors.maxPrice}`],
            },
            {
              name: 'areaCapacity',
              errors: err.validationErrors.areaCapacity && [`${err.validationErrors.areaCapacity}`],
            },
            {
              name: 'areaDesc',
              errors: err.validationErrors.areaDesc && [`${err.validationErrors.areaDesc}`],
            },
          ])
          */
          notification.error({
            message: `Error`,
            description: err.message,
            placement: `bottomRight`,
            duration: 1.5,
          })
        }
      }
    }
    addArea()
  }
  useEffect(() => {}, [file])
  return (
    <CRow>
      <Modal
        style={{ marginTop: ' 100px ' }}
        centered={true}
        open={visible}
        title={formTitle}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} {...formItemLayout} name="form_in_modal" onFinish={onFinish}>
          <Form.Item
            name="areaName"
            label={"Area's Name"}
            rules={[
              {
                required: true,
                message: "Please enter the area's name!",
              },
            ]}
          >
            <Input placeholder={"Please enter the area's name"} />
          </Form.Item>
          <Search />
          <Form.Item
            name="avatar"
            label={"Area's Image"}
            rules={[
              {
                required: true,
                message: "Please enter the area's image!",
              },
            ]}
          >
            <Input
              type="file"
              value={file}
              onChange={(e) => {
                const file = e.target.files[0]
                setFile(file)
              }}
              placeholder={"Please enter the area's image"}
            />
          </Form.Item>
          <Form.Item
            name="areaVideoIntro"
            label={"Area's Video Intro"}
            rules={[
              {
                required: true,
                message: "Please enter the area's video!",
              },
            ]}
          >
            <Input
              type="file"
              onChange={(e) => {
                const video = e.target.files[0]
                setVideo(video)
              }}
              placeholder={"Please enter the area's image"}
            />
          </Form.Item>
          <Form.Item
            name="minPrice"
            label={"Area's Min Price"}
            rules={[
              {
                required: true,
                message: "Please enter the area's price!",
              },
            ]}
          >
            <Input placeholder={"Please enter the area's price"} />
          </Form.Item>
          <Form.Item
            name="maxPrice"
            label={"Area's Max Price"}
            rules={[
              {
                required: true,
                message: "Please enter the area's price!",
              },
            ]}
          >
            <Input placeholder={"Please enter the area's price"} />
          </Form.Item>
          <Form.Item
            name="areaCapacity"
            label={"Area's Capacity"}
            rules={[
              {
                required: true,
                message: "Please enter the area's capacity!",
              },
            ]}
          >
            <Input placeholder={"Please enter the area's capacity"} />
          </Form.Item>
          <Form.Item
            name="areaDesc"
            label={"Area's Description"}
            rules={[
              {
                required: true,
                message: "Please enter the area's description!",
              },
            ]}
          >
            <Input placeholder={"Please enter the area's description"} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {'Create'}
            </Button>
            <Button htmlType="button" onClick={() => setVisible(false)}>
              {'Cancel'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>List Areas</CCardHeader>
          <CCardBody>
            {isArea && (
              <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={() => {
                  setVisible(true)
                  setIsUpdate(false)
                  setFormTitle('Add Area ')
                  form.resetFields()
                }}
              >
                {'Add Area'}
              </Button>
            )}
            {/*<Row gutter={[16, 0]} style={{ margin: '20px 0 12px 0' }}>
              <Col>
                <h5>Filters</h5>
              </Col>
              <Col>
                <Form form={searchForm} name="horizontal_filter" layout="inline">
                  <Form.Item
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the province!',
                      },
                    ]}
                  >
                    <Select placeholder={'Select provinces'}>
                      <Option value={5}></Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the district!',
                      },
                    ]}
                  >
                    <Select placeholder={'Select districts'}>
                      <Option value={5}></Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
            </Row>*/}
            {isArea && <SearchForm setData={setData}></SearchForm>}
            {isHouse && <SearchForm setData={setData}></SearchForm>}
            <Table columns={columns} dataSource={data} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Area
