import { Request, Response } from "express";
import mongoose from "mongoose";
import Car from "../models/car";

// View all cars
export const getAllCars = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const cars = await Car.find({});
    return res.status(200).json(cars);
  } catch (e) {
    return res.status(404).json({ e: "Seems like no cars are available" });
  }
};

// View a single car
export const getACar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ e: "Seems ID is not valid" });
    }

    const car = await Car.findById(id);
    if (car) {
      return res.status(200).json(car);
    } else {
      return res.status(404).json({ e: "No such car found" });
    }
  } catch (e) {
    return res.status(404).json({ e: "Seems no such file" });
  }
};

// Delete a car
export const deleteACar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ e: "Seems ID is not valid" });
    }

    const car = await Car.findOneAndDelete({ _id: id });
    if (car) {
      return res.status(200).json(car);
    } else {
      return res.status(404).json({ e: "No such car found" });
    }
  } catch (e) {
    return res.status(404).json({ e: "Seems no such file" });
  }
};

// Update a car
export const updateACar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log("response\n", req.body);
    console.log("\nresponse params", req.params, "\n");
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ e: "Seems ID is not valid" });
    }

    const car = await Car.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (car) {
      return res.status(200).json(car);
    } else {
      return res.status(404).json({ e: "No such car found" });
    }
  } catch (e) {
    return res.status(404).json({ e: "Seems no such file" });
  }
};

// Add a new car
export const addACar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { owner, car_model, car_numberplate, job_status, job_progress } =
    req.body; // deconstruction
  try {
    const car = await Car.create({
      owner,
      car_model,
      car_numberplate,
      job_status,
      job_progress,
    });
    console.log(car); // testing ########
    return res.status(200).json(car);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e: "Seems unable to add file" });
  }
};
