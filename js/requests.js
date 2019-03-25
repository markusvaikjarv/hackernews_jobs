export const requestJobs = async () => {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty');
    const json = await response.json();
    return json
}

export const requestPost = async (postId) => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`)
    const json = await response.json();
    return json

}

export const requestUser = async (userId) => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/user/${userId}.json?print=pretty`)
    const json = await response.json();
    return json
}