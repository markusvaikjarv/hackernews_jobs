import {userTemplate, jobsTemplate} from './templates'
import {render} from 'lit-html'
import {User, Post} from './classes'
import {requestJobs, requestUser, requestPost} from './requests'

export const renderUser = async (userId) => {
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
export const renderPosts = async () => {
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