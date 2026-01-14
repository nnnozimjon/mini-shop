import { fetchCart } from "@entities/cart";
import { store } from "@app/store";
import { getMe, refreshAccessToken } from "@entities/user/model/user.thunks";
import { uuidv4 } from "@shared/lib";

export const initAuth = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const userId = localStorage.getItem("userId");
  const sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    const newSessionId = uuidv4();
    localStorage.setItem("sessionId", newSessionId);
  }

  if (refreshToken && userId) {
    store
      .dispatch(refreshAccessToken())
      .unwrap()
      .then(() => {
        store.dispatch(getMe());
        store.dispatch(fetchCart());
      });
  } else {
    // guest cart fetch
    store.dispatch(fetchCart());
  }
};
