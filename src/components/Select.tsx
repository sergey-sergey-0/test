import React, {ChangeEvent} from "react";

interface Props {
    options: number[],
    onChange: (selectedOption: ChangeEvent<HTMLSelectElement>) => void,
    selectedValue: number,
}

export function Select({options, onChange, selectedValue}: Props) {
    return (
        <select value={selectedValue} onChange={onChange}>
            {
                options.map(option =>
                    <option key={option} value={option}>{option}</option>
                )
            }
        </select>
    )
}