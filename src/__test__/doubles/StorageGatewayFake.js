class StorageGatewayFake {
    constructor () {
        this.pageViewsSaved = []
    }

    savePageView(pageTitle, path, origin) {
        this.pageViewsSaved.push({
            pageTitle,
            path,
            origin
        })
    }

    getPageViews () {
        return this.pageViewsSaved
    }
}

export default StorageGatewayFake
