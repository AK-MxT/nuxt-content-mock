import { Middleware } from '@nuxt/types'

const authenticated: Middleware = ({
  app: {
    $accessor
  },
  redirect
}) => {
  if (!$accessor.authInfo.isLogin) {
    redirect('/auth')
  }
}

export default authenticated
