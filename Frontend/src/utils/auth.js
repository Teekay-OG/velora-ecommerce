export const getAuthHeader = () => {

  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) return {}

  return {
    Authorization: `Bearer ${user.token}`
  }
}