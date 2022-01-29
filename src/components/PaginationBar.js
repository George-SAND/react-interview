import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectFilteredMovies,
  setPerPage,
  selectPerPage,
  selectPage,
  incrementPage,
  decrementPage
} from '../features/movies/moviesSlice'

import { Nav, Form } from "react-bootstrap"

export default function PaginationBar() {

  const dispatch = useDispatch();

  const filteredMovies = useSelector(selectFilteredMovies);
  const length = filteredMovies.length
  const perPage = useSelector(selectPerPage)
  const page = useSelector(selectPage)

  useEffect(() => {
    if (page > 1 && page > Math.ceil(length / perPage)) dispatch(incrementPage())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, length, perPage])

  return (
    <Nav className="d-flex align-items-center p-3 position-relative" style={{minHeight: '56px'}}>
      {page > 1 && (
        <div className="d-flex align-items-center text-primary" style={{cursor: 'pointer'}} onClick={() => dispatch(decrementPage())}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left me-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
          <div>Previous</div>
        </div>
      )}
      <div className="d-flex align-items-center position-absolute top-50 start-50 translate-middle">
        <div>Number per page:&nbsp;</div>
        <Form.Select className="w-auto" size="sm" onChange={(e) => dispatch(setPerPage(e.target.value))}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </Form.Select>
      </div>
      {page < Math.ceil(length / perPage) && (
        <div className="d-flex align-items-center text-primary ms-auto" style={{cursor: 'pointer'}} onClick={() => dispatch(incrementPage())}>
          <div>Next</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right ms-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
      )}
    </Nav>
  )
}