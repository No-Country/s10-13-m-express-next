const Routes = {
  HOME: '/',
  ABOUT: '/about',
  INITIATIVES: '/initiatives',
  HELP: '/help',
  LOGOUT: '/logout',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  EDIT_ACCOUNT: '/account',
  PROFILE: (username: string) => `/@${username}`,
  DASHBOARD: '/dashboard',
  FEED: '/feed'
}

export default Routes
