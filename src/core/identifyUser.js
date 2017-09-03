const identifyUser = (storageGateway, trackerAPIGateway) => (email) => {
    storageGateway.setUserEmail(email)
    const storedPageViews = storageGateway.getPageViewsTracked()
    trackerAPIGateway.identifyUser(email, storedPageViews)
}

export default identifyUser
