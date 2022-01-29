import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { movies$ } from '../../assets/movies' 

const initialState = {
  movies: [],
  status: 'idle',
  filteredCategories: [],
  perPage: 4,
  page: 1,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => await movies$
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    incrementLike: (state, action) => {
      state.movies.find((e) => e.id === action.payload).likes += 1;
    },
    decrementLike: (state, action) => {
      state.movies.find((e) => e.id === action.payload).likes -= 1;
    },
    incrementDislike: (state, action) => {
      state.movies.find((e) => e.id === action.payload).dislikes += 1;
    },
    decrementDislike: (state, action) => {
      state.movies.find((e) => e.id === action.payload).dislikes -= 1;
    },
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter((e) => e.id !== action.payload);
    },
    fetchFilteredCategories: (state, action) => {
      state.filteredCategories = action.payload
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload
    },
    incrementPage: (state) => {
      state.page = Math.min(state.page + 1, Math.ceil(state.movies.filter((movie) => state.filteredCategories.length === 0 || state.filteredCategories.includes(movie.category)).length / state.perPage))
    },
    decrementPage: (state) => {
      state.page = Math.max(0, state.page - 1)
    },
    addFilteredCategories: (state, action) => {
      if (!state.filteredCategories.includes(action.payload)) state.filteredCategories.push(action.payload)
    },
    removeFilteredCategories: (state, action) => {
      state.filteredCategories = state.filteredCategories.filter((cat) => cat !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      });
  },
});

export const { 
  incrementLike, 
  decrementLike, 
  incrementDislike, 
  decrementDislike, 
  deleteMovie ,
  fetchFilteredCategories,
  setPerPage,
  incrementPage,
  decrementPage,
  addFilteredCategories,
  removeFilteredCategories
} = moviesSlice.actions;

export const selectMovies = (state) => state.movies.movies;

export const selectFilteredCategories = (state) => state.movies.filteredCategories;

export const selectFilteredMovies = (state) => state.movies.movies.filter((movie) => state.movies.filteredCategories.length === 0 || state.movies.filteredCategories.includes(movie.category));

export const selectPerPage = (state) => state.movies.perPage;

export const selectPage = (state) => state.movies.page;

export default moviesSlice.reducer;
