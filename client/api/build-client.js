import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server
    //
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      //baseURL:'http://www.xxhashanxx-ticketing-app-prod.fun/',
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};
//b6f811f978b0bfa7909a198e03e62763a84d5740ce6987ac164398d7056efcb1
