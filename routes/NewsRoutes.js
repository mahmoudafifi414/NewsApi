import {NewsController} from "../controllers/NewsController";

export class NewsRouter {

    constructor(app) {
        this.newsController = null
        this.setOneInstanceOfNewsController()
        this.fireRoutes(app)
    }

    fireRoutes(app) {
        app.get('/api/news', (req, res) => {
            this.newsController.getAllNews(req, res)
        })
        app.post('/api/news/add', (req, res) => {
            this.newsController.addNews(req, res)
        })
        app.get('/api/news/edit/:id', (req, res) => {
            this.newsController.editNews(req, res)
        })
        app.delete('/api/news/delete/:id', (req, res) => {
            this.newsController.deleteContact(req, res)
        })
    }

    setOneInstanceOfNewsController() {
        if (this.newsController == null) {
            this.newsController = new NewsController()
        }
    }
}
