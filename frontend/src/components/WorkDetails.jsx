// import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const {dispatch} = useWorkoutsContext();

  const deleteWorkout = async (id) => {
    try {
      alert(
        "item has been deleted from the list of the items that were created in the table"
      );
      const result = await fetch(`api/workouts/` + workout._id, {
        method: "DELETE",
      });

      const json = await result.json();

      if (result.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
      }

      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
    </div>
  );
};

export default WorkoutDetails;
