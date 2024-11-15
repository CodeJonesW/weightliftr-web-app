import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import goalSlice from "./slices/goalSlice";

const rootReducer = {
  profileSlice: profileSlice.reducer,
  authSlice: authSlice.reducer,
  goalSlice: goalSlice.reducer,
};

export default rootReducer;
