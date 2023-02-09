import { useContext, useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router'
import { getProvinceList, getDistrictList } from '../../services/search'
import { getAreaList, getDistricts, getProvinces } from 'src/services/area'
import { getHouseList } from 'src/services/house'
import { notification } from 'antd'
import { SearchContext } from 'src/context/SearchContext'
async function fetchProvince() {
  try {
    const res = await getProvinces()
    const provinces = res.map(({ id, name }) => ({
      value: name,
      text: name,
      id: id,
    }))
    return provinces
  } catch (e) {
    console.log(e)
  }
}
async function fetchDistrict(provinceId) {
  try {
    const res = await getDistricts(provinceId)
    const districts = res.map(({ id, name }) => ({
      value: name,
      text: name,
      id: id,
    }))
    return districts
  } catch (e) {
    console.log(e)
  }
}

async function fetchInitialData() {
  const [cities] = await Promise.all([fetchProvince()])

  return {
    cityOptions: cities,
    // districtOptions: districts,
    // selectedCity: cities.find(({ label }) => label === 'Hòa Bình'),
    // selectedDistrict: districts.find(({ label }) => label === 'Kỳ Sơn'),
  }
}

function useLocationForm() {
  const navigate = useNavigate()
  const [state, setState] = useState({
    cityOptions: [],
    districtOptions: [],
    selectedCity: null,
    selectedDistrict: null,
  })
  const { selectedCity, selectedDistrict } = state
  useEffect(() => {
    // dispatch({ type: 'RESET_SEARCH', payload: {} })
    ;(async function () {
      // neu co searchStatE
      const initialData = await fetchInitialData()
      setState(initialData)
    })()
  }, [])

  useEffect(() => {
    ;(async function () {
      if (!selectedCity) return
      const options = await fetchDistrict(selectedCity.id)
      //console.log(options)
      setState((prevState) => {
        return { ...prevState, districtOptions: options }
      })
    })()
  }, [selectedCity])

  function onCitySelect(option) {
    if (option !== selectedCity) {
      setState((prevState) => {
        return {
          ...prevState,
          districtOptions: [],
          selectedCity: option,
          selectedDistrict: null,
        }
      })
      // console.log(option)
    }
  }

  return {
    state,
    onCitySelect,
  }
}

export default useLocationForm
