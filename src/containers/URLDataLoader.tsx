import React, {useState} from "react";
import axios from 'axios';
import {load} from "../slices/table";
import {useDispatch} from "react-redux";

export function URLDataLoader() {
    const dispatch = useDispatch()

    const [url, setUrl] = useState('')
    const [error, setError] = useState(null)


    const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)
    const onLoad = () => {
        axios.get(url)
            .then(response => dispatch(load(response.data)))
            .catch(err => setError(err.toString()))
    }

    return (
        <>
            <input type="text" value={url} onChange={onUrlChange}/>
            <button onClick={onLoad}>Load</button>
            <div>Example url: {window.location.href + 'tableData.json'}</div>
            {error !== null &&
            <div>{error}</div>
            }
        </>
    )
}