import {
  REQUEST_REPOS,
  SET_DATA,
  SET_ALERT,
  SET_LOADING,
  SET_COMPANY,
} from './types'
import { Repository } from './reposReducer'

export const showLoader = () => {
  return {
    type: SET_LOADING,
    payload: true,
  }
}

export const hideLoader = () => {
  return {
    type: SET_LOADING,
    payload: false,
  }
}

export const setCompany = (company: string) => {
  return {
    type: SET_COMPANY,
    payload: company,
  }
}

export const reqRepos = (company: string) => {
  return {
    type: REQUEST_REPOS,
    payload: company,
  }
}

export const setData = (data: Array<Repository>) => {
  return {
    type: SET_DATA,
    payload: data,
  }
}

export const setAlert = (alert: string | null) => {
  return {
    type: SET_ALERT,
    payload: alert,
  }
}
