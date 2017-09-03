const pageViewLogger = (storageGateway, trackerAPIGateway) => ({ target }) => {
    const userEmail = storageGateway.getUserEmail()
    const trackedPage = {
        path: target.location.href,
        timestamp: Date.now()
    }

    if (userEmail)
        trackerAPIGateway.trackPageView(userEmail, trackedPage)
    else
        storageGateway.trackPageView(trackedPage)
}

export default pageViewLogger
