import axios from '@/axios'

export const mockApi = async () => {
  await axios
    .get('/mock')
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

export const mockErrorApi = async () => {
  await axios.get('/mock/error')
}
