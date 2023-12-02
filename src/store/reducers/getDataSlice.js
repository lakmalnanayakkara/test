import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  dataPerPages: 1,
  currentPage: 1,
  loading: true,
  error: '',
};

export const fetchData = createAsyncThunk('fetchData', async () => {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character/');
    const data = await res.json();
    if (data) {
      return data;
    } else {
      return { err: 'some error' };
    }
  } catch (error) {
    return { err: 'some error' };
  }
});

const getDataSlice = createSlice({
  name: 'get-data-slice',
  initialState,
  reducers: {
    onNavigateNext: (state, action) => {
      state.currentPage++;
    },
    onNavigatePrev: (state, action) => {
      state.currentPage--;
    },
    onChangeDataPerPage: (state, action) => {
      state.dataPerPages = action.payload;
    },
    onClickCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = true;
    });
  },
});

export const Actions = getDataSlice.actions;
export default getDataSlice.reducer;
