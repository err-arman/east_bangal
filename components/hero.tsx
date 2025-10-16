"use client";


export function Hero() {
  return (
    <section className="relative w-full h-[57vh] lg:h-[86vh] overflow-hidden">
      {/* Background image */}
      <img
        src="images/hero-section.jpg"
        alt="Coffee shop background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for slight dimming */}
      <div className="absolute inset-0 bg-black/20" />


      {/* Curved text + circular logo */}
      <div className="relative z-10 flex items-center justify-center w-full h-full lg:items-center lg:justify-end lg:pr-[420px]">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:relative lg:top-auto lg:translate-y-0 lg:mb-0">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[470px] lg:h-[470px]">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/90 to-indigo-900/70 rounded-full border-indigo-500 shadow-2xl flex flex-col items-center justify-center">
              <img
                src="/images/butterfly.png"
                alt="Butterfly Logo"
                className="w-24 h-20 sm:w-32 sm:h-28 md:w-36 md:h-32 lg:w-48 lg:h-44 object-contain"
              />
            </div>

            <svg
              width="100%"
              height="100%"
              viewBox="0 0 300 300"
              className="absolute inset-0 overflow-visible"
              suppressHydrationWarning
            >
              {(() => {
                const text = "THE COFFEE STORE";
                const characters = text.split("");
                const radius = 167;
                const letterSpacing = 30;
                const curveFactor = 1.0;
                const fontSize = 38;
                const strokeColor = "#7b4b00";
                const strokeWidth = 4;
                const fillColor = "#ffffff";
                const strokeOffsetX = 2;
                const strokeOffsetY = 2;

                const totalAngle =
                  (characters.length - 1) *
                  (letterSpacing / radius) *
                  curveFactor;
                const startAngle = -totalAngle / 2;

                return characters.map((char, i) => {
                  const angle =
                    startAngle + i * (letterSpacing / radius) * curveFactor;
                  const x = 150 + radius * Math.sin(angle);
                  const y = 150 - radius * Math.cos(angle);
                  const rotate = (angle * 180) / Math.PI;

                  return (
                    <g
                      key={i}
                      transform={`translate(${x},${y}) rotate(${rotate})`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      suppressHydrationWarning
                    >
                      {/* Stroke layer with offset */}
                      <text
                        x={strokeOffsetX}
                        y={strokeOffsetY}
                        style={{
                          fontFamily: "Impact, sans-serif",
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
                          fontFamily: "Impact, sans-serif",
                          fontSize,
                          fontWeight: "bold",
                          fill: fillColor,
                        }}
                        suppressHydrationWarning
                      >
                        {char}
                      </text>
                    </g>
                  );
                });
              })()}
            </svg>
          </div>
        </div>
      </div>

      {/* <CurvedText /> */}
    </section>
  );
}
