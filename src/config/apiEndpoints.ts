export default {
  url: 'http://dev-api.rnsb.ru/api',
  authPersonal () {
    return {
      method: 'post',
      url: `${this.url}/auth/personal/`
    }
  },
  getUserById (id: string) {
    return {
      method: 'get',
      url: `${this.url}/account/user/${id}/`
    }
  },
  getCompanyById (id: string) {
    return {
      method: 'get',
      url: `${this.url}/account/company/${id}/`
    }
  },
  getIdentityById (id: string) {
    return {
      method: 'get',
      url: `${this.url}/account/identity/${id}/`
    }
  },
  getUserImagesById (id: string) {
    return {
      method: 'get',
      url: `${this.url}/media/image/account__user/${id}/`
    }
  },
  uploadUserImage () {
    return {
      method: 'post',
      url: `${this.url}/media/image/upload/`
    }
  },
  deleteUserImage (imageId: string) {
    return {
      method: 'delete',
      url: `${this.url}/media/image/${imageId}/`
    }
  },
  refreshToken () {
    return {
      method: 'post',
      url: `${this.url}/auth/refresh/`
    }
  }
}
