import axios from "axios";

// helper to manage request
export default ({ req }) => {
  if (typeof window === "undefined") {
    // Server side code

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // client side code

    return axios.create({
      baseURL: "",
    });
  }
};
