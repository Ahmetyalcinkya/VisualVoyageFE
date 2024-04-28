import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  GET_POST_COMMENTS_FAILURE,
  GET_POST_COMMENTS_REQUEST,
  GET_POST_COMMENTS_SUCCESS,
  LIKE_COMMENT_REQUEST,
} from "./comment.actionType";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_COMMENTS_REQUEST:
    case LIKE_COMMENT_REQUEST:
    case CREATE_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false,
        error: null,
      };

    case GET_POST_COMMENTS_FAILURE:
    case LIKE_COMMENT_REQUEST:
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
