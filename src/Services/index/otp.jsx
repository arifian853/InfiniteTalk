import axios from "axios";

export const GenerateOTP = async ({ username }) => {
    try {
      const { data } = await axios.post("https://infinite-talk-api.onrender.com/api/otp/generate", {
        username
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  
  export const VerifyOTP = async ({ token, username }) => {
    try {
      const { data } = await axios.post("https://infinite-talk-api.onrender.com/api/otp/verify", {
        token, 
        username
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  
  export const ValidateOTP = async ({ token, username }) => {
    try {
      const { data } = await axios.post("https://infinite-talk-api.onrender.com/api/otp/validate", {
        token, 
        username
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  
  export const DisableOTP = async ({ username }) => {
    try {
      const { data } = await axios.post("https://infinite-talk-api.onrender.com/api/otp/disable", {
        username, 
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };