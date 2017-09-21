import { regionSaga } from './region'
import { postsSaga } from './posts'
import { activismSaga } from './activism'
import { authSaga } from './auth'
import { accountSaga } from './account'
import { whistleBlowerSaga } from './whistleblower'
import { advertiseSaga } from './advertise'
import { feedbackSaga } from './feedback'
import { cityOfficialsSaga } from './city_officials'

export default [
  regionSaga,
  postsSaga,
  activismSaga,
  authSaga,
  accountSaga,
  whistleBlowerSaga,
  advertiseSaga,
  feedbackSaga,
  cityOfficialsSaga
]
