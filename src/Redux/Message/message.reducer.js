import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHATS_FAILURE,
  GET_ALL_CHATS_REQUEST,
  GET_ALL_CHATS_SUCCESS,
  GET_CHATS_MESSAGES_FAILURE,
  GET_CHATS_MESSAGES_REQUEST,
  GET_CHATS_MESSAGES_SUCCESS,
} from "./message.actionType";

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
    case CREATE_CHAT_REQUEST:
    case GET_ALL_CHATS_REQUEST:
    case GET_CHATS_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case GET_CHATS_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    case GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
      };
    case CREATE_MESSAGE_FAILURE:
    case CREATE_CHAT_FAILURE:
    case GET_ALL_CHATS_FAILURE:
    case GET_CHATS_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
