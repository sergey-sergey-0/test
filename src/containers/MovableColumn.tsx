import React, {CSSProperties, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {HeadersCell} from "./HeadersCell";
import {dragMove, dragCommit} from "../slices/table";
import {getTable} from "../selectors";
import {TableContent} from "../types";

interface Props {
    column: string,
}

export function MovableColumn({column}: Props) {
    const {
        data: {
            content
        },
        pagination: {
            page,
            pageSize
        },
        drag,
    } = useSelector(getTable)

    const dispatch = useDispatch()

    const columnCells = content
        .map(row => row[column as keyof TableContent])
        .slice(page * pageSize, page * pageSize + pageSize)

    const style: CSSProperties = {
        position: "absolute",
        left: drag.pos.x,
        top: drag.pos.y,
        background: "white",
    }

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => dispatch(dragMove({x: e.movementX, y: e.movementY}))
        const mouseUp = () => dispatch(dragCommit())
        window.addEventListener<"mousemove">("mousemove", mouseMove)
        window.addEventListener<"mouseup">("mouseup", mouseUp)
        return () => {
            window.removeEventListener<"mousemove">("mousemove", mouseMove)
            window.removeEventListener<"mouseup">("mouseup", mouseUp)
        }
    }, [dispatch])


    return (
        <table style={style}>
            <thead>
            <tr>
                <HeadersCell column={column}/>
            </tr>
            </thead>
            <tbody>
            {
                columnCells.map((cell, row) =>
                    <tr key={row}>
                        <td>
                            {cell}
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}