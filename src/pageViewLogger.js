import { v4 } from 'uuid'

const pageViewLogger = (storageGateway, trackerAPIGateway) => ({ target }) => {
    const userEmail = storageGateway.getUserEmail()
    const trackedPage = {
        path: target.location.path,
        timestamp: new Date().toString()
    }

    if (userEmail)
        trackerAPIGateway.trackPageView(userEmail, trackedPage)
    else
        storageGateway.trackPageView(trackedPage)
}

export default pageViewLogger
