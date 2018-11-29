import {NewsController} from "../controllers/NewsController";

export class NewsRouter {

    constructor(app) {
        this.newsController = null
        this.setOneInstanceOfNewsController()
        this.fireRoutes(app)
    }

    fireRoutes(app) {
        //route to get all news
        app.get('/api/news', (req, res) => {
            this.newsController.getAllNews(req, res)
        })
        //route to add news
        app.post('/api/news/add', (req, res) => {
            this.newsController.addNews(req, res)
        })
        //route to edit specific news
        app.get('/api/news/edit/:id', (req, res) => {
            this.newsController.editNews(req, res)
        })
        //route to update specific news
        app.patch('/api/news/update/:id', (req, res) => {
            this.newsController.updateNews(req, res)
        })
        //route to delete specificnews
        app.delete('/api/news/delete/:id', (req, res) => {
            this.newsController.deleteNews(req, res)
        })
        //riute to filter news
        app.post('/api/news/filter', (req, res) => {
            this.newsController.filter(req, res)
        })
    }

//assuring singlton of newsconreoller (may be anti pattern)
    setOneInstanceOfNewsController() {
        if (this.newsController == null) {
            this.newsController = new NewsController()
        }
    }
}
