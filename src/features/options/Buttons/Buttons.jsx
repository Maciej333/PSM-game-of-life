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
        <div className='form'>
            <span>PRZYCISKI</span>
            <span className='interval-nr'>Iteracja = {nrOfInterval}</span>
            <div className='flex'>
                <button className='btn' onClick={handleStart}>start</button>
                <button className='btn' onClick={handleStop}>stop</button>
                <button className='btn' onClick={handleReset}>reset</button>
            </div>
        </div>
    )
}
