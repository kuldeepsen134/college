const { News } = require("../model");
const { handleResponse, handleError, getPagination } = require("../utils/helper");

exports.create = async (req, res) => {
    try {
        const { title, sort_desc, detail } = req.body

        let file_URL = `/media/${req?.file?.filename}`

        const data = { title, sort_desc, detail, image_URL: file_URL };

        const newNews = new News(data);

        await newNews.save();

        const datad = { ...newNews._doc }

        handleResponse(res, datad, 201)
    } catch (error) {
        if (error.code === 11000) {
            handleError('This news already exists.', 400, res)
            return
        }
        handleError(error.message, 400, res)
    };
};

exports.find = async (req, res) => {
    try {
        const { role, q } = req.query;
        const searchFilter = q ? {
            $or: [
                { name: { $regex: new RegExp(q, 'i') } },
                { userName: { $regex: new RegExp(q, 'i') } }
            ]
        } : {};

        const users = await News.find({ ...searchFilter })

        const getUsers = users.filter((user) => user.role !== 'admin')

        const totalCount = await News.countDocuments()

        const getPaginationResult = await getPagination(req.query, getUsers, totalCount);

        handleResponse(res, getPaginationResult, 200)

    } catch (error) {
        handleError(error.message, 400, res)
    };
};

exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await News.findOne({ _id: id })
        handleResponse(res, user, 200)
    } catch (error) {
        handleError(error.message, 400, res)
    };
};

exports.update = async (req, res) => {
    try {
        const { title, sort_desc, detail } = req.body
        const { id } = req.params;

        let file_URL = `/media/${req.file.filename}`

        const data = { title, sort_desc, detail, image_URL: file_URL };

        await News.updateOne({ _id: id }, data, { new: true })
        res.status(200).send({ message: "News has been successfully update.", error: false })
    } catch (error) {
        handleError(error.message, 400, res)
    };
};