const initialState = {
  breeds: [],
  allBreeds: [],
  temperaments: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        detail: [],
      };

    case "GET_BREEDS":
      return {
        ...state,
        breeds: action.payload,
        allBreeds: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "GET_NAME_BREEDS":
      return {
        ...state,
        breeds: action.payload,
      };

    case "POST_BREED":
      return {
        ...state,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "FILTER_BY_TEMPERAMENT":
      const allBreeds = state.allBreeds;
      const temperamentFiltered =
        action.payload === "all"
          ? allBreeds
          : allBreeds.filter((e) => {
              if (typeof e.temperaments === "string")
                return e.temperaments.includes(action.payload);
              if (Array.isArray(e.temperaments)) {
                let temps = e.temperaments.map((e) => e.name);
                return temps.includes(action.payload);
              }
              return true;
            });
      return {
        ...state,
        breeds: temperamentFiltered,
      };

    case "SORT_BY_WEIGHT":
      const sortedWeight =
        action.payload === "min_weight"
          ? state.breeds.sort(function (a, b) {
              return a.weight_min - b.weight_min;
            })
          : state.breeds.sort(function (a, b) {
              return b.weight_max - a.weight_max;
            });
      return {
        ...state,
        breeds: sortedWeight,
      };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allBreeds.filter((e) => e.createdInDb)
          : state.allBreeds.filter((e) => !e.createdInDb);
      return {
        ...state,
        breeds: action.payload === "all" ? state.allBreeds : createdFilter,
      };

    case "SORT_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.breeds.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.breeds.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        breeds: sortedArr,
      };

    default:
      return state;
  }
}

export default rootReducer;
