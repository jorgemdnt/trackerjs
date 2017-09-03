import LocalStorageGateway from '../gateways/LocalStorageGateway'
import CookieStorageGateway from '../gateways/CookieStorageGateway'

class StorageGatewayFactory {
    static make() {
        if (window.localStorage)
            return new LocalStorageGateway(window.localStorage)
        else
            return new CookieStorageGateway()
    }
}

export default StorageGatewayFactory
