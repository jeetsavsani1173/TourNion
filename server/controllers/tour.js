import express from "express";
import mongoose from "mongoose";
import TourModel from "../models/tour.js";
import cloudinary from "../config/cloudinary.js";

export const createTour = async (req, res) => {
  const tour = req.body;
  let result;
  try {
    result = await cloudinary.uploader.upload(tour.imageFile, {
      folder: "TourNion",
    });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong. cloudinary" });
  }
  tour.imageFile = result.secure_url;
  const newTour = new TourModel({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getTours = async (req, res) => {
  const { page } = req.query;
  try {
    // const tours = await TourModel.find();
    // res.status(200).json(tours);
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await TourModel.countDocuments({});
    const tours = await TourModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    res.json({
      data: tours,
      currentPage: Number(page),
      totalHours: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModel.findById(id);
    res.status(200).json(tour);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getToursByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist." });
  }

  const userTours = await TourModel.find({ creator: id });
  res.status(200).json(userTours);
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Tour doesn't exist." });
    }
    await TourModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Tour deleted successfully." });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Tour doesn't exist with id: " + id });
    }
    const updatedTour = {
      title,
      description,
      creator,
      imageFile,
      tags,
      _id: id,
    };
    // by default findByIdAndUpdate returns the old object, so we need to pass { new: true } to get the updated object
    await TourModel.findByIdAndUpdate(id, updatedTour, { new: true });
    res.status(200).json(updatedTour);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    // what is RegExp?
    // regular expression is a sequence of characters that forms a search pattern
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    // title is in this form : /searchQuery/i (i is for case insensitive)
    // what is the meaning of case insensitive? => if we search for "tour" it will also return "Tour" and "TOUR"
    const title = new RegExp(searchQuery, "i");
    const tours = await TourModel.find({ title });
    res.json(tours);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getToursByTags = async (req, res) => {
  const { tag } = req.params;
  try {
    const tours = await TourModel.find({ tags: { $in: tag } });
    res.json(tours);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getRelatedTours = async (req, res) => {
  const tags = req.body;
  try {
    const tours = await TourModel.find({ tags: { $in: tags } });
    res.json(tours);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const likeTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Tour doesn't exist." });
    }

    const tour = await TourModel.findById(id);

    const index = tour.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      tour.likes.push(req.userId);
    } else {
      tour.likes = tour.likes.filter((id) => id !== String(req.userId));
    }

    const updatedTour = await TourModel.findByIdAndUpdate(id, tour, {
      new: true,
    });

    res.status(200).json(updatedTour);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};
