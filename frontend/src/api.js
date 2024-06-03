import axios from "axios";

// Base URL for the API
const BASEURL = "http://127.0.0.1:3001";

/**
 * ComAttApi class to handle API requests.
 * This class manages API calls to the backend server for the application.
 */
class ComAttApi {
  // Static token to store the authentication token
  static token;

  /**
   * Generic method to make an API request.
   *
   * @param {string} endpoint - The API endpoint to call.
   * @param {Object} data - The data to send with the request (default is an empty object).
   * @param {string} method - The HTTP method to use (default is 'get').
   * @returns {Promise} - A promise that resolves to the API response.
   */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // Construct the full URL for the API endpoint
    const url = `${BASEURL}/${endpoint}`;

    // Set up the headers, including the authorization token if available
    const headers = { Authorization: `Bearer ${ComAttApi.token}` };

    // If the method is 'get', add the data to the request params
    const params = method === "get" ? data : {};

    try {
      // Make the request and return the data
      return (await axios({ url, method, data, headers, params })).data;
    } catch (err) {
      // Log the error and throw a message
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /**
   * Method to authenticate and get a token.
   *
   * @param {Object} data - The data to send for authentication.
   * @returns {Promise} - A promise that resolves to the API response.
   */
  static async authToken(data) {
    // Call the request method with the data and 'post' method
    const resp = await this.request("auth/token", data, "post");
    // Log and return the response
    return resp.token;
  }

  static async getUser(username) {
    const resp = await this.request(`users/${username}`);
    return resp.user;
  }

  static async getAllUsers() {
    const resp = await this.request(`users`);
    return resp.users;
  }

  static async createUser(data) {
    const resp = await this.request(`users`, data, "post");
    return resp.user;
  }

  static async removeUser(username) {
    const resp = await this.request(`users/${username}`, {}, "delete");
    return resp.status;
  }
}

export default ComAttApi;
