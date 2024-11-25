import React from 'react';
import { Offcanvas } from 'react-bootstrap';

interface OffcanvasComponentProps {
    content: React.ReactNode;
    show: boolean;
    onHide: () => void;
    user?: string;
}

const OffcanvasRight: React.FC<OffcanvasComponentProps> = ({ content, show, onHide, user }) => {
    return (
        <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: '60%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {!user &&
                    <div className='d-flex justify-content-center align-items-center flex-column gap-2 pb-3' >
                        <img src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-art-boy-avatar-png-image_6514653.png" height={60} width={60} style={{ borderRadius: '50%' }} alt="" />
                        <span>Trần Công Minh</span>
                    </div>
                }
                {content}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffcanvasRight;
