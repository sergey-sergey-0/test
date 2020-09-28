import {Sort} from "../utils/enums";

export interface Position {
    x: number,
    y: number,
}

export interface TableState {
    loaded: boolean,
    rowOrder: number[],
    headers: string[],
    data: TableData,
    pagination: {
        page: number,
        pageSize: number,
    },
    sortInfo: {
        sortDirection: Sort,
        sortColumn: string,
    }
    drag: {
        active: boolean,
        source: number,
        target: number,
        width: number,
        pos: Position,
    }

}

export interface RootState {
    tableState: TableState
}

export interface TableData {
    content: TableContent[],
    offset: number,
    limit: number,
    first: boolean,
    last: boolean,
    total: number,
}

export interface TableContent {
    revision: number,
    revstmp: string,
    user_id: number,
    user_email: string,
    user_name: string,
    well_id: string,
    well_name: string,
    well_type: string,
    changes_summary: string,
}
