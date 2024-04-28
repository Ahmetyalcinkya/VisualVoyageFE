import { GET_USER_PROFILE_FAILURE } from "../Auth/auth.actionType";
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_USERS_POSTS_REQUEST,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POSTS_REQUEST:
    case LIKE_POST_REQUEST:
    case GET_USERS_POSTS_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        loading: false,
        error: null,
      };

    case CREATE_POST_FAILURE:
    case GET_ALL_POSTS_FAILURE:
    case GET_USER_PROFILE_FAILURE:
    case LIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
