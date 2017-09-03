import identifyUser from '../core/identifyUser'
import StorageGatewayFactory from './StorageGatewayFactory'
import TrackerAPIGateway from '../gateways/TrackerAPIGateway'

const identifyUserFactory = () => {
    return identifyUser(StorageGatewayFactory.make(), new TrackerAPIGateway())
}

export default identifyUserFactory
