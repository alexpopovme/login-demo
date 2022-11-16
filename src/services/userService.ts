import axios from 'axios'
import apiEndpoints from '@/config/apiEndpoints'

class UserService {
  async auth ({ body = {} }) {
    const response = await axios({
      ...apiEndpoints.authPersonal(),
      data: body
    })

    const { data } = response.data
    if (data.key) {
      localStorage.setItem('user', JSON.stringify(data));
    }

    return response.data;
  }
}

export default new UserService()
