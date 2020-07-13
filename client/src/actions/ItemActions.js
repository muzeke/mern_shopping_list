import axios from "axios";

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get("/api/items").then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    })
  );
};

export const addItem = (newItem) => (dispatch) => {
  console.log(newItem);
  const options = {
    headers: {
      "Content-Type": "application/json",
      "X-Zeke-Header": "Test1",
    },
  };

  axios.post("/api/items", newItem, options).then((res) => {
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
  });
};

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then((res) => {
    console.log(res);
    dispatch({ type: DELETE_ITEM, payload: id });
  });
};

//boiler plate
export const setItemsLoading = () => ({
  type: ITEMS_LOADING,
});
