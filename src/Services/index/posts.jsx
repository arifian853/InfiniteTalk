import axios from "axios";

export const GetAllPosts = async () => {
  try {
    const { data, headers } = await axios.get(
      `http://localhost:7777/api/posts/all`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const GetSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`http://localhost:7777/api/posts/detail/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const CreatePost = async ({ token, title, caption, tags, photo }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`http://localhost:7777/api/posts/create`, { title, caption, tags, photo }, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};