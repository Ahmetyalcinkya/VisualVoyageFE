import {
  GET_POST_COMMENTS_FAILURE,
  GET_POST_COMMENTS_REQUEST,
  GET_POST_COMMENTS_SUCCESS,
} from "./comment.actionType";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_COMMENTS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: null,
      };

    case GET_POST_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
