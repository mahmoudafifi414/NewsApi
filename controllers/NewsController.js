import NewsModel from '../models/News'

export class NewsController {
    getAllNews(req, res) {
        NewsModel.find({}).sort([['title', 'ascending']]).exec(function (err, news) {
            if (err) return res.status(500).json({message: "Error in adding News"});
            res.json(news.length == 0 ? {'message': 'there is no News'} : {'News': news})
        });
    }

    addNews(req, res) {
        const newsInstance = new NewsModel({
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            textBody: req.body.textBody,
        });
        newsInstance.save(function (err, news) {
            if (err) return res.status(500).json({message: "Error in adding News"});
            res.status(200).json({message: "News added successfully", collection: news});
        });
    }

    editNews(req, res) {
        NewsModel.findById(req.params.id, function (err, news) {
            if (err) return res.status(500).json({message: "Error in getting specific News"});
            res.status(200).json({collection: news});
        });
    }

    updateNews(req, res) {

    }

    deleteNews(req, res) {
        const id = req.params.id
        NewsModel.deleteOne({_id: id}, function (err, result) {
            if (err) return res.status(500).json({message: "Error in deleting Contact"});
            if (result.n !== 0) {
                return res.status(200).json({message: 'Contact removed successfully'})
            }
            return res.status(200).json({message: 'Contact not found or removed before'})
        })
    }
}