// routes/commonRoutes.js
const express = require("express");
const projectRoutes = express.Router();
const projectModel = require("../models/Projects");

projectRoutes.route("/create").post(async (req, res, next) => {
        await projectModel.create(req.body)
            .then((result) => {
                res.json({
                    data: result,
                    message: "Item added successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });

    projectRoutes.route("/getAll").get(async (req, res, next) => {
        await projectModel.find()
            .then((result) => {
                res.json({
                    data: result,
                    message: "All items retrieved successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });
    projectRoutes.route("/getByuserId").post(async (req, res, next) => {
        const { email } = req.body;
    
        await projectModel.find({ email })
            .then((result) => {
                console.log(email)
                if (result) {
                    res.json({
                        data: result,
                        message: "User details retrieved successfully",
                        status: 200,
                    });
                } else {
                    res.status(404).json({
                        message: "User not found",
                        status: 404,
                    });
                }
            })
            .catch((err) => {
                return next(err);
            });
    });
    projectRoutes.route("/get/:id").get(async (req, res, next) => {
        await projectModel.findById(req.params.id)
            .then((result) => {
                res.json({
                    data: result,
                    message: "Item details retrieved successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });

    projectRoutes.route("/update/:id").put(async (req, res, next) => {
        await projectModel.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            .then((result) => {
                console.log(result);
                res.json({
                    data: result,
                    message: "Item updated successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });

    projectRoutes.route("/delete/:id").delete(async (req, res, next) => {
        await projectModel.findByIdAndDelete(req.params.id)
            .then(() => {
                res.json({
                    message: "Item deleted successfully",
                    status: 200,
                });
            })
            .catch((err) => {
                return next(err);
            });
    });

  


module.exports = projectRoutes;
