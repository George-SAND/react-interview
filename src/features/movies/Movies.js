import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
  fetchMovies,
  selectMovies,
  fetchFilteredCategories,
  selectFilteredCategories,
  selectFilteredMovies,
  selectPerPage,
  selectPage
} from './moviesSlice'

import { Spinner, Container } from 'react-bootstrap'

import Movie from '../../components/Movie'

export function Movies() {

  const dispatch = useDispatch();

  const movies = useSelector(selectMovies);
  const filteredCategories = useSelector(selectFilteredCategories);
  const filteredMovies = useSelector(selectFilteredMovies);
  const perPage = useSelector(selectPerPage);
  const page = useSelector(selectPage);
  const status = useSelector(state => state.movies.status)

  useEffect(() => {
    dispatch(fetchMovies())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const categories = movies.map((movie) => movie.category)
    dispatch(fetchFilteredCategories([...filteredCategories.filter((category) => categories.includes(category))]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies])

  return (
    <Container fluid className="d-flex flex-wrap mb-3">
      {status === 'loading' ? 
        <Spinner animation="border" /> : 
        filteredMovies.slice((page - 1) * perPage, page * perPage).map((movie) => <Movie key={movie.id} movie={movie} />)
      }
    </Container>
  )
}