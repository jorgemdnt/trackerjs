const pageViewLogger = storageGateway => ({ target }) => {
    const { title, location } = target
    storageGateway.savePageView(title, location.pathname, location.origin)
}

export default pageViewLogger
