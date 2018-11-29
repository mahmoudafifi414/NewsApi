import NewsModel from '../models/News'
import Validation from '../helpers/Validation'

export class NewsController {
    getAllNews(req, res) {
        NewsModel.find({}).sort([['title', 'ascending']]).exec(function (err, news) {
            if (err) return res.status(500).json({message: "Error in adding News"});
            res.json(news.length == 0 ? {'message': 'there is no News'} : {'News': news})
        });
    }

    addNews(req, res) {
        const validationErrors = Validation.validateAllParameters(req)
        if (validationErrors.length > 0) {
            res.status(400).json({message: "There is errors in request", errors: validationErrors});
        } else {
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
    }

    editNews(req, res) {
        NewsModel.findById(req.params.id, function (err, news) {
            if (err) return res.status(500).json({message: "Error in getting specific News"});
            res.status(200).json({collection: news});
        });
    }

    updateNews(req, res) {
        const validationErrors = Validation.validateAllParameters(req,'update')
        if (validationErrors.length > 0) {
            res.status(400).json({message: "There is errors in request", errors: validationErrors});
        } else {

            NewsModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, news) {
                if (err) return res.status(500).json({message: "Error in Updating specific News"});
                res.status(200).json({message: 'Updated successfully', collection: news});
            });
        }
    }

    deleteNews(req, res) {
        const id = req.params.id
        NewsModel.deleteOne({_id: id}, function (err, result) {
            if (err) return res.status(500).json({message: "Error in deleting News"});
            if (result.n !== 0) {
                return res.status(200).json({message: 'record removed successfully'})
            }
            return res.status(200).json({message: 'record not found or removed before'})
        })
    }
}