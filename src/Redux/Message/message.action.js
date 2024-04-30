import { api } from "../../Config/api";
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

export const createMessageAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(
      `/api/message/chat/${reqData.message.chatId}`,
      reqData.message
    );
    reqData.sendMessageToServer(data);
    console.log("Created message: ", data);
    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log("Created message error: ", error);
    dispatch({ type: CREATE_MESSAGE_FAILURE, payload: error });
  }
};

export const createChatAction = (chat) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post(`/api/chats/`, chat);
    console.log("Created chat: ", data);
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("Created chat error: ", error);
    dispatch({ type: CREATE_CHAT_FAILURE, payload: error });
  }
};

export const getAllChatsAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CHATS_REQUEST });
  try {
    const { data } = await api.get(`/api/chats/all`);
    console.log("Get all chats: ", data);
    dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: data });
  } catch (error) {
    console.log("Get all chats error: ", error);
    dispatch({ type: GET_ALL_CHATS_FAILURE, payload: error });
  }
};

export const getChatsMessagesAction = (chatId) => async (dispatch) => {
  dispatch({ type: GET_CHATS_MESSAGES_REQUEST });
  try {
    const { data } = await api.get(`/api/message/chat/${chatId}`);
    console.log("Get chats messages: ", data);
    dispatch({ type: GET_CHATS_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    console.log("Get chats messages error: ", error);
    dispatch({ type: GET_CHATS_MESSAGES_FAILURE, payload: error });
  }
};
