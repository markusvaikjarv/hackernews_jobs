
export function instantiateRouter(routes) {
    // on popstate get parameters from url and pass them to route
    window.onpopstate = async () => {
        const url = new URL(
            window.location.pathname + window.location.search,
            window.location.origin
        )
        if (routes[window.location.pathname]) {
            await routes[window.location.pathname](url.searchParams)
        } else routes['/error']()
    }

    // on pop state get params from url and pass to route
    // if no such route, error
    // add route to browser history
    /*
    let onNavItemClick = async pathName => {
        const url = new URL(pathName, window.location.origin)
        const params = url.searchParams
        if (routes[url.pathname]) {
            window.history.pushState({}, pathName, window.location.origin + pathName)
            await routes[url.pathname](params)
        } else {
            window.history.pushState({}, '404', window.location.origin + '/404')
            routes['/error']()
        }
    }
    */
    // on page load/reload, set appropriate route

    //IIFE to set up router
    (async () => {
        const url = new URL(
            window.location.pathname + window.location.search,
            window.location.origin
        )
        if (routes[window.location.pathname]) {
            await routes[window.location.pathname](url.searchParams)
        } else routes['/error']()
    })()
}