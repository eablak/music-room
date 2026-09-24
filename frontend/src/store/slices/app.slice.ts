import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThemeMode } from '@/src/types';
import { themeStorage } from '@/src/utils/storage';
import { DEFAULT_THEME_MODE } from '@/src/constants/config';

export interface IAppState {
  themeMode: AppThemeMode;
  isOnline: boolean;
}

const initialState: IAppState = {
  themeMode: DEFAULT_THEME_MODE,
  isOnline: true,
};

export const hydrateTheme = createAsyncThunk<AppThemeMode, void>(
  'app/hydrateTheme',
  async () => {
    const stored = themeStorage.get();
    return stored ?? DEFAULT_THEME_MODE;
  },
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<AppThemeMode>) {
      state.themeMode = action.payload;
    },
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateTheme.fulfilled, (state, action) => {
      state.themeMode = action.payload;
    });
  },
});

export const { setThemeMode, setOnlineStatus } = appSlice.actions;
export default appSlice.reducer;
