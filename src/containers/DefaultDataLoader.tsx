import React from "react";
import defaultData from "../resources/defaultTableData.json"
import {useDispatch} from "react-redux";
import {load} from "../slices/table";


export function DefaultDataLoader() {
    const dispatch = useDispatch()

    const onClick = () => dispatch(load(defaultData))
    return (
        <>
            <button onClick={onClick}>Load</button>
        </>
    )
}