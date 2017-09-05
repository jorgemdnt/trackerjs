const identifyUser = (storageGateway, trackerAPIGateway) => (email) => {
    storageGateway.setUserEmail(email)
    const storedPageViews = storageGateway.getPageViewsTracked()
    return trackerAPIGateway.identifyUser(email, storedPageViews)
}

export default identifyUser
