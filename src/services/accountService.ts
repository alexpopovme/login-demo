import axios from 'axios'
import apiEndpoints from '@/config/apiEndpoints'
import authHeader from '@/moduls/authHeader'

class AccountService {
  async getUserById (id: string) {
    return axios({
      ...apiEndpoints.getUserById(id),
      headers: authHeader()
    })
  }
  async getCompanyById (id: string) {
    return axios({
      ...apiEndpoints.getCompanyById(id),
      headers: authHeader()
    })
  }
  async getIdentityById (id: string) {
    return axios({
      ...apiEndpoints.getIdentityById(id),
      headers: authHeader()
    })
  }
  async getRolesById (id: string) {
    return axios({
      ...apiEndpoints.getRolesById(id),
      headers: authHeader()
    })
  }
}

export default new AccountService()
