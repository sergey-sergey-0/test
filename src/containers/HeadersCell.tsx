import React, {CSSProperties, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sortByColumn, dragStart, dragNewTarget} from "../slices/table";
import {getDrag, getHeaders, getSortInfo} from "../selectors";
import {Sort} from "../utils/enums";

interface Props {
    column: string,
    style?: CSSProperties,
}

export function HeadersCell({column, style}: Props) {
    const sortIcons = {[Sort.ASC]: '\u2193', [Sort.DESC]: '\u2191', [Sort.DEFAULT]: ''}

    const headers = useSelector(getHeaders)
    const drag = useSelector(getDrag)
    const sortInfo = useSelector(getSortInfo)

    const index = headers.indexOf(column)

    const dispatch = useDispatch()
    const sort = () => dispatch(sortByColumn(index))
    const stop = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation()
    const startDrag = (event: React.MouseEvent) => {
        const rect = event.currentTarget!.getBoundingClientRect()
        const initX = rect.x + window.scrollX
        const initY = rect.y + window.scrollY
        dispatch(dragStart({source: index, width: rect.width, x: initX, y: initY}))
    }

    const ref = useRef<HTMLTableHeaderCellElement>(null)

    useEffect(() => {
        if (drag.active && drag.target !== index && ref.current !== null) {
            const rect = ref.current.getBoundingClientRect()
            const x = rect.x + window.scrollX
            const selfCenter = x + rect.width / 2
            const triggerWidth = Math.min(rect.width / 2, drag.width / 2)
            const leftTrigger = selfCenter - triggerWidth
            const rightTrigger = selfCenter + triggerWidth
            const dragCenter = drag.pos.x + drag.width / 2

            if (leftTrigger < dragCenter && dragCenter < rightTrigger) {
                dispatch(dragNewTarget(index))
            }
        }
    })

    return (
        <th ref={ref} style={style} onMouseDown={startDrag}>
            {column}
            <button onClick={sort} onMouseDown={stop}>
                Sort {sortInfo.sortColumn === column && sortIcons[sortInfo.sortDirection]}
            </button>
        </th>
    )
}