import axios from 'axios';

export const smartRequest = async ({ method = "POST", endpoint, headers = {}, payload = {}, navigate = null}) => {
  const makeRequest = async () => {
    console.log("making request")
    try {
      const reqConf = {
        method,
        url: `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
        headers: { ...headers, Authorization: `Bearer ${localStorage.getItem('hookBoostAccessToken')}` },
        withCredentials: true
      };
      if (method === "GET") {
        reqConf.params = payload;
      } else {
        reqConf.data = payload;
      }
      const res = await axios(reqConf);
      return res;
    } catch (e) {
      return e.response;
    }
  };

  // First attempt to make the request
  let result = await makeRequest();

  // If access token has expired, refresh the token
  if (result?.status === 403) {
    console.log("Access token expired. Attempting to refresh...");

    try {
      const refreshResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/refresh`,
        {},
        { withCredentials: true } // Ensure cookies are sent
      );

      // Update the access token in localStorage
      const newAccessToken = refreshResponse.data.accessToken;
      localStorage.setItem('hookBoostAccessToken', newAccessToken);

      console.log("successfully refreshed access token")

      // Retry the original request with the new token
      headers.Authorization = `Bearer ${newAccessToken}`;
      result = await makeRequest();
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      if (navigate) {
        navigate('/login');
      }
      throw refreshError; // Return the error so it can be caught in the calling file
    }
  }

  // Return the result or throw error if request ultimately failed
  if (!result || result.status >= 400) {
    const error = new Error(result?.data?.message || 'Request failed');
    error.response = result;
    throw error; // Throw so the calling file can catch
  }

  console.log("Request successful:", result.data);
  return result;
};
