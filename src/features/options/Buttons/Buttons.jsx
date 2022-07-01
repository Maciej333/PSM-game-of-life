import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCount, selectInterval, setIntervalId } from '../../../core/store/interval/IntervalSlice';

export default function Buttons(props) {

    const { size, setTabs, calculateLife, handleStop } = props;
    const dispatch = useDispatch();
    const nrOfInterval = useSelector(selectInterval).count;

    const handleStart = () => {
        dispatch(setIntervalId(setInterval(calculateLife, 1000)))
    }

    const handleReset = () => {
        handleStop()
        setTabs(Array.from(Array(size), () => Array.from(Array(size))));
        dispatch(resetCount());
    }

    return (
        <div className='buttons flex flex-column'>
            <p>PRZYCISKI</p>
            <p style={{ "fontSize": "1rem" }}>Iteracja = {nrOfInterval}</p>
            <div className='flex'>
                <button onClick={handleStart}>start</button>
                <button onClick={handleStop}>stop</button>
            </div>
            <button onClick={handleReset}>reset</button>
        </div>
    )
}
