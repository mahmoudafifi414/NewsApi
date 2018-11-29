import mongoose from 'mongoose'

class News extends mongoose.Schema {
    constructor() {
        //schema building (mongo is schemaless)
        super({
            date: {type: Date, default: Date.now, required: true},
            title: {type: String, required: true},
            description: {type: String, required: true, required: true},
            textBody: {type: String, required: true},
        })
    }
}

export default mongoose.model('NewsModel', new News)