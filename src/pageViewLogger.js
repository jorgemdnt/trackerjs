import { v4 } from 'uuid'

const pageViewLogger = storageGateway => ({ target }) => {
    if (!storageGateway.getUserId())
        storageGateway.saveUserId(v4())

    const { title, location } = target
    storageGateway.savePageView(title, location.pathname, location.origin)
}

export default pageViewLogger
