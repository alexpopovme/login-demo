import tokenService from '@/services/tokenService'


const refresh = async (refreshKey: string) => {
  return await tokenService.refresh({ body: {
      refresh_token: refreshKey
    }
  })
}

export const validateToken = async () => {
  let user = JSON.parse(localStorage.getItem('user') as string)
  const {key, refresh_key: refreshKey, valid_till: validTill, refresh_till: refreshTill} = user
  const needRefresh = new Date(validTill).getTime() <= Date.now()
  const canRefresh = new Date(refreshTill).getTime() <= Date.now()
  if (needRefresh && canRefresh) {
    const response = await refresh(refreshKey)
    return response.data.key
  }
  return key
}
