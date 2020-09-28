import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TableContent, TableData, TableState} from "../types";
import {Sort} from "../utils/enums";
import {DefaultPageSize} from "../constants/table";

export const initialState: TableState = {
    loaded: false,
    headers: [],
    rowOrder: [],
    data: {} as TableData,
    pagination: {
        page: 0,
        pageSize: DefaultPageSize,
    },
    sortInfo: {
        sortDirection: Sort.DEFAULT,
        sortColumn: '',
    },
    drag: {
        active: false,
        source: 0,
        target: 0,
        width: 0,
        pos: {
            x: 0,
            y: 0,
        },
    }
}

interface MoveColumn {
    source: number,
    target: number,
}

interface DragStart {
    source: number,
    width: number,
    x: number,
    y: number,
}

interface DragMove {
    x: number,
    y: number,
}


const tableSlice = createSlice({
    name: 'Table',
    initialState: initialState,
    reducers: {
        sortByColumn: (state: TableState, {payload: columnIndex}: PayloadAction<number>) => {
            let field = state.headers[columnIndex] as keyof TableContent
            state.sortInfo.sortColumn = field
            let cmp: (a: number, b: number) => number;
            if (typeof state.data.content[0][field] === 'number') {
                cmp = (ai: number, bi: number) => {
                    let a = state.data.content[ai][field]
                    let b = state.data.content[bi][field]
                    if (a === b) {
                        return 0;
                    } else {
                        return (a < b) ? -1 : 1;
                    }
                }
            } else {
                cmp = (ai: number, bi: number) => {
                    let a = (state.data.content[ai][field] as string).toLowerCase()
                    let b = (state.data.content[bi][field] as string).toLowerCase()
                    if (a === b) {
                        return 0;
                    } else {
                        return (a < b) ? -1 : 1;
                    }
                }
            }
            if (state.sortInfo.sortDirection === Sort.DEFAULT || state.sortInfo.sortColumn !== field) {
                state.rowOrder.sort(cmp)
                state.sortInfo.sortDirection = Sort.ASC
            } else if (state.sortInfo.sortDirection === Sort.ASC) {
                state.rowOrder.sort(cmp).reverse()
                state.sortInfo.sortDirection = Sort.DESC
            } else {
                state.rowOrder.sort()
                state.sortInfo.sortDirection = Sort.DEFAULT
            }
        },
        changePage: (state: TableState, {payload: page}: PayloadAction<number>) => {
            state.pagination.page = page
        },
        changePageSize: (state: TableState, {payload: size}: PayloadAction<number>) => {
            if (state.pagination.page * size >= state.rowOrder.length) {
                state.pagination.page = Math.ceil(state.rowOrder.length / size) - 1
            }
            state.pagination.pageSize = size
        },
        dragStart: (state: TableState, {payload: {source, width, x, y}}: PayloadAction<DragStart>) => {
            state.drag.pos.x = x
            state.drag.pos.y = y
            state.drag.source = source
            state.drag.target = source
            state.drag.width = width
            state.drag.active = true
        },
        dragMove: (state: TableState, {payload: {x: dx, y: dy}}: PayloadAction<DragMove>) => {
            state.drag.pos.x += dx
            state.drag.pos.y += dy
        },
        dragCommit: (state: TableState) => {
            state.drag.active = false
        },
        dragNewTarget: (state: TableState, {payload: column}: PayloadAction<number>) => {
            const temp = state.headers.splice(state.drag.source, 1)[0]
            state.headers.splice(column, 0, temp)

            state.drag.target = column
            state.drag.source = column
        },

        load: (state: TableState, {payload}: PayloadAction<TableData>) => {
            state.data = payload
            state.loaded = true
            state.rowOrder = Array.from(payload.content.keys())
            state.headers = Object.keys(payload.content[0])
        }
    }
})

export const {
    sortByColumn,
    changePage,
    changePageSize,
    dragStart,
    dragMove,
    dragCommit,
    dragNewTarget,
    load,
} = tableSlice.actions

export default tableSlice.reducer
