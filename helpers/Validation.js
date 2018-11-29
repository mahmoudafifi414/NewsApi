class Validation {
    validateAllParameters(req, validationType = null) {
        this.exceptionArray = []
        this.validateTitle(req, validationType)
        this.validateDescription(req, validationType)
        this.validateTextBody(req, validationType)
        return this.exceptionArray
    }

    validateTitle(req, validationType) {
        const title = req.body.hasOwnProperty('title')
        if (!title && validationType !== 'update') {
            this.exceptionArray.push('there is no title provided in request')
        }
        if (title && req.body.title.length < 15 && validationType !== 'update') {
            this.exceptionArray.push('Title should be more than 15 characters')
        }
    }

    validateDescription(req, validationType) {
        const description = req.body.hasOwnProperty('description')
        if (!description && validationType !== 'update') {
            this.exceptionArray.push('there is no description provided in request')
        }
        if (description && req.body.description.length < 50 && validationType !== 'update') {
            this.exceptionArray.push('Description should be more than 50 characters')
        }
    }

    validateTextBody(req, validationType) {
        const textBody = req.body.hasOwnProperty('textBody')
        if (!textBody && validationType !== 'update') {
            this.exceptionArray.push('there is no text body provided in request')
        }
        if (textBody && req.body.textBody.length < 200 && validationType !== 'update') {
            this.exceptionArray.push('Text Body should be more than 200 characters')
        }
    }
}

export default new Validation()