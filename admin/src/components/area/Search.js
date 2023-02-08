/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'
import useLocationForm from './useLocationForm'

import { Form, Row, Col, Button, Input, Select } from 'antd'
const { Option } = Select

function Search() {
  const { state, onCitySelect } = useLocationForm()

  const { cityOptions, districtOptions, selectedCity, selectedDistrict } = state
  const handleChange = (value) => {
    const city = cityOptions.find((e) => e.value === value)
    onCitySelect(city)
  }
  //console.log(cityOptions)
  return (
    <>
      <Form.Item
        name="provinceName"
        label={'Province'}
        rules={[
          {
            required: true,
            message: 'Please enter the province!',
          },
        ]}
      >
        <Select placeholder={'Please select provinces'} onChange={handleChange}>
          {cityOptions?.map((city) => (
            <Option value={city.value} key={city.id}></Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="districtName"
        label={'District'}
        rules={[
          {
            required: true,
            message: 'Please enter the district!',
          },
        ]}
      >
        <Select placeholder={'Please select districts'}>
          {districtOptions?.map((district) => (
            <Option value={district.value} key={district.id}></Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}

export default Search
/*
className= {` ${visible ? "fixed" : ""}`}

<div className="vertical"></div>
*/
