import { SET_LOADING, SET_ALERT } from './types'

export type State = {
  loading: boolean
  alert: string | null
}

const initialState = {
  loading: false,
  alert: null,
}

export type Action =
  | {
      type: 'SET_LOADING'
      payload: boolean
    }
  | {
      type: 'SET_ALERT'
      payload: string | null
    }

export const appReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload }
    case SET_ALERT:
      return { ...state, alert: action.payload }
    default:
      return state
  }
}
