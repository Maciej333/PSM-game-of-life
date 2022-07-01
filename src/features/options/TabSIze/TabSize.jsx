import React from 'react';

export default function TabSize(props) {

    const { size, handleSizeChange } = props;

    return (
        <div className='form'>
            <label htmlFor='size'>ROZMIARY TABLICY</label>
            <input id="size" name="size" type="number" value={size} onChange={handleSizeChange} />
        </div>
    )
}
