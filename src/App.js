import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [nrOfInterval, setNrOfInterval] = useState(0)
  const [intervalId, setIntervalId] = useState(undefined)
  const [size, setSize] = useState(30)
  const rule = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const [rule1, setRule1] = useState([0, 0, 1, 1, 0, 0, 0, 0, 0])
  const [rule0, setRule0] = useState([0, 0, 0, 1, 0, 0, 0, 0, 0])
  const [leftTab, setLeftTab] = useState(Array.from(Array(size), () => Array.from(Array(size))))
  const [rightTab, setRightTab] = useState(Array.from(Array(size), () => Array.from(Array(size))))

  useEffect(() => {
    setLeftTab(Array.from(Array(size), () => Array.from(Array(size))))
    setRightTab(Array.from(Array(size), () => Array.from(Array(size))))
    setNrOfInterval(0)
  }, [size])

  const handleSizeChange = (e) => {
    const { value } = e.target
    handleStop()
    setSize(Number(value))
  }

  const handleRule1 = (index) => {
    const newRule = [...rule1]
    newRule[index] === 1 ? newRule[index] = 0 : newRule[index] = 1
    setRule1(newRule)
    handleStop()
  }

  const handleRule0 = (index) => {
    const newRule = [...rule0]
    newRule[index] === 1 ? newRule[index] = 0 : newRule[index] = 1
    setRule0(newRule)
    handleStop()
  }

  const handleStart = (e) => {
    setIntervalId(setInterval(calculateLife, 1000))
  }

  const handleStop = (e) => {
    clearInterval(intervalId)
  }

  const handleReset = (e) => {
    handleStop()
    setLeftTab(Array.from(Array(size), () => Array.from(Array(size))))
    setRightTab(Array.from(Array(size), () => Array.from(Array(size))))
    setNrOfInterval(0)
  }

  const calculateLife = () => {
    setRightTab(prev => {
      const calculateTab = JSON.parse(JSON.stringify(prev))
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const cell = prev[i][j] === 1 ? 1 : 0
          let leftTopCorner = 0
          if (i - 1 >= 0 && j - 1 >= 0) {
            leftTopCorner = prev[i - 1][j - 1] === 1 ? 1 : 0
          }
          let leftBottomCorner = 0
          if (i + 1 < size && j - 1 >= 0) {
            leftBottomCorner = prev[i + 1][j - 1] === 1 ? 1 : 0
          }
          let rightTopCorner = 0
          if (i - 1 >= 0 && j + 1 < size) {
            rightTopCorner = prev[i - 1][j + 1] === 1 ? 1 : 0
          }
          let rightBottomCorner = 0
          if (i + 1 < size && j + 1 < size) {
            rightBottomCorner = prev[i + 1][j + 1] === 1 ? 1 : 0
          }
          let top = 0
          if (i - 1 >= 0) {
            top = prev[i - 1][j] === 1 ? 1 : 0
          }
          let bottom = 0
          if (i + 1 < size) {
            bottom = prev[i + 1][j] === 1 ? 1 : 0
          }
          let left = 0
          if (j - 1 >= 0) {
            left = prev[i][j - 1] === 1 ? 1 : 0
          }
          let right = 0
          if (j + 1 < size) {
            right = prev[i][j + 1] === 1 ? 1 : 0
          }
          const sum = leftTopCorner + leftBottomCorner + rightTopCorner + rightBottomCorner + top + bottom + left + right
          if (cell === 1) {
            calculateTab[i][j] = rule1[sum]
          } else {
            calculateTab[i][j] = rule0[sum]
          }
        }
      }
      setNrOfInterval(prev => prev + 1)
      return calculateTab
    });
  }

  const handleCellClick = (rowId, colId) => {
    const newTab = [...leftTab];
    newTab[rowId][colId] !== 1 ? newTab[rowId][colId] = 1 : newTab[rowId][colId] = 0;
    setLeftTab(newTab)
    setRightTab(newTab)
  }

  return (
    <div className="App flex-column">

      <div className='action-bar flex'>
        <div className='cells flex flex-column'>
          <p>ROZMIARY TABLICY</p>
          <input value={size} type="number" onChange={handleSizeChange}></input>
        </div>
        <div className='rules'>
          <p className='full'>REGUŁY WALIDACYJNE</p>
          <span className='margin-right'>L. sąsiadów</span>
          {
            rule.map((item, index) => {
              return <span
                style={{ "display": "inline-block", "width": "25px", "textAlign": "center" }}
                key={`rule ${index}`}
              >
                {item}
              </span>
            })
          }
          <span className='margin-right'>1</span>
          {
            rule1.map((item, index) => {
              return <button
                className='rule'
                key={`rule1 ${index}`}
                style={{ "backgroundColor": item === 1 ? "#27a7c0" : "white" }}
                onClick={() => handleRule1(index)}
              >
                {item}
              </button>
            })
          }
          <span className='margin-right'>0</span>
          {
            rule0.map((item, index) => {
              return <button
                className='rule'
                key={`rule0 ${index}`}
                style={{ "backgroundColor": item === 1 ? "#27a7c0" : "white" }}
                onClick={() => handleRule0(index)}
              >
                {item}
              </button>
            })
          }
        </div>
        <div className='buttons flex flex-column'>
          <p>PRZYCISKI</p>
          <p style={{ "fontSize": "1rem" }}>Iteracja = {nrOfInterval}</p>
          <div className='flex'>
            <button onClick={handleStart}>start</button>
            <button onClick={handleStop}>stop</button>
          </div>
          <button onClick={handleReset}>reset</button>
        </div>
      </div>

      <div className='content flex'>
        <div className='container' style={{ "gridTemplateColumns": `repeat(${size}, 1fr)`, "gridTemplateRows": `repeat(${size}, 1fr)` }}>
          {
            leftTab.map((row, rowId) => {
              return row.map((itemLeft, colId) => {
                return <span
                  key={`left ${rowId} ${colId}`}
                  className='cell cell-left flex'
                  onClick={() => handleCellClick(rowId, colId)}
                  style={{ "backgroundColor": itemLeft === 1 ? "#27a7c0" : "white" }}
                >
                  {itemLeft === 1 ? "1" : "0"}
                </span>
              })
            })
          }
        </div>
        <div className='container' style={{ "gridTemplateColumns": `repeat(${size}, 1fr)`, "gridTemplateRows": `repeat(${size}, 1fr)` }}>
          {
            rightTab.map((row, rowId) => {
              return row.map((itemRight, colId) => {
                return <span
                  key={`left ${rowId} ${colId}`}
                  className='cell flex'
                  style={{ "backgroundColor": itemRight === 1 ? "#40e75f" : "white" }}
                >
                  {itemRight === 1 ? "1" : "0"}
                </span>
              })
            })
          }
        </div>

      </div>

    </div>
  );
}

export default App;
