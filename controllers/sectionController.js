const Section = require('../models/Section')

createSection = (req, res) => {
    const body = req.body
    if (!body) { 
        return res.status(400).json({ success: false, error: 'You must provide a Section info', }) 
    }
    const newSection = new Section(body)
    if (!newSection) { 
        return res.status(400).json({ success: false, error: err })
    }
    newSection.save().then(() => {
        return res.status(201).json({
            success: true,
            id: newSection._id,
            message: 'Section is created!',
        })
    })
    .catch(error => { return res.status(400).json({ error, message: 'Section not created!', })
    })
}


getSections = async (req, res) => {
    await Section.find({}, (err, sections) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!sections.length) {
    return res
        .status(404)
        .json({ success: false, error: `Sections not found` })
    }
    return res.status(200).json({ success: true, data: sections })
    }).catch(err => console.log(err))
}

updateSection = async (req, res) => {
    const body = req.body
    if (!body) { return res.status(400).json({ success: false, error: 'You must provide a body to update', }) }
        Section.findOne({ _id: req.params.id }, (err, section) => {
    if (err) { return res.status(404).json({ err, message: 'Section not found!', }) }
        section.name = body.name
        section.save().then(() => {
    return res.status(200).json({
        success: true,
        id: section._id,
        message: 'Section updated!',
        })
    })
    .catch(error => { return res.status(404).json({ error, message: 'Section not updated!', }) })
    })
}

deleteSection = async (req, res) => {
    await Section.findOneAndDelete({ _id: req.params.id }, (err, section) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    if (!section) {
        return res
        .status(404)
        .json({ success: false, error: `Section not found` })
    }
    return res.status(200).json({ success: true, data: section })
    }).catch(err => console.log(err))
}


module.exports = {
    createSection,
    updateSection,
    deleteSection,
    getSections
}