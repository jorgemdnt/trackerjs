import { v4 } from 'uuid'

const pageViewLogger = storageGateway => ({ target }) => {
    const { location } = target

    const userId = storageGateway.getUserId() || v4()

    storageGateway.trackPageView(userId, { path: location.path, timestamp: new Date().toString() })
}

export default pageViewLogger
