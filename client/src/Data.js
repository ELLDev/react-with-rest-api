import apiBaseUrl from "./config";
import axios from "axios";

export default class Data {
  api(
    url,
    method = "get",
    body = null,
    withCredentials = false,
    credentials = null
  ) {
    const params = {
      method,
      url,
      params: null,
      baseURL: apiBaseUrl,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      withCredentials: false,
    };

    if (body) {
      params.data = body;
    }
    if (withCredentials) {
      params.auth = {
        username: credentials.username,
        password: credentials.password,
      };
    }
    return axios(params);
  }
  async getUser(url, credentials) {
    const response = await this.api(url, "get", null, true, credentials);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(url, body) {
    return await this.api(url, "post", body).then((response) => {
      return response.status;
    });
  }

  async getCourse(url) {
    return await this.api(url).then((response) => {
      return response.data;
    });
  }

  async createCourse(url, body, credentials) {
    return await this.api(url, "post", body, true, credentials).then(
      (response) => {
        return response.status;
      }
    );
  }

  async updateCourse(url, body, credentials) {
    return await this.api(url, "put", body, true, credentials).then(
      (response) => {
        return response.data;
      }
    );
  }

  async deleteCourse(url, credentials) {
    return await this.api(url, "delete", null, true, credentials)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}
