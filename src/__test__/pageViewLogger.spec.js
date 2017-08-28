import StorageGatewayFake from './doubles/StorageGatewayFake'
import pageViewLogger from '../pageViewLogger'

jest.mock('uuid', () => ( { v4: jest.fn(() => 'USER_ID') } ))

describe('pageViewLogger', () => {
    const PATHNAME = '/home/'
    const ORIGIN = 'facebook.com'
    const TITLE = 'Home'
    const EVENT = {
        target: {
            location: {
                pathname: PATHNAME,
                origin: ORIGIN
            },
            title: TITLE
        }
    }
    let storageGateway

    beforeEach(() => {
        storageGateway = new StorageGatewayFake()
    })

    test('Should track page view with new userId when user not tracked yet', () => {
        pageViewLogger(storageGateway)(EVENT)

        expect(storageGateway.getPageViews()).toEqual([{ 
            path: PATHNAME,
            pageTitle: TITLE,
            origin: ORIGIN
        }])
        expect(storageGateway.getUserId()).toEqual('USER_ID')
    })

    test('Should use previous userId when user already tracked', () => {
        const expectedUserId = 'PREEXISTING_USER_ID'
        storageGateway.trackPageView(expectedUserId, { 
            path: PATHNAME,
            pageTitle: TITLE,
            origin: ORIGIN
        })

        pageViewLogger(storageGateway)(EVENT)

        expect(storageGateway.getUserId()).toBe(expectedUserId)
    })
})
