import React, {CSSProperties} from "react";
import {useSelector} from "react-redux";
import {getContent, getDragActive, getDragColumn, getHeaders, getPagination, getRowOrder} from "../selectors";
import { TableContent} from "../types";
import './Table.css'
import {TablePagination} from "./TablePagination";
import {HeadersCell} from "./HeadersCell";
import {MovableColumn} from "./MovableColumn";

export function Table() {
    const {
        page,
        pageSize,
    } = useSelector(getPagination)
    const rowOrder = useSelector(getRowOrder)
    const headers = useSelector(getHeaders)
    const content = useSelector(getContent)
    const dragColumn = useSelector(getDragColumn)
    const dragActive = useSelector(getDragActive)

    const hidden: CSSProperties = {
        visibility: "hidden",
    }
    const getHidden = (i: number) => dragActive && i === dragColumn ? hidden : undefined

    return (
        <div>
            <TablePagination/>
            <table className="Table">
                <thead>
                <tr>
                    {
                        headers.map((header, i) =>
                            <HeadersCell key={i} column={header} style={getHidden(i)}/>
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {
                    rowOrder.slice(page * pageSize, page * pageSize + pageSize)
                        .map(row =>
                            <tr key={row}>
                                {
                                    headers.map((column, i) =>
                                        <td key={i} style={getHidden(i)}>
                                            {content[row][column as keyof TableContent]}
                                        </td>
                                    )
                                }
                            </tr>
                        )
                }
                </tbody>
            </table>
            {dragActive &&
            <MovableColumn column={headers[dragColumn]}/>
            }
        </div>
    )
}