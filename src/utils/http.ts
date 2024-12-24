import Axios, { AxiosRequestConfig } from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const axioClient = Axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

const http = () => {
  /**
   * HTTP POST method for API request
   * @param url - API endpoint path
   * @param props - Request data
   * @param hasFile - Flag for file upload
   * @returns Response data
   */
  const post = async (
    url: string,
    props?: JSON | FormData,
    hasFile?: boolean
  ) => {
    // const fullUrl = `${url}`;
    const fullUrl = `${backendUrl}${url}`;
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
      .post(fullUrl, props, config)
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
            message: error?.response?.data.message,
            errors: error?.response?.data.errors,
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
