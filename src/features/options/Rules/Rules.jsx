import React from 'react'
import './Rules.style.scss';
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
        <div className='rules form'>
            <span>REGUŁY WALIDACYJNE</span>
            <div className='grid-2'>
                <span>Liczba sąsiadów</span>
                <div className='grid grid-9'>
                    {
                        rule.map((item, index) => {
                            return <span key={`rule ${index}`}>{item}</span>
                        })
                    }
                </div>
                <span className='center'>1</span>
                <div className='grid grid-9'>
                    {
                        rule1.map((item, index) => {
                            return <button
                                className='btn'
                                key={`rule1 ${index}`}
                                style={{ "backgroundColor": item === 1 ? "#27a7c0" : "white" }}
                                onClick={() => handleRule1(index)}
                            >
                                {item}
                            </button>
                        })
                    }
                </div>
                <span className='center'>0</span>
                <div className='grid grid-9'>
                    {
                        rule0.map((item, index) => {
                            return <button
                                className='btn'
                                key={`rule0 ${index}`}
                                style={{ "backgroundColor": item === 1 ? "#27a7c0" : "white" }}
                                onClick={() => handleRule0(index)}
                            >
                                {item}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
