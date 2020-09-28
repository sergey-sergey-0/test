import {TableDataSources} from "../utils/enums";
import React, {useState} from "react";
import {FileDataLoader} from "./FileDataLoader";
import {DefaultDataLoader} from "./DefaultDataLoader";
import {URLDataLoader} from "./URLDataLoader";
import './TableDataLoader.css'
import {objectKeys} from "../utils/helpers";

export function TableDataLoader() {
    const [tab, setTab] = useState(TableDataSources.DEFAULT)

    const chooseImport = (source: TableDataSources) => () => setTab(source)

    const selectedStyle = (t: TableDataSources) => t === tab ? {textDecoration: "underline"} : undefined

    const tabs = {
        [TableDataSources.DEFAULT]: {
            title: 'Use default',
            panel: <DefaultDataLoader/>,
        },
        [TableDataSources.FILE]: {
            title: 'From file',
            panel: <FileDataLoader/>,
        },
        [TableDataSources.URL]: {
            title: 'From url',
            panel: <URLDataLoader/>,
        },
    }

    return (
        <div className="Tabs">
            <div className="TabNames">
                {
                    objectKeys(tabs).map(key =>
                        <span key={key} className="TabTitle" style={selectedStyle(key)} onClick={chooseImport(key)}>
                            {tabs[key].title}
                        </span>
                    )
                }
            </div>
            <div className="TabPanel">
                {tabs[tab].panel}
            </div>
        </div>
    )
}