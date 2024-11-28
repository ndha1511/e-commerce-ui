import React, { useState, useEffect } from 'react';
import './animation-component.scss'

interface AnimationComponentProps {
    triggerA: boolean;
    triggerB: boolean;
    onReset: () => void;
}
const AnimationComponent: React.FC<AnimationComponentProps> = ({ triggerA, triggerB, onReset }) => {
    const [animationA, setAnimationA] = useState(false);
    const [animationB, setAnimationB] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    // Hàm để bắt đầu animation A khi người dùng chọn A
    const startAnimationA = () => {
        setAnimationA(true);
        setAnimationComplete(false); // Đặt lại trạng thái hoàn thành trước khi bắt đầu
    };
    useEffect(() => {
     if(triggerA){
        setAnimationA(true);
        setAnimationComplete(false);
     }
    }, [triggerA])
    useEffect(() => {
        if(triggerB){
            if (animationA) { // Chỉ bắt đầu B nếu A đã chạy
                setAnimationB(true);
            }
        }
       }, [triggerB])
    // Hàm để bắt đầu animation B khi người dùng chọn B và A đã hoàn thành
    const startAnimationB = () => {
        if (animationA) { // Chỉ bắt đầu B nếu A đã chạy
            setAnimationB(true);
        }
    };

    // Hàm để reset tất cả khi cả A và B hoàn thành
    useEffect(() => {
        if (animationA && animationB) {
          
            setTimeout(() => {
                setAnimationComplete(true); // Khi cả A và B hoàn thành, đánh dấu hoàn thành
            }, 500); // Đợi đủ thời gian để B hoàn thành trước khi ẩn
        }
    }, [animationA, animationB]);

    // Reset trạng thái sau khi cả A và B hoàn thành
    useEffect(() => {
        if (animationComplete) {

            setTimeout(() => {
                setAnimationA(false);
                setAnimationB(false);
                onReset();
                setAnimationComplete(false); // Reset trạng thái
            }, 500); // Đặt lại sau 1 giây khi các phần tử đã ẩn đi
        }
    }, [animationComplete]);

    return (
        <div>
            {/* <button onClick={startAnimationA}>Chạy A</button>
            <button onClick={startAnimationB} disabled={!animationA}>Chạy B</button> Disable B nếu A chưa chạy */}

            <div className="d-flex">
                <div
                    className={`div-background ${animationA ? 'animateA' : ''} ${animationComplete ? 'hidden' : ''}`}
                >
                    {/* Nội dung A */}
                </div>
                <div
                    className={`div-background ${animationB ? 'animateB' : ''} ${animationComplete ? 'hidden' : ''}`}
                >
                    {/* Nội dung B */}
                </div>
            </div>
        </div>
    );
};

export default AnimationComponent;
