const VodCategory = require('../models/VodCategory')
const VodStream = require('../models/VodStream')


module.exports.getVodCategories = async (req, res) => {

    try {
        const categories = await VodCategory.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.createVodCategory = async (req, res) => {
    try {
        console.log("Vod Category data:", req.body)
        const category = new VodCategory(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.updateVodCategory = async (req, res) => {
    try {
        const category = await VodCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: 'Not found' });
        res.json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.deleteVodCategory = async (req, res) => {
    try {
        await VodCategory.findOneAndDelete({ "category_id": req.params.id })
        res.json({ message: 'Deleted' });
        console.log("Vod Category deleted successfully!!")
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// _________________________________________________________


module.exports.getVodStreams = async (req, res) => {

    try {
        const streams = await VodStream.find();
        res.json(streams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.createVodStream = async (req, res) => {
    try
    {
        const { name, category_id, stream_icon } = req.body;
        const file = req.file ? req.file.originalname : null;
        if (!file) return res.status(400).json({ error: 'File is required' });
        const stream = new VodStream({
            name,
            category_id: parseInt(category_id),
            file,
            stream_icon: stream_icon || '',
            added: Date.now()
        });
        await stream.save();
        res.status(201).json(stream);
    }
    catch (err)
    {
        res.status(400).json({ error: err.message });
    }

}

module.exports.updateVodStream = async (req, res) => {
    try
    {
        const stream = await VodStream.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!stream) return res.status(404).json({ error: 'Not found' });
        res.json(stream);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports.deleteVodStream = async (req, res) => {
    try {
        const deleted = await VodStream.findOneAndDelete({ "vod_id": req.params.id })
        console.log("Deleted:", deleted)
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}
