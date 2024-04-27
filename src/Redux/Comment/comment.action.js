import axios from "axios";
import { API_BASE_URL, api } from "../../Config/api";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  GET_POST_COMMENTS_FAILURE,
  GET_POST_COMMENTS_REQUEST,
  GET_POST_COMMENTS_SUCCESS,
} from "./comment.actionType";

export const createCommentAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const { data } = await api.post(
      `/api/comments/post/${reqData.postId}`,
      reqData.comment
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("Created comment :", data);
  } catch (error) {
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
    console.log("Create comment error :", error);
  }
};

export const getPostCommentsAction = (postId) => async (dispatch) => {
  dispatch({ type: GET_POST_COMMENTS_REQUEST });
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/posts/comments/${postId}`
    );
    dispatch({ type: GET_POST_COMMENTS_SUCCESS, payload: data });
    console.log("Get posts 10 comments :", data);
  } catch (error) {
    dispatch({ type: GET_POST_COMMENTS_FAILURE, payload: error });
    console.log("Get posts 10 comments error :", error);
  }
};
