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
  async getUserImagesById (id: string) {
    return axios({
      ...apiEndpoints.getUserImagesById(id),
      headers: await authHeader()
    })
  }
  async uploadUserImage (formData) {
    return axios({
      ...apiEndpoints.uploadUserImage(),
      headers: {
        ...await authHeader(),
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
  }
  async deleteUserImage (imageId: string) {
    return axios({
      ...apiEndpoints.deleteUserImage(imageId),
      headers: await authHeader(),
    })
  }
}

export default new AccountService()
