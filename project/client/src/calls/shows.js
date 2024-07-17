import { axiosInstance } from ".";

//add show
export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/shows/add-show", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

//update show
export const updateShow = async (payload) => {
  try {
    const response = await axiosInstance.put("/api/shows/update-show", payload);
    console.log(payload, response);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

//get show by theatre
export const getShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-all-shows-by-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

//delete show
export const deleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/delete-show",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

//get all theatres by movie
export const getAllTheatresByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-all-theatres-by-movie",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

//get show by id
export const getShowById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-show-by-id",
      payload
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};
