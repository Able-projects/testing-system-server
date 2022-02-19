const Level = require('../models/Level')

createLevel = (req, res) => {
    const body = req.body
    if (!body) { 
        return res.status(400).json({ success: false, error: 'You must provide a Level info', }) 
    }
    const newLevel = new Level(body)
    if (!newLevel) { 
        return res.status(400).json({ success: false, error: err })
    }
    newLevel.save().then(() => {
        return res.status(201).json({
            success: true,
            id: newLevel._id,
            message: 'Level is created!',
        })
    })
    .catch(error => { return res.status(400).json({ error, message: 'Level not created!', })
    })
}


getLevels = async (req, res) => {
    await Level.find({}, (err, levels) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!levels.length) {
    return res
        .status(404)
        .json({ success: false, error: `Levels not found` })
    }
    return res.status(200).json({ success: true, data: levels })
    }).catch(err => console.log(err))
}

updateLevel = async (req, res) => {
    const body = req.body
    if (!body) { return res.status(400).json({ success: false, error: 'You must provide a body to update', }) }
        Level.findOne({ _id: req.params.id }, (err, level) => {
    if (err) { return res.status(404).json({ err, message: 'Level not found!', }) }
        level.name = body.name
        level.save().then(() => {
    return res.status(200).json({
        success: true,
        id: level._id,
        message: 'Level updated!',
        })
    })
    .catch(error => { return res.status(404).json({ error, message: 'Level not updated!', }) })
    })
}

deleteLevel = async (req, res) => {
    await Level.findOneAndDelete({ _id: req.params.id }, (err, level) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!level) {
        return res
        .status(404)
        .json({ success: false, error: `Level not found` })
    }
    return res.status(200).json({ success: true, data: level })
    }).catch(err => console.log(err))
}


module.exports = {
    createLevel,
    updateLevel,
    deleteLevel,
    getLevels
}