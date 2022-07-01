import React from 'react'

export default function View(props) {

    const { size, tab, idDraw, setTabs } = props;

    const handleCellClick = (rowId, colId) => {
        if (idDraw) {
            const newTab = [...tab];
            newTab[rowId][colId] !== 1 ? newTab[rowId][colId] = 1 : newTab[rowId][colId] = 0;
            setTabs(newTab);
        }
    }

    return (
        <div className='container' style={{ "gridTemplateColumns": `repeat(${size}, 1fr)`, "gridTemplateRows": `repeat(${size}, 1fr)` }}>
            {
                tab.map((row, rowId) => {
                    return row.map((itemLeft, colId) => {
                        return <span
                            key={`left ${rowId} ${colId}`}
                            className='cell cell-left flex'
                            onClick={() => handleCellClick(rowId, colId)}
                            style={{ "backgroundColor": itemLeft === 1 ? (idDraw ? "#27a7c0" : "#000000") : "white" }}
                        >
                            {itemLeft === 1 ? "1" : "0"}
                        </span>
                    })
                })
            }
        </div>
    )
}
