const environment = process.env.ENVIRONMENT;
let BASE_URL = environment == 'PRODUCTION' ? "http:31783419.com" : "http://localhost:5000"
export default BASE_URL;

