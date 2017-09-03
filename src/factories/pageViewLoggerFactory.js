import pageViewLogger from '../core/pageViewLogger'
import LocalStorageGateway from '../gateways/LocalStorageGateway'
import CookieStorageGateway from '../gateways/CookieStorageGateway'
import TrackerAPIGateway from '../gateways/TrackerAPIGateway'

const pageViewLoggerFactory = () => {
    if (window.localStorage)
        return pageViewLogger(new LocalStorageGateway(window.localStorage), new TrackerAPIGateway())
    else
        return pageViewLogger(new CookieStorageGateway(), new TrackerAPIGateway())
}

export default pageViewLoggerFactory
