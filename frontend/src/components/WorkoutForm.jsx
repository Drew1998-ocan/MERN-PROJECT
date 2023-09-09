import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  
  // const [data, setData] = useState({
  //   title: "",
  //   reps: "",
  //   load: "",
  // });
  const [error,setError] = useState(null);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setData((prev) => {
  //     if (name === "title") {
  //       return {
  //         title: value,
  //         reps: prev.reps,
  //         load: prev.load,
  //       };
  //     } else if (name === "reps") {
  //       return {
  //         title: prev.title,
  //         reps: value,
  //         load: prev.load,
  //       };
  //     } else if (name === "load") {
  //       return {
  //         title: prev.title,
  //         reps: prev.reps,
  //         load: value,
  //       };
  //     }
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const workout = { title, reps, load };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: { "content-Type": "application/json" },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log(json.error);

      if (response.ok) {
        // setData({
        //   title: "",
        //   reps: "",
        //   load: "",
        // });
        setLoad("");
        setTitle("");
        setReps("");
        setError(null);
        dispatch({ type: "CREATE_WORKOUT", payload: json });
        console.log("workout uploaded and added successfully", json);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Add a workout into your data</h3>
        <label>Workout title : </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          value={title}
        />

        <label>Workout Reps : </label>
        <input
          onChange={(e) => setReps(e.target.value)}
          type="text"
          name="reps"
          value={reps}
        />

        <label>Workout load : </label>
        <input
          onChange={(e) => setLoad(e.target.value)}
          type="text"
          name="load"
          value={load}
        />
        <button>Add Workout</button>
        {error && <div>{error}</div>
        
        }
      </form>
    </>
  );
};
export default WorkoutForm;
