import { AUTH } from "../constants/actionTypes";
import { jwtDecode } from "jwt-decode";
import * as api from "../api";

export const auth = (codeResponse) => async (dispatch) => {
  try {
    const { data: token } = await api.authGoogle(codeResponse);

    const { name, email, picture: imageUrl, sub: id } = jwtDecode(token);
    const result = { name, email, imageUrl, id };

    dispatch({ type: AUTH, data: { result, token } });
  } catch (error) {}
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    //log in the user..
    const { data } = await api.signIn(formData);

    dispatch({ type: "AUTH", data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
