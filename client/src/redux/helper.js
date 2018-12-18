import axios from 'axios'

export const doRequest = async (opts)=>{
  const response = await axios(opts)
  return response.data
}
