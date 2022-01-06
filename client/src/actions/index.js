import axios from "axios";

export function getBreeds() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_BREEDS",
      payload: json.data,
    });
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function filterBreedsByBreed(payload) {
  return {
    type: "FILTER_BY_STATUS",
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
