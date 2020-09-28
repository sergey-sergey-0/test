import React from 'react';
import {TableDataLoader} from "./TableDataLoader";
import {useSelector} from "react-redux";
import {Table} from "./Table";
import {RootState} from "../types";
import './App.css'

function App() {
    const loaded = useSelector((state: RootState) => state.tableState.loaded)

    return (
        <div className="App">
            {loaded
                ? <Table/>
                : <TableDataLoader/>
            }
        </div>
    );
}

export default App;
