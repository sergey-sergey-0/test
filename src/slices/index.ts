import {combineReducers, Reducer} from 'redux'
import tableReducer from './table'
import {RootState} from "../types";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    tableState: tableReducer,
})

export default rootReducer