import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class exerciseArmoryApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${exerciseArmoryApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // individual API routes

  static async getExercise(id) {
    let res = await this.request(`exercises/${id}`);
    return res.exercise;
  }

  static async getExercises(data) {
    let res = await this.request(`exercises`, data);
    return res.exercises;
  }

  /**
   * register a user
   * @param {object} data {username, password, firstName, lastName, email}
   * @returns token
   */
  static async registerNewUser(data) {
    let res = await this.request(`auth/register`, data, "post");
    exerciseArmoryApi.token = res.token;
    return res.token;
  }

  /**
   * login a user
   * @param {object} data {username, password}
   * @returns token
   */
  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    exerciseArmoryApi.token = res.token;
    return res.token;
  }
}

// exerciseArmoryApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm" +
//   "FtZSI6IkFkbWludXNlciIsImlzQWRtaW4iOmZhbHNlLCJp" +
//   "YXQiOjE3MTgzMjcxMDZ9.GufeX_A3hFrcboChM54xn1sa6kJVyugThRXCcWLRonY";

export default exerciseArmoryApi;
