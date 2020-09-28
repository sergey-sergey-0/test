import {RootState} from "../types";
import {createSelector} from "@reduxjs/toolkit";

export const getTable = (state: RootState) => state.tableState

export const getContent = createSelector(getTable, table => table.data.content)
export const getPagination = createSelector(getTable, table => table.pagination)
export const getRowOrder = createSelector(getTable, table => table.rowOrder)
export const getHeaders = createSelector(getTable, table => table.headers)
export const getSortInfo = createSelector(getTable, table => table.sortInfo)
export const getDrag = createSelector(getTable, table => table.drag)
export const getDragColumn = createSelector(getDrag, drag => drag.source)
export const getDragActive = createSelector(getDrag, drag => drag.active)
