import { api } from "../../Config/api";
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_USERS_POSTS_FAILURE,
  GET_USERS_POSTS_REQUEST,
  GET_USERS_POSTS_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const { data } = await api.post("/api/posts/", postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("Created post :", data);
  } catch (error) {
    console.log("Created post error :", error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};

export const getAllPostsAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POSTS_REQUEST });
  try {
    const { data } = await api.get("/posts/all");
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
    console.log("Get all posts :", data);
  } catch (error) {
    console.log("Get all posts error :", error);
    dispatch({ type: GET_ALL_POSTS_FAILURE, payload: error });
  }
};

export const getUsersPostsAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POSTS_REQUEST });
  try {
    const { data } = await api.get(`post/user${userId}`);
    dispatch({ type: GET_USERS_POSTS_SUCCESS, payload: data });
    console.log("Get users posts :", data);
  } catch (error) {
    console.log("Get users posts error :", error);
    dispatch({ type: GET_USERS_POSTS_FAILURE, payload: error });
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await api.put(`api/posts/like/${postId}`);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    console.log("Like post :", data);
  } catch (error) {
    console.log("Like post error :", error);
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
  }
};
