const environment = process.env.ENVIRONMENT;
let BASE_URL = environment === 'PRODUCTION' ? "http://18.228.205.132:5000" : "http://localhost:5000"
export default BASE_URL;

