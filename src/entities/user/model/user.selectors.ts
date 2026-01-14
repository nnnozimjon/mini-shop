import type { RootState } from '@app/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectAuthState = (state: RootState) => state.auth;

export const selectAccessToken = createSelector(selectAuthState, (auth) => auth.accessToken);
export const selectRefreshToken = createSelector(selectAuthState, (auth) => auth.refreshToken);
export const selectUser = createSelector(selectAuthState, (auth) => auth.user);
export const selectIsAuthenticated = createSelector(selectAuthState, (auth) => !!auth.accessToken);
export const selectUserRole = createSelector(selectUser, (user) => user?.role);
export const selectIsAdmin = createSelector(selectUserRole, (role) => role === 'ADMIN');