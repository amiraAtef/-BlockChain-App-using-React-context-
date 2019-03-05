import {AppConfig} from 'blockstack'
console.log(AppConfig)

export const appConfig= new AppConfig(['store_write','publish_data'])
export const POST_FILENAME = 'posts.json'