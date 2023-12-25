import axios from "axios";

export const GenerateOTP = async ({ username }) => {
    try {
      const { data } = await axios.post("http://localhost:7777/api/otp/generate", {
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
      const { data } = await axios.post("http://localhost:7777/api/otp/verify", {
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
      const { data } = await axios.post("http://localhost:7777/api/otp/validate", {
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
      const { data } = await axios.post("http://localhost:7777/api/otp/disable", {
        username, 
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };