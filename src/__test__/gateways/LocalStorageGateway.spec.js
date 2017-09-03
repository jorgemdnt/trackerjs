import LocalStorageFake from '../doubles/LocalStorageFake'
import LocalStorageGateway from '../../gateways/LocalStorageGateway'

describe('LocalStorageGateway', () => {
    const PATH = 'http://trackedpage.com'
    const TIMESTAMP = 1504446923512
    var gateway
    var localStorage

    beforeEach(() => {
        localStorage = new LocalStorageFake()
        gateway = new LocalStorageGateway(localStorage)
    })

    describe('trackPageView', () => {
        test('Should save page track to local storage', () => {
            gateway.trackPageView({ path: PATH, timestamp: TIMESTAMP })

            const pagesTracked = localStorage.getItem('pageViewsTracked')
            expect(JSON.parse(pagesTracked)).toEqual([{
                path: PATH,
                timestamp: TIMESTAMP
            }])
        })

        test('Should not overwrite page views already tracked', () => {
            const pageTracked = { path: 'http://trackedpage.com/contact/', timestamp: 'Sun Aug 27 2017 21:40:15 GMT-0300 (-03)' }
            localStorage.setItem('pageViewsTracked', JSON.stringify([pageTracked]))

            gateway.trackPageView({ path: PATH, timestamp: TIMESTAMP })

            const pagesTracked = localStorage.getItem('pageViewsTracked')
            expect(JSON.parse(pagesTracked)).toEqual([
                pageTracked,
                {
                    path: PATH,
                    timestamp: TIMESTAMP
                }
            ])
        })

        test('Should get pages tracked from localStorage in json format', () => {
            const pageTracked = { path: PATH, timestamp: TIMESTAMP }
            localStorage.setItem('pageViewsTracked', JSON.stringify([pageTracked]))

            const pagesTracked = gateway.getPageViewsTracked()

            expect(pagesTracked).toEqual([pageTracked])
        })
    })

    describe('getUserEmail', () => {
        test('Should get user email when set', () => {
            const userEmail = 'user@email.com'
            localStorage.setItem('userEmail', userEmail)

            expect(gateway.getUserEmail()).toEqual(userEmail)
        })

        test('Should get null when userEmail not defined', () => {
            expect(gateway.getUserEmail()).toBeNull()
        })
    })

    describe('setUserEmail', () => {
        test('Should define user email on key userEmail', () => {
            const userEmail = 'user@email.com'

            gateway.setUserEmail(userEmail)

            const userEmailStored = localStorage.getItem('userEmail')
            expect(userEmailStored).toEqual(userEmail)
        })
    })
})
