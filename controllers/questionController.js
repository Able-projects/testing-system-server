const Questions = require('../models/Questions')

createQuestions = (req, res) => {
    const body = req.body
    if (!body) { 
        return res.status(400).json({ success: false, error: 'You must provide a Questions info', }) 
    }
    const newQuestions = new Questions(body)
    if (!newQuestions) { 
        return res.status(400).json({ success: false, error: err })
    }
    newQuestions.save().then(() => {
        return res.status(201).json({
            success: true,
            id: newQuestions._id,
            message: 'Questions is created!',
        })
    })
    .catch(error => { return res.status(400).json({ error, message: 'Questions not created!', })
    })
}


getQuestions = async (req, res) => {
    await Questions.find({}, (err, questions) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!questions.length) {
    return res
        .status(404)
        .json({ success: false, error: `questions not found` })
    }
    return res.status(200).json({ success: true, data: questions })
    }).catch(err => console.log(err))
}

updateQuestions = async (req, res) => {
    const body = req.body
    if (!body) { return res.status(400).json({ success: false, error: 'You must provide a body to update', }) }
        Questions.findOne({ _id: req.params.id }, (err, questions) => {
    if (err) { return res.status(404).json({ err, message: 'Questions not found!', }) }
    questions.question = body.question
    questions.option1 = body.option1
    questions.option2 = body.option2
    questions.option3 = body.option3
    questions.option4 = body.option4
    questions.option5 = body.option5
    questions.answer = body.answer
    questions.sectionId = body.sectionId
    questions.levelId = body.levelId
    questions.score = body.score
    questions.save().then(() => {
    return res.status(200).json({
        success: true,
        id: Questions._id,
        message: 'Questions updated!',
        })
    })
    .catch(error => { return res.status(404).json({ error, message: 'Questions not updated!', }) })
    })
}

deleteQuestions = async (req, res) => {
    await Questions.findOneAndDelete({ _id: req.params.id }, (err, questions) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!questions) {
        return res
        .status(404)
        .json({ success: false, error: `Questions not found` })
    }
    return res.status(200).json({ success: true, data: questions })
    }).catch(err => console.log(err))
}


module.exports = {
    createQuestions,
    updateQuestions,
    deleteQuestions,
    getQuestions
}