import axios from 'axios'
import apiEndpoints from '@/config/apiEndpoints'
import authHeader from '@/moduls/authHeader'

class AccountService {
  async getUserById (id: string) {
    return axios({
      ...apiEndpoints.getUserById(id),
      headers: await authHeader()
    })
  }
  async getCompanyById (id: string) {
    return axios({
      ...apiEndpoints.getCompanyById(id),
      headers: await authHeader()
    })
  }
  async getIdentityById (id: string) {
    return axios({
      ...apiEndpoints.getIdentityById(id),
      headers: await authHeader()
    })
  }
}

export default new AccountService()
