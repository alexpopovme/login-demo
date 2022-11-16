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
  getRolesById (id: string) {
    return {
      method: 'get',
      url: `${this.url}/account/company/${id}/roles/`
    }
  }
}
