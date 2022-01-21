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

export function getTemperaments() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

export function getNameBreeds(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: "GET_NAME_BREEDS",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function sortByName(payload) {
  return {
    type: "SORT_BY_NAME",
    payload,
  };
}

export function filterBreedsByTemperament(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
}

export function sortByWeight(payload) {
  return {
    type: "SORT_BY_WEIGHT",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function postBreed(payload) {
  return async function () {
    const res = await axios.post("http://localhost:3001/dog", payload);
    return res;
  };
}

// Async Await:
export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

// Promise:
// export function getDetail(id){
//     return function (dispatch){
//         let json = axios.get('http://localhost:3001/dogs/' + id)
//             .then(res => res.data)
//             .catch(err => console.log(err));
//         return dispatch({
//             type: "GET_DETAIL",
//             payload: json,
//         })
//     }
// }

export function resetState() {
  return {
    type: "RESET",
  };
}
