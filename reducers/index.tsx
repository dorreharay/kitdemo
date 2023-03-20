const initialState = {
  weatherData: null,
  weatherError: null,
  selectedDay: null,
};

const ACTION_HANDLERS = {
  WEATHER_FETCH_SUCCEEDED: (state: any, action: {payload: any}) => {
    return {...state, weatherData: action.payload};
  },
  WEATHER_FETCH_FAILED: (state: any, action: {payload: any}) => {
    return {...state, weatherError: action.payload.message};
  },
  SET_SELECTED_DAY: (state: any, action: {payload: any}) => {
    return {...state, selectedDay: action.payload};
  },
};

export default function (
  state = initialState,
  action: {type: string | number},
) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
