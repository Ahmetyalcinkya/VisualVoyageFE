import axios from "axios";
import { API_BASE_URL, api } from "../../Config/api";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/login`,
      loginData.data
    );

    if (data.token) {
      localStorage.setItem("vv-jwt", data.token);
    }
    console.log("---- Login success:", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    console.log("------- ERROR : ", error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/register`,
      registerData.data
    );

    if (data.token) {
      localStorage.setItem("vv-jwt", data.token);
    }
    console.log("---- Register success:", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.token });
  } catch (error) {
    console.log("------- ERROR : ", error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const getUserProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("---- Get User profile success:", data);
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("------- ERROR : ", error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error });
  }
};

export const updateUserProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
  try {
    const { data } = await api.put(`${API_BASE_URL}/api/users/`, reqData);
    console.log("---- Update User profile success:", data);
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("------- ERROR : ", error);
    dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error });
  }
};

export const searchUserAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await api.get(`/users/search?query=${query}`);
    console.log("---- Search user success:", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("------- Search user error : ", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error });
  }
};
