import React, {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPagination, getRowOrder} from "../selectors";
import {changePage, changePageSize} from "../slices/table";
import {Select} from "../components/Select";
import {PageSizes} from "../constants/table";
import './TablePagination.css'

export function TablePagination() {
    const {
        page,
        pageSize
    } = useSelector(getPagination)
    const rowOrder = useSelector(getRowOrder)


    const dispatch = useDispatch()
    const prevPage = () => dispatch(changePage(page - 1))
    const nextPage = () => dispatch(changePage(page + 1))

    const onPageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(changePageSize(Number(e.target.value)))

    const isFirstPage = page === 0
    const isLastPage = page * pageSize + pageSize >= rowOrder.length

    return (
        <div className="Pagination">
            <button onClick={prevPage} style={isFirstPage ? {visibility: 'hidden'} : undefined}>Prev Page</button>
            <span>{page + 1}</span>
            <button onClick={nextPage} style={isLastPage ? {visibility: 'hidden'} : undefined}>Next Page</button>
            <Select options={PageSizes} onChange={onPageSizeChange} selectedValue={pageSize}/>
        </div>
    )
}