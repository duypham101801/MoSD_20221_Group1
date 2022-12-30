import { useContext, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router";
import { SearchContext } from "../../context/SearchContext";
import { ModalContext } from "../../context/ModalContext";
import { getProvinceList, getDistrictList } from "../../services/search";

async function fetchProvince() {
  try {
    const res = await getProvinceList();
    const provinces = res.provinces.map((provinceName) => ({
      value: provinceName,
      label: provinceName,
    }));
    return provinces;
  } catch (e) {
    console.log(e);
    return [];
  }
}
async function fetchDistrict(provinceName) {
  try {
    const res = await getDistrictList(provinceName);
    const districts = [
      {
        value: "Tất cả",
        label: "Tất cả",
      },
    ];
    districts.push();
    res.districts.forEach((districtName) =>
      districts.push({
        value: districtName,
        label: districtName,
      })
    );

    return districts;
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function fetchInitialData() {
  // const { cityId, districtId } = (await axios.get(PATHS.LOCATION)).data;
  const [cities, districts] = await Promise.all([
    fetchProvince(),
    fetchDistrict("Tỉnh Hòa Bình"),
  ]);

  return {
    cityOptions: cities,
    districtOptions: districts,
    numberPeople: peopleOptions,
    selectedCity: cities.find(({ label }) => label === "Tỉnh Hòa Bình"),
    selectedDistrict: districts.find(
      ({ label }) => label === "Thành phố Hòa Bình"
    ),
    selectedPeople: peopleOptions.find(({ label }) => label === "1-5 người"),
    // selectedDistrict: districts.find(({ label }) => label === "Kỳ Sơn"),
  };
}
async function fetchInitData(searchState) {
  // const { cityId, districtId } = (await axios.get(PATHS.LOCATION)).data;
  const [cities, districts] = await Promise.all([
    fetchProvince(),
    fetchDistrict(searchState.provinceName),
  ]);

  return {
    cityOptions: cities,
    districtOptions: districts,
    numberPeople: peopleOptions,
    selectedCity: cities.find(
      ({ label }) => label === searchState.provinceName
    ),
    selectedDistrict: districts.find(
      ({ label }) => label === searchState.districtName
    ),
    selectedPeople: peopleOptions.find(
      ({ label }) => label === searchState.capacity
    ),
  };
}

function useLocationForm(shouldFetchInitialLocation) {
  const isMatchPath = useMatch("/area");
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const [state, setState] = useState({
    cityOptions: [],
    districtOptions: [],
    selectedCity: null,
    selectedDistrict: null,
    selectedPeople: null,
    numberPeople: [],
  });
  const { selectedCity, selectedDistrict, selectedPeople } = state;
  // console.log("LOCA:"+JSON.stringify(searchState))
  useEffect(() => {
    const searchStatus = JSON.parse(localStorage.getItem("search"));
    (async function () {
      // neu co searchStatE
      if (!searchStatus) {
        const initialData = await fetchInitialData();
        setState(initialData);
      } else {
        dispatch({ type: "NEW_SEARCH", payload: searchStatus });
        const initialData = await fetchInitData(searchStatus);
        setState(initialData);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (!selectedCity) return;
      const options = await fetchDistrict(selectedCity.value);
      setState((prevState) => {
        return { ...prevState, districtOptions: options };
      });
    })();
  }, [selectedCity]);

  function onCitySelect(option) {
    if (option !== selectedCity) {
      setState({
        ...state,
        districtOptions: [],
        selectedCity: option,
        selectedDistrict: null,
      });
    }
  }

  function onPeopleSelect(option) {
    setState({
      ...state,
      selectedPeople: option,
    });
  }

  function onDistrictSelect(option) {
    setState({
      ...state,
      selectedDistrict: option,
    });
  }

  const { modalDispatch } = useContext(ModalContext);

  function handleSubmit(e) {
    e.preventDefault();
    const searchState = {};

    searchState.provinceName = state.selectedCity.label;

    if (state.selectedDistrict) {
      // Todo : revert if error
      // searchState.districtName = state.selectedDistrict.value;
      searchState.districtName = state.selectedDistrict.label;
    }

    if (state.selectedPeople) {
      searchState.areaOccupancy = state.selectedPeople.value; // 5
      searchState.minCapacity = state.selectedPeople.minCapacity;
      searchState.maxCapacity = state.selectedPeople.maxCapacity;
      searchState.capacity = state.selectedPeople.label; // 1-5 nguoi
    }

    dispatch({ type: "NEW_SEARCH", payload: searchState });
    if (!isMatchPath) {
      navigate("/area");
    }
    localStorage.setItem("search", JSON.stringify(searchState));

    modalDispatch({ type: "closeModal" });
  }

  return {
    state,
    onCitySelect,
    onDistrictSelect,
    onPeopleSelect,
    handleSubmit,
  };
}

export default useLocationForm;
const peopleOptions = [
  { value: "5", label: "1-5 người", minCapacity: 1, maxCapacity: 5 },
  { value: "25", label: "5-25 người", minCapacity: 5, maxCapacity: 25 },
  { value: "50", label: "25-50 người", minCapacity: 25, maxCapacity: 50 },
  { value: "100", label: "50-100 người", minCapacity: 50, maxCapacity: 100 },
  { value: "101", label: "Trên 100 người", minCapacity: 100, maxCapacity: 100 },
];
