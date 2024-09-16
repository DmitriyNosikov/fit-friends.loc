import { Namespace } from '@client/src/const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateRequestRDO, RequestsWithPaginationRDO } from '@shared/request';
import { fetchAllCurrentUserRequests } from '../../actions/api-request-action';

export type RequestProcess = {
  allUserRequests: CreateRequestRDO[],
  paginatedTargetRequests: RequestsWithPaginationRDO | null,

  isRequestsLoading: boolean
}

const initialState: RequestProcess = {
  allUserRequests: [],
  paginatedTargetRequests: null,

  isRequestsLoading: false
}

export const requestProcess = createSlice({
  name: Namespace.REQUEST,
  initialState,
  reducers: {
    setUserRequestsAction: (state, action: PayloadAction<CreateRequestRDO[]>) => {
      state.allUserRequests = action.payload;
    },

    addNewRequestAction: (state, action: PayloadAction<CreateRequestRDO | null>) => {
      const newRequest = action.payload;

      if(!newRequest) {
        return;
      }

      state.allUserRequests?.push(newRequest);
    },

    setTargetRequestsAction: (state, action: PayloadAction<RequestsWithPaginationRDO | null>) => {
      state.paginatedTargetRequests = action.payload;
    },

    updateUserRequestsAction: (state, action: PayloadAction<CreateRequestRDO>) => {
      const updatedRequest = action.payload;

      if (!state.allUserRequests) {
        return;
      }

      state.allUserRequests
        .map((request) => (request.id === updatedRequest.id)
          ? updatedRequest
          : request)
    },

    deleteUserRequestAction: (state, action: PayloadAction<string>) => {
      const deleteRequestId =  action.payload;

      if(state.allUserRequests) {
        state.allUserRequests = state.allUserRequests
          .filter((request) => request.id !== deleteRequestId);
      }
    },
  },

  extraReducers(builder) {
    builder
      // Requests to target list
      .addCase(fetchAllCurrentUserRequests.pending, (state) => {
        state.isRequestsLoading = true;
      })
      .addCase(fetchAllCurrentUserRequests.fulfilled, (state) => {
        state.isRequestsLoading = false;
      })
      .addCase(fetchAllCurrentUserRequests.rejected, (state) => {
        state.isRequestsLoading = false;
      })
  }
});


export const {
  setUserRequestsAction,
  addNewRequestAction,
  setTargetRequestsAction,
  updateUserRequestsAction,
  deleteUserRequestAction,
} = requestProcess.actions;
