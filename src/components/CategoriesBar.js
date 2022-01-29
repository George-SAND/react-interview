import { useSelector, useDispatch } from 'react-redux';

import { 
  addFilteredCategories,
  removeFilteredCategories,
} from '../features/movies/moviesSlice'

import { Nav, DropdownButton, Form } from 'react-bootstrap'

export default function CategoriesBar() {

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.movies.movies.map((movie) => movie.category).filter((category, index, self) => self.indexOf(category) === index))

  return (
    <Nav className="p-3">
      <DropdownButton title="Categories">
        {categories.map((category, index) => (
          <div key={index} className="checkbox px-3 py-1">
            <Form.Check id={`checkbox-${index}`} type="checkbox" label={category} onClick={(e) => e.target.checked ? dispatch(addFilteredCategories(category)) : dispatch(removeFilteredCategories(category))} />
          </div>
        ))}
      </DropdownButton>
    </Nav>
  )
}