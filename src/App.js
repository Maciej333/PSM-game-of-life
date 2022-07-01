import './App.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import View from './features/view/View';
import TabSize from './features/options/TabSIze/TabSize';
import Rules from './features/options/Rules/Rules';
import Buttons from './features/options/Buttons/Buttons';
import { addCount, resetCount, selectInterval } from './core/store/interval/IntervalSlice';
import { selectRules } from './core/store/rules/RulesSlice';

function App() {

  const [size, setSize] = useState(30)
  const [leftTab, setLeftTab] = useState(Array.from(Array(size), () => Array.from(Array(size))))
  const [rightTab, setRightTab] = useState(Array.from(Array(size), () => Array.from(Array(size))))

  const dispatch = useDispatch();
  const interval = useSelector(selectInterval);
  const { rule1, rule0 } = useSelector(selectRules);

  useEffect(() => {
    setTabs(Array.from(Array(size), () => Array.from(Array(size))))
    dispatch(resetCount());
  }, [size])

  const handleSizeChange = (e) => {
    const { value } = e.target
    handleStop()
    setSize(Number(value))
  }
  const setTabs = (newTab) => {
    setLeftTab(newTab);
    setRightTab(newTab);
  }

  const handleStop = () => {
    clearInterval(interval.intervalId)
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
      return calculateTab;
    });
    dispatch(addCount());
  }

  return (
    <div className="App flex-column">
      <div className='action-bar flex'>
        <TabSize size={size} handleSizeChange={handleSizeChange} />
        <Rules rule1={rule1} rule0={rule0} handleStop={handleStop} />
        <Buttons size={size} setTabs={setTabs} calculateLife={calculateLife} handleStop={handleStop} />
      </div>

      <div className='content flex'>
        <View size={size} tab={leftTab} idDraw={true} setTabs={setTabs} />
        <View size={size} tab={rightTab} idDraw={false} />
      </div>
    </div>
  );
}

export default App;
