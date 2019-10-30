import { put, takeLatest } from 'redux-saga/effects'
import { WEATHER_FETCH_FAILED, WEATHER_FETCH_REQUESTED, WEATHER_FETCH_SUCCEEDED } from './index';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22


function* fetchWeather(action: any) {
    try {
        const data = yield fetch('http://www.mocky.io/v2/5db99a1a3000003f765ee49e',
            { headers: new Headers({ 'Access-Control-Allow-Origin': 'Access-Control-Allow-Origin' }) });
        const jsonData = yield data.json();
        yield put({ type: WEATHER_FETCH_SUCCEEDED, data: jsonData, });
    } catch (e) {
        yield put({ type: WEATHER_FETCH_FAILED, message: e.message });
    }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
    yield takeLatest(WEATHER_FETCH_REQUESTED, fetchWeather);
}

export default mySaga;