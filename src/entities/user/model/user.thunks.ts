import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "@entities/user";
import { setTokens, setUser, logout } from "./user.slice";
import type { RootState } from "@app/store";
import type { User } from "./user.types";
import type { RegisterRequest } from "@entities/user";

export const loginUser = createAsyncThunk<
  { accessToken: string; refreshToken: string; user: User },
  { email: string; password: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await userApi.login(credentials);
    const data = response.data;

    thunkAPI.dispatch(
      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    );
    thunkAPI.dispatch(setUser(data.user));
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("userId", response.data.user.id);

    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const registerUser = createAsyncThunk<{}, RegisterRequest>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await userApi.register(credentials);
      const data = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { state: RootState }
>("auth/refresh", async (_, thunkAPI) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const userId = localStorage.getItem("userId");

  if (!refreshToken || !userId) {
    thunkAPI.dispatch(logout());
    throw new Error("No refresh token available");
  }

  try {
    const response = await userApi.refreshToken(userId, refreshToken);
    thunkAPI.dispatch(
      setTokens({
        accessToken: response.data.accessToken,
        refreshToken: refreshToken,
      })
    );
    return response.data;
  } catch (error: any) {
    thunkAPI.dispatch(logout());
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const getMe = createAsyncThunk<User>(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      const userId: any = localStorage.getItem("userId");
      const response: any = await userApi.getMe(userId);

      thunkAPI.dispatch(
        setUser({
          email: response.data.email,
          id: response.data.id,
          name: response.data.name,
          role: response.data.role,
        })
      );
      return response.data.user;
    } catch (error: any) {
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
