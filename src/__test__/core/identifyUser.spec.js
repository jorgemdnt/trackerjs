import StorageGatewayFake from '../doubles/StorageGatewayFake'
import TrackerAPIGatewaySpy from '../doubles/TrackerAPIGatewaySpy'
import identifyUser from '../../core/identifyUser'

describe('identifyUser', () => {
    const PAGE_VIEWS_STORED = [{
        path: 'http://trackedpage.com',
        timestamp: 1504446923512
    }, {
        path: 'http://trackedpage.com/contact',
        timestamp: 1504446911512
    }]
    const USER_EMAIL = 'user@email.com'
    let storageGateway
    let trackerAPIGateway

    beforeEach(() => {
        storageGateway = new StorageGatewayFake()
        trackerAPIGateway = new TrackerAPIGatewaySpy()
    })

    test('Should store user email', () => {
        identifyUser(storageGateway, trackerAPIGateway)(USER_EMAIL)

        const userEmail = storageGateway.getUserEmail()
        expect(userEmail).toEqual(USER_EMAIL)
    })

    test('Should send to tracker API the stored page views and user email', () => {
        storageGateway.pageViewsTracked = PAGE_VIEWS_STORED

        identifyUser(storageGateway, trackerAPIGateway)(USER_EMAIL)

        expect(trackerAPIGateway.spiedIdentifyUser).toEqual({
            userEmail: USER_EMAIL,
            pageViewsTracked: PAGE_VIEWS_STORED
        })
    })
})
