import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getVisitors,
  createVisitor as createVisitorApi,
  updateVisitorStatus,
  deleteVisitor as deleteVisitorApi,
} from "../api/visitorsApi";

import type {
  Visitor,
  VisitorState,
} from "../features/visitors-types";

const initialState: VisitorState = {
  visitors: [],
  loading: false,
  error: null,
};

export const fetchVisitors = createAsyncThunk(
  "visitors/fetchVisitors",
  async (_, { rejectWithValue }) => {
    try {
      return await getVisitors();
    } catch {
      return rejectWithValue(
        "Failed to load visitors"
      );
    }
  }
);

export const addVisitor = createAsyncThunk(
  "visitors/addVisitor",
  async (
    data: {
      name: string;
      phone: string;
      unit: string;
      visitDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await createVisitorApi(data);
    } catch {
      return rejectWithValue(
        "Failed to add visitor"
      );
    }
  }
);

export const approveVisitor = createAsyncThunk(
  "visitors/approveVisitor",
  async (
    visitor: Visitor,
    { rejectWithValue }
  ) => {
    try {
      return await updateVisitorStatus(
        visitor.id,
        "Approved"
      );
    } catch {
      return rejectWithValue(
        "Failed to approve visitor"
      );
    }
  }
);

export const rejectVisitor = createAsyncThunk(
  "visitors/rejectVisitor",
  async (
    visitor: Visitor,
    { rejectWithValue }
  ) => {
    try {
      return await updateVisitorStatus(
        visitor.id,
        "Rejected"
      );
    } catch {
      return rejectWithValue(
        "Failed to reject visitor"
      );
    }
  }
);

export const deleteVisitor = createAsyncThunk(
  "visitors/deleteVisitor",
  async (
    id: string,
    { rejectWithValue }
  ) => {
    try {
      await deleteVisitorApi(id);
      return id;
    } catch {
      return rejectWithValue(
        "Failed to delete visitor"
      );
    }
  }
);

const visitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchVisitors.fulfilled,
        (state, action) => {
          state.loading = false;
          state.visitors = action.payload;
        }
      )

      .addCase(
        fetchVisitors.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      // Add
      .addCase(
        addVisitor.fulfilled,
        (state, action) => {
          state.visitors.push(action.payload);
        }
      )

      // Approve
      .addCase(
        approveVisitor.fulfilled,
        (state, action) => {
          const index = state.visitors.findIndex(
            (visitor) =>
              visitor.id === action.payload.id
          );

          if (index !== -1) {
            state.visitors[index] = action.payload;
          }
        }
      )

      // Reject
      .addCase(
        rejectVisitor.fulfilled,
        (state, action) => {
          const index = state.visitors.findIndex(
            (visitor) =>
              visitor.id === action.payload.id
          );

          if (index !== -1) {
            state.visitors[index] = action.payload;
          }
        }
      )

      // Delete
      .addCase(
        deleteVisitor.fulfilled,
        (state, action) => {
          state.visitors = state.visitors.filter(
            (visitor) =>
              visitor.id !== action.payload
          );
        }
      );
  },
});

export default visitorSlice.reducer;