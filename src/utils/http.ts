import Axios, { AxiosRequestConfig } from "axios";
const axioClient = Axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "userID":"1"
  },
  withCredentials: true,
});

const http = () => {
  /**
   * HTTP POST method for API request
   * @param url
   * @param props
   * @returns
   */
  const post = async (
    url: string,
    props?: JSON | FormData | {},
    hasFile?: boolean
  ) => {
    let config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (hasFile) {
      config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
    }
    const response = await axioClient
      .post(url, props, config)
      .then((response) => {
        if (response.data == undefined || response.data == "") {
          response.data = {
            status: false,
            message: "server error [001]",
          };
        }
        return response;
      })
      .catch((error) => {
        if (error.response && error.response.status == 422) {
          error.response.data.status = false;
          return error.response;
        } else if (error.response) {
          error.response.data = {
            status: false,
            message: "server error [010]",
          };
          return error.response;
        } else {
          return {
            data: {
              status: false,
              message: "server error [100]",
            },
          };
        }
      });

    const body = response.data;
    return { response, body };
  };
  return { post };
};

export default http;
