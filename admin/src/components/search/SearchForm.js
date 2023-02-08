/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import useLocationForm from './useLocationForm'
import Select from 'react-select'
import { useLocation, useMatch } from 'react-router'
import { Form, Row, Col, Button } from 'antd'
import { SearchContext } from 'src/context/SearchContext'
const style = {
  control: (base) => ({
    ...base,
    // border: 0,
    // This line disable the blue border
    // width: 200,
    // boxShadow: 'none',
    // textAlign:"left",
  }),
}

function SearchForm({ setData }) {
  const { state, onCitySelect, onDistrictSelect, setState, handleSubmit } = useLocationForm(
    true,
    setData,
  )
  const { searchState } = useContext(SearchContext)
  const isMatchPath = useMatch('/areas')
  const {
    cityOptions,
    districtOptions,
    areaOptions,
    selectedCity,
    selectedDistrict,
    selectedArea,
  } = state
  const [searchForm] = Form.useForm()

  return (
    <>
      <Form
        form={searchForm}
        name="horizontal_filter"
        style={{ width: '100%', gap: '15px', marginBottom: '15px' }}
        layout="inline"
      >
        <Col xs={24} sm={24} md={3}>
          <Form.Item name="title">
            <h4>Filters</h4>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7}>
          <Form.Item
            name="province"
            rules={[
              {
                required: true,
                message: 'Please enter the province!',
              },
            ]}
            // initialValue={}
          >
            <Select
              className="select"
              components={{
                // DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              styles={style}
              name="cityId"
              key={`cityId_${selectedCity?.value}`}
              isDisabled={cityOptions?.length === 0}
              options={cityOptions}
              onChange={(option) => {
                onCitySelect(option)
                searchForm.setFieldsValue({
                  district: { label: '', value: '' },
                })
              }}
              placeholder="Tỉnh/Thành"
              defaultValue={selectedCity}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7}>
          <Form.Item
            name="district"
            rules={[
              {
                required: true,
                message: 'Please enter the district!',
              },
            ]}
          >
            <Select
              className="select"
              styles={style}
              components={{
                // DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              name="districtId"
              key={`districtId_${selectedDistrict?.value}`}
              isDisabled={districtOptions?.length === 0}
              options={districtOptions}
              onChange={(option) => {
                onDistrictSelect(option)
              }}
              placeholder="Quận/Huyện"
              defaultValue={selectedDistrict}
            />
          </Form.Item>
        </Col>
        {/* {!isMatchPath && (
          <Col xs={24} sm={24} md={7}>
            <Form.Item
              name="area"
              rules={[
                {
                  required: true,
                  message: 'Please select area!',
                },
              ]}
            >
              <Select
                name="area"
                key={`area_${selectedArea?.value}`}
                className="select"
                styles={style}
                components={{
                  // DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                options={areaOptions}
                isDisabled={areaOptions?.length === 0}
                onChange={(option) => onAreaSelect(option)}
                placeholder="Khu"
              />
            </Form.Item>
          </Col>
        )} */}

        <Col xs={24} sm={24} md={4}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '8px' }}
              onClick={handleSubmit}
            >
              {'Search'}
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </>
  )
}

export default SearchForm
/*
className= {` ${visible ? "fixed" : ""}`}

<div className="vertical"></div>
*/
