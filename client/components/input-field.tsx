import React from "react";

interface Props {
    label: string;
    onChange: (value: string) => void;
    value?: string | number;
}

export function InputField({ label, onChange, value }: Props) {
    function onchange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value);
    }

    return (
        <label>
            <span style={ { width: "100px", display: "inline-block" } }>
                { label }:
            </span>
            <input type="text" value={ value } onChange={ onchange }/>
        </label>
    )
}
