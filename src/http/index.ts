import { ILoginCredential, IServerResponse, ISignUpCredential, ISubmitOTP} from "@/types";
import axios from "axios"
import { IP_ADD } from "../../config";

const isBrowser = typeof window !== "undefined";

const api = axios.create({
  baseURL: `http://${IP_ADD}:3000/api/public`,
});

api.interceptors.request.use(async (config) => {
  const token = isBrowser && window.localStorage.getItem("TOKEN");
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => response.data, (error) => error);

// login api route
export const login = async (credential: ILoginCredential) => await api.post('/login', credential);

// sign up api route
export const signup = async (credential: ISignUpCredential) => await api.post('/ragistration', credential);
// verifying OTP
export const verifyOTP = async (credential: ISubmitOTP) => await api.post('/veryfyOTP', credential);
export const genrateOTP = async () => await api.get('/regenrate');

export const me = async () => await api.get('/me');

//fetch game data form 
export const currentGame = async () => await api.get('/currentGame');
export const joinGame = async(value:any)=> await api.post('/joinGame',value);
export const last10Reconres = async ()=> await api.get("/lastRecords");
export const winningCoins =async () => await api.get("/winningPrices")
//fetch transactions 
export const fetchTransactions =async () => await api.get('/transactions');

export const withdrawalRequest = async (value:any)=> await api.post("/withdrawal",value);

export const depositRequest =async (value:any) => await api.post('/deposit',value);
