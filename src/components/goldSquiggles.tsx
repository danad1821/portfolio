import React from "react";
import { useWindowDimensions } from "hooks/useWindowDimensions";

export default function GoldSquiggles() {
  const { width, height } = useWindowDimensions();
  const svgHeight = height-10;

  // Assuming the original squiggles are evenly spaced within the 800x800 viewBox
  const numSquiggles = 18;

  function scalePath(
    pathData: string,
    originalWidth: number,
    originalHeight: number,
    newWidth: number,
    newHeight: number
  ) {
    // Get the scaling factors for both axes
    const scaleX = newWidth / originalWidth;
    const scaleY = newHeight / originalHeight;

    // Split the path into commands and values
    // A simple regex to split based on capital letters (commands) and commas/spaces
    const parts = pathData.match(/[A-Z][^A-Z]*/g);

    if (!parts) {
      return pathData; // Return original if parsing fails
    }

    const newPathParts = parts.map((part: any) => {
      const command = part[0];
      const valuesString = part.substring(1).trim();

      // Check if there are any values to process
      if (valuesString.length === 0) {
        return command;
      }

      // Split the values by commas and spaces, then filter out empty strings
      const values = valuesString
        .split(/[,\s]+/)
        .filter((v: any) => v !== "")
        .map(Number);

      // Scale the coordinate values
      const newValues = values.map((value: any, index: number) => {
        // The `d` attribute values are always in pairs (x, y)
        // We check the index to know if we are scaling an x or y coordinate
        if (index % 2 === 0) {
          // x coordinate
          return value * scaleX;
        } else {
          // y coordinate
          return value * scaleY;
        }
      });

      // Rebuild the path part with the new values
      return `${command}${newValues.join(",")}`;
    });

    return newPathParts.join("");
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xlinkHref="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${svgHeight}`} // Adjusting the viewBox itself
      preserveAspectRatio="none" // Important to prevent distortion
      className="absolute"
    >
      <g strokeWidth="2" stroke="#b98a3cff" fill="none" strokeLinecap="round">
        {/*
          Using an array to map and render multiple squiggles.
          This makes the code much cleaner and easier to manage.
        */}
        {[...Array(numSquiggles)].map((_, index) => {
          // Calculate the dynamic Y-offset for each squiggle
          // This scales the original positions to the new height
          const yOffset = (index / (numSquiggles - 1)) * svgHeight;
          const originalPath =
            "M10,10C21.805555555555557,10.625,40.97222222222223,19.041666666666664,66.66666666666667,13C92.36111111111111,6.958333333333334,105.55555555555557,-22.333333333333332,133.33333333333334,-19C161.11111111111111,-15.666666666666668,172.22222222222223,27.333333333333332,200,29C227.77777777777777,30.666666666666668,238.8888888888889,-10.166666666666666,266.6666666666667,-11C294.44444444444446,-11.833333333333334,305.5555555555556,26.25,333.33333333333337,25C361.11111111111114,23.75,372.22222222222223, -20.333333333333332,400,-17C427.77777777777777,-13.666666666666668,438.8888888888889,40.791666666666664,466.6666666666667,41C494.44444444444446,41.208333333333336,505.5555555555556,-19.125,533.3333333333334,-16C561.1111111111111,-12.875,572.2222222222222,54.75,600,56C627.7777777777778,57.25,638.8888888888889,-5.416666666666667,666.6666666666667,-10C694.4444444444446,-14.583333333333332,707.6388888888889,29.833333333333332,733.3333333333334,34C759.0277777777778,38.166666666666664,778.1944444444445,15,790,10";
          return (
            <path
              key={index}
              d={scalePath(originalPath, 800, 800, width+60, svgHeight)}
              transform={`translate(-20, ${yOffset})`}
            />
          );
        })}
      </g>
    </svg>
  );
}
