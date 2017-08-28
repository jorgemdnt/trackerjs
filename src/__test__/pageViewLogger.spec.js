import PageViewStorageGatewayFake from './doubles/PageViewStorageGatewayFake'
import pageViewLogger from '../pageViewLogger'

const PATHNAME = '/home/'
const ORIGIN = 'facebook.com'
const TITLE = 'Home'
let storageGateway

beforeEach(() => {
    storageGateway = new PageViewStorageGatewayFake()
    console.log(storageGateway)
})

test('Should save location, target and timestamp to storage', () => {
    const event = {
        target: {
            location: {
                pathname: PATHNAME,
                origin: ORIGIN
            },
            title: TITLE
        }
    }

    pageViewLogger(storageGateway)(event)

    const pageViewsSaved = storageGateway.getPageViews()
    expect(pageViewsSaved)
        .toEqual([{
            path: PATHNAME,
            pageTitle: TITLE,
            origin: ORIGIN
        }])
})
