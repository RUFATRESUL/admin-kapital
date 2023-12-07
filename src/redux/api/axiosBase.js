import axios from "axios";
import { logout, setToken } from "src/redux/features/User/userSlice";
// import { logout, setToken } from "pages/slice";
import { v4 as uuid } from "uuid";

const baseUrl = import.meta.env.VITE_BASE_URL;
export const imgBaseUrl = import.meta.env.VITE_BASE_URL;
export const axiosBaseQuery =
  ({ baseUrl = "", headers }) =>
  async ({ url, params, method, data, responseType }, { signal, getState }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method: method ? method : "GET",
        ...(params && { params: params }),
        ...(headers && { headers: headers({}, { getState, signal }) }),
        ...(data && { data: data }),
        responseType: responseType ? responseType : "json",
      });
      return {
        data: result.data,
      };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };

// lang = az,en,ru

// localeLang = {
//   az : 1,
//   en : 2,
//   ru : 3
// }

// localeLang[lang || 1]

export const APIBaseQueryInterceptor = axiosBaseQuery({
  baseUrl: baseUrl,
  headers: (headers, { getState }) => {
    const {
      user: { token },
    } = getState();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["Accept-Language"] = 2;
    }
    headers["x-requestid"] = uuid();
    return headers;
  },
});

export const APIBaseQuery = async (args, api, extraOptions) => {
  let result = await APIBaseQueryInterceptor(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401
    // result.error.data?.message === "Unauthorized"
  ) {
    const state = api;
    const userState = state.getState();
    const { user } = userState;
    const { refreshToken } = user;
    const refreshResult = await APIBaseQueryInterceptor(
      {
        url: "auth/refreshToken",
        method: "POST",
        data: { refreshToken: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const data = refreshResult?.data;
      const { token, refreshToken, expiresAt } = data;

      await state.dispatch(setToken({ token, refreshToken, expiresAt }));
      result = await APIBaseQueryInterceptor(args, api, extraOptions);
    } else {
      state.dispatch(logout());
    }
  }
  return result;
};
