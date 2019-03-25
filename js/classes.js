export class Post {
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

export class User {
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