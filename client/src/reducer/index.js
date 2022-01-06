const initialState = {
  breeds: [],
  allBreeds: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BREEDS":
      return {
        ...state,
        breeds: action.payload,
        allBreeds: action.payload,
      };

    case "FILTER_BY_STATUS":
      const allBreeds = state.allBreeds;
      const statusFiltered =
        action.payload === "all"
          ? allBreeds
          : allBreeds.filter((e) => e.status === action.payload);
      return {
        ...state,
        breeds: statusFiltered,
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

    case "ORDER_BY_NAME":
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
