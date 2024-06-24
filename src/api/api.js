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

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${exerciseArmoryApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // console.error("API Error:", err.response);
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

  //==============================================================================//

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

  //==============================================================================//
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

  //==============================================================================//
  /**
   * get a user by username
   * @param {string} username
   * @returns {object} user {username, firstName, lastName, email, workouts}
   *
   */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  //==============================================================================//

  /**
   * create a workout
   * @param {string} username
   * @param {object} data {exercises, notes}
   * @returns {object} workout {id, notes, exercises}
   *
   */
  static async createWorkout(username, data) {
    let res = await this.request(`users/${username}/workouts`, data, "post");
    return res.workout;
  }
  //==============================================================================//

  /**
   * get a workout by id
   * @param {string} username
   * @param {string} id - workout id
   * @returns {workout} workouts [{id, name, description, exercises}]
   */
  static async getWorkout(username, id) {
    let res = await this.request(`users/${username}/workouts/${id}`);
    return res.workout;
  }

  //==============================================================================//


  static async editExerciseToWorkout(username, id, data) {
    let res = await this.request(
      `users/${username}/workouts/${id}`,
      data,
      "patch"
    );
    return res.exercises;
  }
  //==============================================================================//

  /**
   * update exercises for a workout
   * @param {string} username
   * @param {string} id - workout id
   * @param {object} data {exercises: [{exerciseId, sets, reps}]}
   * @returns {array} exercises [{exerciseId, sets, reps, weight}]
   *
   */
  static async updateWorkoutExercises(username, id, data) {
    let res = await this.request(
      `users/${username}/workouts/${id}/exercises`,
      data,
      "patch"
    );
    return res.exercises;
  }

  //==============================================================================//
  /**
   * delkete a workout
   * @param {string} username
   * @param {string} id - workout id
   */
  static async deleteWorkout(username, id) {
    await this.request(`users/${username}/workouts/${id}`, {}, "delete");
  }
}

export default exerciseArmoryApi;
