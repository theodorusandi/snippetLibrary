/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";
import Cookies from "js-cookie";

enum CookieKeys {
  CSRF_TOKEN = "csrftoken",
}

class Request {
  private static async setCSRFToken() {
    if (!Cookies.get(CookieKeys.CSRF_TOKEN)) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}csrf/get`);
        Cookies.set(CookieKeys.CSRF_TOKEN, res.data.token);
      } catch (err) {
        console.error(`Failed to set CSRF token. `, err);
      }
    }
  }

  static async get<T>(url: string): Promise<T> {
    await this.setCSRFToken();
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  static async post<T>(url: string, data: T) {
    await this.setCSRFToken();
    try {
      const res = await axios.post(url, data, {
        headers: { "X-CSRFToken": Cookies.get(CookieKeys.CSRF_TOKEN) },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export default Request;
