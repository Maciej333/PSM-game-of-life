import React, { useEffect, useState } from 'react'
import './view.style.scss';

export default function View(props) {

    const { name, size, tab, isDraw, setTabs } = props;

    const [length, setLength] = useState(20);

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize();
    }, [])

    const handleResize = () => {
        setLength(Math.floor(window.innerWidth / (1.25 * size)));
    }

    const handleCellClick = (rowId, colId) => {
        if (isDraw) {
            const newTab = [...tab];
            newTab[rowId][colId] !== 1 ? newTab[rowId][colId] = 1 : newTab[rowId][colId] = 0;
            setTabs(newTab);
        }
    }

    return (
        <div>
            <h3 className='view-name'>{name}</h3>
            <div className='view' style={{ "gridTemplateColumns": `repeat(${size}, 1fr)`, "gridTemplateRows": `repeat(${size}, 1fr)` }}>
                {
                    tab.map((row, rowId) => {
                        return row.map((itemLeft, colId) => {
                            return <span
                                key={`left ${rowId} ${colId}`}
                                className='cell'
                                onClick={() => handleCellClick(rowId, colId)}
                                style={{
                                    "backgroundColor": itemLeft === 1 ? (isDraw ? "#27a7c0" : "#000000") : "white",
                                    "width": length + "px", "height": length + "px"
                                }}
                            >
                                {itemLeft === 1 ? "1" : "0"}
                            </span>
                        })
                    })
                }
            </div>
        </div>
    )
}
