const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//create workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200);
    res.json(workout);
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
};

// get all workouts in the db

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 }); // sorts by created time and dates, the latest will be on top of the stack
     
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a single workout

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "no such workout found in the database reevaluate your request",
    });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "no workout like that found here" });
  }
  res.status(200).json({ workout });
};

// delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "no such workout found in the database reevaluate your request",
    });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "no workout like that found here" });
  }
  res.status(200).json({ workout });
};

// Update a workout

const updateWorkout  = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"there no workout like this here"})
    }
    const workout = await Workout.findByIdAndUpdate({_id:id}, {...req.body})
     if (!workout) {
    return res.status(404).json({ error: "no workout like that found here" });
  }
  res.status(200).json({ workout });

}

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
};
