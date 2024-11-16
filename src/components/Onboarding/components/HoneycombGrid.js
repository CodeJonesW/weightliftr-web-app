import React, { useState } from "react";
import {
  SportsEsports as SportsEsportsIcon,
  MusicNote as MusicNoteIcon,
  Lightbulb as LightbulbIcon,
  Workspaces as WorkspacesIcon,
  Computer as ComputerIcon,
  Star as StarIcon,
  Headphones as HeadphonesIcon,
  CameraAlt as CameraAltIcon,
  PhoneAndroid as PhoneAndroidIcon,
  Science as ScienceIcon,
  AutoFixHigh as AutoFixHighIcon,
  ElectricBolt as ElectricBoltIcon,
  SportsSoccer as SportsSoccerIcon,
  RocketLaunch as RocketLaunchIcon,
  Pets as PetsIcon,
  Code as CodeIcon,
  BugReport as BugReportIcon,
  TravelExplore as TravelExploreIcon,
  FitnessCenter as FitnessCenterIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import "./HoneycombGrid.css";

const icons = [<FitnessCenterIcon fontSize="medium" />];

const HoneycombGrid = ({ structure }) => {
  const theme = useTheme();
  const [rippleEffect, setRippleEffect] = useState({
    active: false,
    x: 0,
    y: 0,
  });

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRippleEffect({ active: true, x, y });

    setTimeout(() => {
      setRippleEffect({ active: false, x: 0, y: 0 });
    }, 500);
  };

  let iconIndex = 0;

  return (
    <div id="honeycomb-container" className="container">
      {structure.map((col, colIndex) => (
        <div key={colIndex} className="column" style={{ "--column": colIndex }}>
          {Array.from({ length: col }).map((_, rowIndex) => {
            const icon = icons[iconIndex % icons.length];
            iconIndex++;

            return (
              <div
                key={rowIndex}
                className="hexagon"
                onClick={handleClick}
                style={{
                  color: theme.palette.primary.main,
                }}
              >
                {icon}
                {rippleEffect.active && (
                  <span
                    className="ripple"
                    style={{
                      left: rippleEffect.x,
                      top: rippleEffect.y,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default HoneycombGrid;
