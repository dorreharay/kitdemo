import {call, put, takeEvery} from 'redux-saga/effects';

async function fetchData() {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=40,776676&lon=-73,971321&appid=0655fdf7d2f23df38b292278f1f98ba1',
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('error - getWeatherData', error);
    return null;
  }
}

function* getWeatherData() {
  try {
    const data = yield call(fetchData);
    yield put({type: 'WEATHER_FETCH_SUCCEEDED', payload: data});
  } catch (e: any) {
    yield put({type: 'WEATHER_FETCH_FAILED', payload: {message: e?.message}});
  }
}
function* rootSaga() {
  yield takeEvery('FETCH_WEATHER_DATA', getWeatherData);
}

export default rootSaga;
