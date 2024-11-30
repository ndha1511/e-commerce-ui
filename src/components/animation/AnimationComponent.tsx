// src/components/AnimationComponent.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './animation-component.scss';
import { RootState } from '../../rtk/store/store';
import { setTriggerA, setTriggerB } from '../../rtk/slice/loading-slice';

const AnimationComponent: React.FC = () => {
    const dispatch = useDispatch();
    const triggerA = useSelector((state: RootState) => state.loading.triggerA);
    const triggerB = useSelector((state: RootState) => state.loading.triggerB);
    console.log(triggerA);
    const [animationA, setAnimationA] = useState(false);
    const [animationB, setAnimationB] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (triggerA) {
            setAnimationA(true);
            setAnimationComplete(false);
        }
    }, [triggerA]);

    useEffect(() => {
        if (triggerB && animationA) {
            setAnimationB(true);
        }
    }, [triggerB, animationA]);

    useEffect(() => {
        if (animationA && animationB) {
            setTimeout(() => {
                setAnimationComplete(true);
            }, 500); // Đợi đủ thời gian để B hoàn thành
        }
    }, [animationA, animationB]);

    useEffect(() => {
        if (animationComplete) {
            setTimeout(() => {
                setAnimationA(false);
                setAnimationB(false);
                dispatch(setTriggerA(false));
                dispatch(setTriggerB(false));
                setAnimationComplete(false);
            }, 500);
        }
    }, [animationComplete, dispatch]);

    return (
        <div className='loading-cs'>
            <div className="d-flex">
                <div
                    className={`div-background ${animationA ? 'animateA' : ''} ${animationComplete ? 'hidden' : ''}`}
                >
       
                </div>
                <div
                    className={`div-background ${animationB ? 'animateB' : ''} ${animationComplete ? 'hidden' : ''}`}
                >

                </div>
            </div>
        </div>
    );
};

export default AnimationComponent;
