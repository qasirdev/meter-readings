"use client"
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Account, Reading } from '@/db/types';

interface AccountState {
  selectedAccount: Account | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: AccountState = {
  selectedAccount: null,
  status: 'idle',
  error: null,
};

export const addReading = createAsyncThunk(
  'account/addReading', 
  async ({ accountId, newReadings }: { accountId: number, newReadings: Omit<Reading, 'id'>[]}) => { 
    const response = await axios.post(`/api/accounts/${accountId}/readings`, newReadings);
    return response.data; 
  }
);

const calculatePredictedUsage = (selectedAccount:any,fuelType:string) => {
  if (!selectedAccount) return;

    const relevantMeter = selectedAccount.meters.find(
      (meter:any) => meter.fuelType === fuelType
    ); 

    if (!relevantMeter || relevantMeter.readings.length < 4) return; 

    const readings = relevantMeter.readings.slice(0, 4); 
  const differences = [];
  for (let i = 1; i < readings.length; i++) {
    differences.push(readings[i-1].value - readings[i].value);
  }

  const averageDifference = differences.reduce((sum, value) => sum + value, 0) / 3;
  const predictedUsage = readings[0].value + averageDifference;

  return predictedUsage.toFixed(0);;
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    addSelectedAccount: (state, action: PayloadAction<Account>) => {
      state.selectedAccount = action.payload;
      if(state.selectedAccount) {
        state.selectedAccount.predictedElecUsage = calculatePredictedUsage(state.selectedAccount, 'Electricity');
        state.selectedAccount.predictedGasUsage = calculatePredictedUsage(state.selectedAccount, 'Gas');
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addReading.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReading.fulfilled, (state, action) => {
        state.status = 'succeeded';
        debugger;
        state.selectedAccount = action.payload.data;
        if(state.selectedAccount) {
          state.selectedAccount.predictedElecUsage = calculatePredictedUsage(state.selectedAccount, 'Electricity');
          state.selectedAccount.predictedGasUsage = calculatePredictedUsage(state.selectedAccount, 'Gas');
        }
      })
      .addCase(addReading.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { addSelectedAccount } = accountSlice.actions
export default accountSlice.reducer;