import React from 'react'

export default function TabSize(props) {

    const { size, handleSizeChange } = props;

    return (
        <div className='cells flex flex-column'>
            <p>ROZMIARY TABLICY</p>
            <input value={size} type="number" onChange={handleSizeChange}></input>
        </div>
    )
}
