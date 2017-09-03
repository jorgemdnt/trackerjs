import identifyUserFactory from './factories/identifyUserFactory'
import pageViewLoggerFactory from './factories/pageViewLoggerFactory'

window.addEventListener('load', pageViewLoggerFactory())
window.trackerjs = {
    identifyUser: identifyUserFactory()
}
