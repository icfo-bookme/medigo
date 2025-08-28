import axios from "axios";
import { parseCookies } from "nookies";
import { hostname } from "./config";


export default async function request(url, token = null) {
  const cookies = parseCookies();

  const config = {
    headers: { Authorization: `Bearer ${token ? token || "" : cookies?.token || ""}` },
  };

  try {
    const res = await axios.get(`${hostname}/api/${url}`, config);
    // console.log('rrrrrrrrrrr',res)
    return res.data;
  } catch (error) {
    // if(error?.response?.status == 401){
    //   router.push(`/login`)
    // }
    // console.log('eroooooooooooooooor',error.response)
  }
}
