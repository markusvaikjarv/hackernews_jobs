import {renderPosts, renderUser} from './renders'
import {instantiateRouter} from './router'

// top 15 jobs https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty
//get item https://hacker-news.firebaseio.com/v0/item/19471354.json?print=pretty
// get user https://hacker-news.firebaseio.com/v0/user/username.json?print=pretty

// match routes with render functions
const routes = {
    '/': renderPosts,
    '/user': async function (params) {
        const userId = params.get('username')
        renderUser(userId)
    } //todo: /error route

}

//starts the router with specified routes
instantiateRouter(routes)


