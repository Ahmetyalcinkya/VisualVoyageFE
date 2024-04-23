import axios from "axios";
import { API_BASE_URL } from "../../Config/api";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
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
