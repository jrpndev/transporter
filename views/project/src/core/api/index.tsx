const environment = process.env.ENVIRONMENT;
let BASE_URL = environment === 'PRODUCTION' ? "http://54.207.53.119:5000" : "http://localhost:5000"
export default BASE_URL;

