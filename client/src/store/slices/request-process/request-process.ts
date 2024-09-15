import { Namespace } from '@client/src/const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateRequestRDO, RequestsWithPaginationRDO } from '@shared/request';
import { fetchUserRequests } from '../../actions/api-request-action';

export type RequestProcess = {
  paginatedRequests: RequestsWithPaginationRDO | null,

  isRequestsLoading: boolean
}

const initialState: RequestProcess = {
  paginatedRequests: null,

  isRequestsLoading: false
}

export const requestProcess = createSlice({
  name: Namespace.REQUEST,
  initialState,
  reducers: {
    setUserRequestsAction: (state, action: PayloadAction<RequestsWithPaginationRDO | null>) => {
      state.paginatedRequests = action.payload;
    },

    updateUserRequestsAction: (state, action: PayloadAction<CreateRequestRDO>) => {
      const updatedRequest = action.payload;

      if (!state.paginatedRequests) {
        return;
      }

      state.paginatedRequests.entities
        .map((request) => (request.id === updatedRequest.id)
          ? updatedRequest
          : request)
    },

    deleteUserRequestAction: (state, action: PayloadAction<string>) => {
      const deleteRequestId =  action.payload;

      if(state.paginatedRequests) {
        state.paginatedRequests.entities = state.paginatedRequests.entities
          .filter((request) => request.id !== deleteRequestId);
      }
    },
  },

  extraReducers(builder) {
    builder
      // Requests list
      .addCase(fetchUserRequests.pending, (state) => {
        state.isRequestsLoading = true;
      })
      .addCase(fetchUserRequests.fulfilled, (state) => {
        state.isRequestsLoading = false;
      })
      .addCase(fetchUserRequests.rejected, (state) => {
        state.isRequestsLoading = false;
      })
  }
});


export const {
  setUserRequestsAction,
  updateUserRequestsAction,
  deleteUserRequestAction,
} = requestProcess.actions;
