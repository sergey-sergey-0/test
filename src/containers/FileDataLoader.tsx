import React, {useRef, useState} from "react";
import {readFile} from "../utils/readFile";
import {useDispatch} from "react-redux";
import {load} from "../slices/table";

export function FileDataLoader() {
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    const ref = useRef<HTMLInputElement>(null)
    const onClick = () => {
        if (ref.current?.files?.item(0)) {
            readFile(ref.current.files[0])
                .then(rawData => JSON.parse(rawData))
                .then(data => dispatch(load(data)))
                .catch(err => setError(err.toString()))
        }
    }

    return (
        <>
            <input type="file" ref={ref}/>
            <button onClick={onClick}>Load</button>
            <div>You can download example file from: <a href="tableData.json" download>here</a></div>
            {error !== null &&
            <div>{error}</div>
            }
        </>
    )
}