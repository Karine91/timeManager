import { Box } from "@chakra-ui/react";

interface IProps {
  size: number;
  thickness: number;
  value: number;
  color: string;
}

const Circle = ({ size, thickness, color, value }: IProps) => {
  const mainCenter = size / 2;
  const outerCirclesWidth = 1.5;
  const outerColor = "cyan.200";
  const trackColor = "gray.300";

  const radiusOuterCircle = size / 2 - outerCirclesWidth / 2;
  const radius = radiusOuterCircle - outerCirclesWidth / 2 - thickness / 2;
  const radiusInnerCircle = radius - thickness / 2 - outerCirclesWidth / 2;

  const circumference = 2 * Math.PI * radius;
  const _value = Math.min(value, 100);

  const progress = circumference - (_value / 100) * circumference;

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

{
  /* <>
  <Circle size={200} thickness={14} value={80} color="url(#cl1)" />
  <svg width="0" height="0">
    <defs>
      <linearGradient
        id="cl1"
        gradientUnits="objectBoundingBox"
        gradientTransform="rotate(90)"
      >
        <stop stopColor="#1A365D" />
        <stop offset="25%" stopColor="#2B6CB0" />
        <stop offset="50%" stopColor="#3182CE" />
        <stop offset="75%" stopColor="#4299E1" />
        <stop offset="100%" stopColor="#63B3ED" />
      </linearGradient>
    </defs>
  </svg>
</>; */
}
