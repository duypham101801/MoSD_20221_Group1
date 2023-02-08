import { useContext, useEffect, useState } from 'react'
import { useMatch, useNavigate } from 'react-router'
import { getProvinceList, getDistrictList } from '../../services/search'
import { getAreaList } from 'src/services/area'
import { notification } from 'antd'
import { SearchContext } from 'src/context/SearchContext'
async function fetchProvince() {
  try {
    const res = await getProvinceList()
    const provinces = res.provinces.map((provinceName) => ({
      value: provinceName,
      label: provinceName,
    }))
    return provinces
  } catch (e) {
    console.log(e)
  }
}
async function fetchDistrict(provinceName) {
  try {
    const res = await getDistrictList(provinceName)
    const districts = res.districts.map((districtName) => ({
      value: districtName,
      label: districtName,
    }))
    return districts
  } catch (e) {
    console.log(e)
  }
}
async function fetchArea(data) {
  try {
    const res = await getAreaList(data)
    const areas = res.areas.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }))
    return areas
  } catch (e) {
    console.log(e)
  }
}

async function fetchInitialData() {
  // const { cityId, districtId } = (await axios.get(PATHS.LOCATION)).data;
  const [cities, districts] = await Promise.all([fetchProvince(), fetchDistrict('Hòa Bình')])
  return {
    cityOptions: cities,
    // districtOptions: districts,
    selectedCity: null,
    // selectedCity: cities.find(({ label }) => label === 'Hòa Bình'),
    // selectedDistrict: districts.find(({ label }) => label === 'Kỳ Sơn'),
  }
}
async function fetchInitData(searchState) {
  // const { cityId, districtId } = (await axios.get(PATHS.LOCATION)).data;
  const [cities, districts] = await Promise.all([
    fetchProvince(),
    fetchDistrict(searchState.provinceName),
  ])
  return {
    cityOptions: cities,
    districtOptions: districts,
    selectedCity: cities.find(({ label }) => label === searchState.provinceName),
    selectedDistrict: districts.find(({ label }) => label === searchState.districtName),
  }
}

function useLocationForm(shouldFetchInitialLocation, setData) {
  const { dispatch, searchState } = useContext(SearchContext)
  const isMatchPath = useMatch('/areas')
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
    const searchStatus = JSON.parse(localStorage.getItem('search'))
    ;(async function () {
      if (!searchStatus) {
        // neu co searchStatE
        const initialData = await fetchInitialData()
        setState(initialData)
      } else {
        dispatch({ type: 'NEW_SEARCH', payload: searchStatus })
        const initialData = await fetchInitData(searchStatus)
        setState(initialData)
      }
    })()

    /*
    ;(async function () {
      // neu co searchStatE
      if (shouldFetchInitialLocation) {
        const initialData = await fetchInitialData()
        setState(initialData)
      } else {
        const initialData = await fetchInitData({
          provinceName: selectedCity.label,
          districtName: selectedDistrict.label,
        })
        setState(initialData)
      }
    })() */
  }, [])

  useEffect(() => {
    ;(async function () {
      if (!selectedCity) return
      const options = await fetchDistrict(selectedCity.value)
      setState((prevState) => {
        return { ...prevState, districtOptions: options }
      })
    })()
  }, [selectedCity])

  useEffect(() => {
    ;(async function () {
      if (!selectedDistrict) return
      const data = { province: selectedCity.value, district: selectedDistrict.value }
      const options = await fetchArea(data)
      setState((prevState) => {
        return { ...prevState, areaOptions: options }
      })
    })()
  }, [selectedDistrict])

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
    }
  }

  function onDistrictSelect(option) {
    setState((prevState) => {
      return {
        ...prevState,
        selectedDistrict: option,
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const searchState = {}
    let res
    if (selectedCity) {
      // ten tp
      searchState.provinceName = selectedCity.value
    }
    if (selectedDistrict) {
      // ten quan
      searchState.districtName = selectedDistrict.value
    }
    /*
    if (!isMatchPath) {
      try {
        res = await getHouseList(selectedArea.value)
        if (res.listHouses) {
          let key = 1
          res.listHouses.forEach((house) => {
            house.key = key++
          })
          setData(res.listHouses)
        }
      } catch (err) {
        notification.error({
          message: `Error`,
          description: `${err.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        })
      }
    } else {
      try {
        res = await getAreaList({ province: selectedCity.label, district: selectedDistrict.label })
        if (res.areas) {
          let key = 1
          res.areas.forEach((area) => {
            area.key = key++
          })
          setData(res.areas)
        }
      } catch (err) {
        notification.error({
          message: `Error`,
          description: `${err.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        })
      }
    } */
    try {
      res = await getAreaList({ province: selectedCity.label, district: selectedDistrict.label })
      if (res.areas) {
        let key = 1
        res.areas.forEach((area) => {
          area.key = key++
        })
        setData(res.areas)
      }
    } catch (err) {
      notification.error({
        message: `Error`,
        description: `${err.message}`,
        placement: `bottomRight`,
        duration: 1.5,
      })
    }
    dispatch({ type: 'NEW_SEARCH', payload: searchState })
    localStorage.setItem('search', JSON.stringify(searchState))
  }

  return {
    state,
    onCitySelect,
    onDistrictSelect,
    handleSubmit,
    setState,
  }
}

export default useLocationForm
