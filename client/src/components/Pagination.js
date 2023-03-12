import React from 'react'
import { MDBPagination, MDBPaginationItem, MDBBtn } from 'mdb-react-ui-kit'


const Pagination = ({ setCurrentPage, currentPage, numberOfPages, dispatch }) => {

  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;

    if (currentPage === 1) {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>1</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded className='mx-2' onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
            <i class="fas fa-arrow-right"></i>
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn rounded className='mx-2' onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
            <i class="fas fa-arrow-left"></i>
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded className='mx-2' onClick={() => dispatch(setCurrentPage(currentPage + 1))}>
            <i class="fas fa-arrow-right"></i>
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn rounded className='mx-2' onClick={() => dispatch(setCurrentPage(currentPage - 1))}>
            <i class="fas fa-arrow-left"></i>
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>{currentPage}</p>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  }

  return (
    <>
      {renderPagination()}
    </>
  )
}

export default Pagination
