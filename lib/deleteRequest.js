import axios from "axios";
import { parseCookies } from "nookies";
import { hostname } from "./config";


export default async function deleteRequest(url, data, token = null) {
  const cookies = parseCookies();

  const config = {
    headers: {
      Authorization: `Bearer ${cookies?.token || token}`,
    },
  };
 

  try {
    const res = await axios.delete(`${hostname}/api/${url}`, config);
    // console.log('rrrrrrrrrrr',res)
    return res.data;
  } catch (error) {
    
  }
}
