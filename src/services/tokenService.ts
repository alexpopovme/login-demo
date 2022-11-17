import axios from 'axios'
import apiEndpoints from '@/config/apiEndpoints'

class TokenService {
  async refresh ({ body = {} }) {
    const response = await axios({
      ...apiEndpoints.refreshToken(),
      data: body
    })

    const { data } = response.data
    if (data.key) {
      localStorage.setItem('user', JSON.stringify(data));
    }

    return response.data;
  }
}

export default new TokenService()
