import { REQUEST_REPOS } from './types'
import { takeEvery, put, call, delay } from 'redux-saga/effects'
import { showLoader, hideLoader, setData, setAlert } from './actions'
import axios from 'axios'

export function* sagaWatcher() {
  yield takeEvery(REQUEST_REPOS, sagaWorker)
}

type Action = {
  type: 'REQUEST_REPOS'
  payload: string
}

function* sagaWorker(action: Action) {
  yield put(showLoader())
  try {
    // const payload = yield call(fetchCompany.bind(null, action.payload))
    const payload = yield call(fetchCompany, action.payload)
    yield put(setData(payload.data))
  } catch (e) {
    yield put(setAlert(e.message))
  } finally {
    yield delay(2500)
    yield put(hideLoader())
  }
}

async function fetchCompany(companyName: string) {
  const instance = axios.create({
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  })
  return await instance.get(`https://api.github.com/orgs/${companyName.toLowerCase()}/repos`)
}
