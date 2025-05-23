import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()
interface AuthResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export let accessToken = '';
const AUTH_URL = `${process.env.STOCK_URL}/auth`;

const authPayload = {
  email: process.env.EMAIL,
  name: process.env.NAME,
  rollNo: process.env.ROLL_NO,
  accessCode: process.env.ACCESS_CODE,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

export const fetchToken = async () =>  {
  try {
    const response = await axios.post<AuthResponse>(AUTH_URL, authPayload);
    accessToken = response.data.access_token;
    console.log("Token refreshed:", accessToken.slice(0, 20) + "...");
  } catch (error) {
    console.log(error)
  }
}



