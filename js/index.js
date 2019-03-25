import {
    html,
    render
} from 'lit-html'

// top 15 jobs https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty
//get item https://hacker-news.firebaseio.com/v0/item/19471354.json?print=pretty
// get user https://hacker-news.firebaseio.com/v0/user/username.json?print=pretty
const jobsTemplate = (posts) => html `${posts.map((post) => html`<li><a href="${post.url}">${post.title}</a> by <a href="/user?username=${post.author}">${post.author}</a></li>`)}`;
const userTemplate = (user) => html `id: ${user.id}, karma: ${user.karma}`
const requestJobs = async () => {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty');
    const json = await response.json();
    return json
}

const requestPost = async (postId) => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`)
    const json = await response.json();
    return json

}

const requestUser = async (userId) => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`)
    const json = await response.json();
    return json
}
const renderUser = async (userId) => {
    if (userId) {
        const response = await requestUser(userId)
        const user = new User({
            id: response.id,
            karma: response.karma
        })
        console.log(`rendering user ${user.id}`)
        render(userTemplate(user), document.body)
    }

}
const renderPosts = async () => {
    const listOfPosts = []
    console.log("rendering posts")
    const response = await requestJobs()

    // loop to create an array of Posts with {id, title, url}
    for (const postId of response) {
        const postInfo = await requestPost(postId)
        const post = new Post({
            id: postInfo.id,
            title: postInfo.title,
            url: postInfo.url,
            author: postInfo.by
        })
        listOfPosts.push(post)
    }
    render(jobsTemplate(listOfPosts), document.body)
}



class User {
    constructor({
        id,
        karma,
    }) {
        this.id = id
        this.karma = karma
    }

    //toJSON is automatically called on JSON.stringify(instanceof User)
    toJSON() {
        return {
            id: this.id,
            karma: this.karma
        }
    }
}

class Post {
    constructor({
        id,
        title,
        url,
        author
    }) {
        this.id = id
        this.title = title
        this.url = url
        this.author = author
    }

    //toJSON is automatically called on JSON.stringify(instanceof Post)
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            url: this.url,
            author: this.author
        }
    }
}



// match routes with paths
// grab recipe by id param for edit route
const routes = {
    '/': renderPosts,
    '/user': async function (params) {
        const userId = params.get('username')
        renderUser(userId)
    }

}


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

// on page load/reload, set appropriate route
;
(async () => {
    const url = new URL(
        window.location.pathname + window.location.search,
        window.location.origin
    )
    if (routes[window.location.pathname]) {
        await routes[window.location.pathname](url.searchParams)
    } else routes['/error']()
})()

