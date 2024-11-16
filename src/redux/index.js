import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import goalSlice from "./slices/goalSlice";
import workoutSlice from "./slices/workoutSlice";

const rootReducer = {
  profileSlice: profileSlice.reducer,
  authSlice: authSlice.reducer,
  goalSlice: goalSlice.reducer,
  workoutSlice: workoutSlice.reducer,
};

export default rootReducer;
