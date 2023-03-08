import express from "express";
import mongoose from "mongoose";
import TourModel from "../models/tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;
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
  try {
    const tours = await TourModel.find();
    res.status(200).json(tours);
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
    await TourModel.findByIdAndUpdate(id, updatedTour, { new: true });
    res.status(200).json(updatedTour);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const tours = await TourModel.find({ title });
    res.json(tours);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong." });
  }
};
