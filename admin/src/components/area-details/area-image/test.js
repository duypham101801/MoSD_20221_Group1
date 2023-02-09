import React, { useEffect, useState } from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Table, Space, Button, Modal, Form, Input, Select, notification } from 'antd'
import { useParams } from 'react-router-dom'

import { createHouseFile, getHouseFile } from 'src/services/file'
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
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}
const { Option } = Select
function HouseFile() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })
  const [data, setData] = useState()
  const [provinceFilter, setProvinceFilter] = useState([])
  const [districtFilter, setDistrictFilter] = useState([])
  const [areaFilter, setAreaFilter] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [formTitle, setFormTitle] = useState('Them file can')
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'title',
      render: () => (
        <>
          <p>Resort</p>
        </>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'urlThumb',
      render: () => (
        <>
          <p>Resort</p>
        </>
      ),
    },
    {
      title: 'Link',
      dataIndex: 'urlFile',
      render: () => (
        <>
          <p>Resort</p>
        </>
      ),
    },

    // {
    //   title: 'Category',
    //   dataIndex: 'category',
    // },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  const { id: houseId } = useParams()
  // console.log(params)
  const [file, setFile] = useState(null)
  const [fileAvatar, setFileAvatar] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getHouseFile(houseId)
        console.log('res.files', res.files)

        if (res.files) {
          let key = 1
          res.files.forEach((file) => {
            file.key = key++
          })
          console.log('res.files', res.files)
          setData(res.files)
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    getData()
  }, [houseId])

  const handleAddHouseFile = (e) => {
    const { file_description, file_title } = form.getFieldsValue()

    const addData = async () => {
      try {
        const res = await createHouseFile(houseId, {
          thumb: fileAvatar,
          file: file,
          fileTitle: file_title,
          fileDesc: file_description,
        })
         
        if (res) {
          const data = await getHouseFile(houseId)

          if (data.houses) {
            console.log('new data')
            let key = 1

            data.files.forEach((file) => {
              file.key = key++
            })

            notification.success({
              message: Notification,
              description: ${res.message},
              placement: bottomRight,
              duration: 1.5,
            })

            setData(data.houses)
          }
        }

        setVisible(false)
      } catch (err) {
        console.log(err.message)
      }
    }

    addData()
  }

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
        <Form form={form} {...formItemLayout} name="form_in_modal">
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="category"
            label={'Category'}
            rules={[
              {
                required: true,
                message: 'Please select category!',
              },
            ]}
          >
            <Select placeholder={'Please select category'}>
              <Option value={5}></Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            name="file_title"
            label={'File Title'}
            rules={[
              {
                required: true,
                message: 'Please enter the file name',
              },
            ]}
          >
            <Input placeholder={'Please enter the file name'} />
          </Form.Item>

          <Form.Item
            name="file_description"
            label={'File Description'}
            rules={[
              {
                required: true,
                message: 'Please enter the file description',
              },
            ]}
          >
            <Input placeholder={'Please enter the file description'} />
          </Form.Item>

          <Form.Item
            name="file_avatar"
            label={'File Avatar'}
            rules={[
              {
                required: true,
                message: "Please enter the area's file!",
              },
            ]}
          >
            <Input
              type="file"
              value={fileAvatar}
              onChange={(e) => setFileAvatar(e.target.files[0])}
              placeholder={"Please enter the file's avatar"}
            />
          </Form.Item>

          <Form.Item
            name="file"
            label={'File'}
            rules={[
              {
                required: true,
                message: "Please enter the area's file!",
              },
            ]}
          >
            <Input
              type="file"
              value={file}
              onChange={(e) => setFile(e.target.files[0])}
              placeholder={'Please enter the file'}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              onClick={handleAddHouseFile}
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
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>House Files</CCardHeader>
          <CCardBody>
            <Button
              type="primary"
              style={{ marginBottom: 16 }}
              onClick={() => {
                setVisible(true)
                setIsUpdate(false)
                setFormTitle('Add File')
                form.resetFields()
              }}
            >
              {'Add File'}
            </Button>
            <Table columns={columns} dataSource={data} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default HouseFile