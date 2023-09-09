import { useEffect } from "react";
import WorkoutDetails from "../components/WorkDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


// components

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/");
      const json = await response.json();

      if (response.ok) {
        dispatch({type:'SET_WORKOUT', payload: json});
        console.log("data is being fetched successfully");
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <div>{<WorkoutForm />}</div>
    </div>
  );
};

export default Home;
