import { Box } from "@chakra-ui/react";

interface IProps {
  size: number;
  thickness: number;
  value: number;
  color: string;
}

const Circle = ({ size, thickness, color, value }: IProps) => {
  const mainCenter = size / 2;
  const outerCirclesWidth = 3;
  const outerColor = "white";
  const trackColor = "gray.300";

  const radiusOuterCircle = size / 2 - outerCirclesWidth / 2;
  const radius = radiusOuterCircle - outerCirclesWidth / 2 - thickness / 2;
  const radiusInnerCircle = radius - thickness / 2 - outerCirclesWidth / 2;

  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <Box
        as="circle"
        cx={mainCenter}
        cy={mainCenter}
        r={radiusOuterCircle}
        fill="transparent"
        stroke={outerColor}
        sx={{
          strokeWidth: outerCirclesWidth,
        }}
      ></Box>
      <Box
        as="circle"
        cx={mainCenter}
        cy={mainCenter}
        r={radius}
        fill="transparent"
        stroke={trackColor}
        sx={{
          strokeWidth: thickness,
        }}
      ></Box>
      <Box
        as="circle"
        cx={mainCenter}
        cy={mainCenter}
        r={radius}
        fill="transparent"
        stroke={color}
        sx={{
          strokeWidth: thickness,
          strokeDashoffset: progress,
          strokeDasharray: `${circumference} ${circumference}`,
          transformOrigin: "center",
          transform: "rotate(-90deg)",
          transition: "stroke-dashoffset 0.3s",
          strokeLinecap: "round",
        }}
      ></Box>

      <Box
        as="circle"
        cx={mainCenter}
        cy={mainCenter}
        r={radiusInnerCircle}
        fill="transparent"
        stroke={outerColor}
        sx={{
          strokeWidth: outerCirclesWidth,
        }}
      ></Box>
      <circle></circle>
    </svg>
  );
};

export default Circle;
