import React from 'react'
import { useDispatch } from 'react-redux';
import { changeRule0, changeRule1 } from '../../../core/store/rules/RulesSlice';

export default function Rules(props) {

    const { rule1, rule0, handleStop } = props;
    const rule = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    const dispatch = useDispatch();

    const handleRule1 = (index) => {
        dispatch(changeRule1(index))
        handleStop()
    }
    
    const handleRule0 = (index) => {
        dispatch(changeRule0(index))
        handleStop()
    }

    return (
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
    )
}
