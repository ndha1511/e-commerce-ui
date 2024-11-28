import React from 'react';
import { Pagination } from 'react-bootstrap';
import { isMobile } from '../../utils/responsive';

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, handlePageChange }) => {
    const mobile = isMobile();
    return (
        <div className={`d-flex justify-content-center align-items-center  ${mobile ? '': ' mt-3'} `}>
            <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

                {/* Hiển thị các trang đầu tiên */}
                {currentPage > 3 && (
                    <>
                        <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>
                        <Pagination.Ellipsis />
                    </>
                )}

                {/* Các trang gần với trang hiện tại */}
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (page >= currentPage - 1 && page <= currentPage + 1) {
                        return (
                            <Pagination.Item
                                key={page}
                                active={page === currentPage}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Pagination.Item>
                        );
                    }
                    return null;
                })}

                {/* Hiển thị các trang cuối cùng */}
                {currentPage < totalPages - 2 && (
                    <>
                        <Pagination.Ellipsis />
                        <Pagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>
                    </>
                )}

                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
