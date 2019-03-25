import {html} from 'lit-html'

export const jobsTemplate = (posts) => html `${posts.map((post) => html`<li><a href="${post.url}">${post.title}</a> by <a href="/user?username=${post.author}">${post.author}</a></li>`)}`;

export const userTemplate = (user) => html `id: ${user.id}, karma: ${user.karma}`