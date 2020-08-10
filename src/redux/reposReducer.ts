import { SET_DATA, SET_COMPANY } from './types'

export type Repository = {
  html_url: string
  name: string
  forks_count: number
  watchers_count: number
  stargazers_count: number
}

export type State = {
  name: string
  repositoriesList: Array<Repository>
}

const initialState: State = {
  name: '',
  repositoriesList: [],
}

export type Action =
  | {
      type: 'SET_DATA'
      payload: Array<Repository>
    }
  | {
      type: 'SET_COMPANY'
      payload: string
    }

export const repositoryReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case SET_COMPANY:
      return {
        ...state,
        name: action.payload.toLowerCase(),
      }
    case SET_DATA:
      return {
        ...state,
        repositoriesList: action.payload.map((item) => {
          return {
            html_url: item.html_url,
            name: item.name,
            forks_count: item.forks_count,
            watchers_count: item.watchers_count,
            stargazers_count: item.stargazers_count,
          }
        }),
      }
    default:
      return state
  }
}
