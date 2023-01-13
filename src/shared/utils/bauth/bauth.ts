import axios from "axios";
console.log(process.env.ALLOWED_APP);
export const bauth = axios.create({
  baseURL: String(process.env.AUTH_URL),
  headers: {
    secret: `${process.env.ALLOWED_APP}`,
    "Accept-Encoding": "*",
  },
});

/*bauth.defaults.headers.common = {
    secret: `${process.env.ALLOWED_APP}`,
};

export default bauth;
*/
