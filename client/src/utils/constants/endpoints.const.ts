const Endpoints = {
  LOGIN: '/api/auth/login',
  VERIFY: '/api/auth/verify',
  USERS: '/api/users',
  INITIATIVES: '/api/initiatives',
  INITIATIVES_BY_ID: (id: string) => `/api/initiatives/${id}`,
  USER_BY_ID: (userId: string) => `/api/users/${userId}`,
  DONATION_TO_PLATFORM: '/api/create-checkout-session'
}

export default Endpoints
