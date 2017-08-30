import { regionSaga } from './region'
import { postsSaga } from './posts'
import { activistsSaga } from './activists'
import { authSaga } from './auth'
import { accountSaga } from './account'
import { manageActivismSaga } from './manage_activism'

export default [
  regionSaga,
  postsSaga,
  activistsSaga,
  authSaga,
  accountSaga,
  manageActivismSaga
]
