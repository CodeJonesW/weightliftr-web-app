import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import workoutSlice from "./slices/workoutSlice";

const rootReducer = {
  profileSlice: profileSlice.reducer,
  authSlice: authSlice.reducer,
  workoutSlice: workoutSlice.reducer,
};

export default rootReducer;
