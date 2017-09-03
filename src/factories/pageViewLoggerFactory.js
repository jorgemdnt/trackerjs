import pageViewLogger from '../core/pageViewLogger'
import TrackerAPIGateway from '../gateways/TrackerAPIGateway'
import StorageGatewayFactory from './StorageGatewayFactory'

const pageViewLoggerFactory = () => {
    return pageViewLogger(StorageGatewayFactory.make(), new TrackerAPIGateway())
}

export default pageViewLoggerFactory
