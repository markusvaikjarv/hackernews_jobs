import {html} from 'lit-html'

export const jobsTemplate = (posts) => html `${posts.map((post) => html`<tr><a href="${post.url}">${post.title}</a> by <a href="/user?username=${post.author}">${post.author}</a></tr>`)}`;

export const userTemplate = (user) => html `id: ${user.id}, karma: ${user.karma}`