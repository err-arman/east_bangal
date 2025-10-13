"use client";

export const CurvedText = ({
  text = "THE COFFEE STORE",
  radius = 200,
  letterSpacing = 12,
  fontFamily = "Impact, sans-serif",
  strokeColor = "#7b4b00",
  strokeWidth = 8,
  fillColor = "#ffffff",
  fontSize = 64,
  strokeOffsetX = 3, // horizontal stroke offset
  strokeOffsetY = 3, // vertical stroke offset
}) => {
  const characters = text.split("");
  const totalAngle = (characters.length - 1) * (letterSpacing / radius);
  const startAngle = -totalAngle / 2;

  return (
    <svg
      width="100%"
      height="300"
      viewBox="-400 -400 800 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", display: "block", margin: "0 auto" }}
    >
      {characters.map((char, i) => {
        const angle = startAngle + i * (letterSpacing / radius);
        const x = radius * Math.sin(angle);
        const y = -radius * Math.cos(angle);
        const rotate = (angle * 180) / Math.PI;

        return (
          <g
            key={i}
            transform={`translate(${x},${y}) rotate(${rotate})`}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {/* Stroke layer with offset */}
            <text
              x={strokeOffsetX}
              y={strokeOffsetY}
              style={{
                fontFamily,
                fontSize,
                fontWeight: "bold",
                stroke: strokeColor,
                strokeWidth,
                fill: "none",
              }}
            >
              {char}
            </text>

            {/* Fill layer (main text) */}
            <text
              style={{
                fontFamily,
                fontSize,
                fontWeight: "bold",
                fill: fillColor,
              }}
            >
              {char}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// export default CurvedText;
