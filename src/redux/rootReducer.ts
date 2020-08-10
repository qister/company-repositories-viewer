import { appReducer } from './appReducer'
import { repositoryReducer } from './reposReducer'
import { combineReducers } from 'redux'
import { State as CompanyState } from './reposReducer'
import { State as AppState } from './appReducer'

export type RootState = {
  company: CompanyState
  app: AppState
}

export const rootReducer = combineReducers({
  company: repositoryReducer,
  app: appReducer,
})
