import DottedMapModule from "dotted-map";
import fs from "fs";

const DottedMap = DottedMapModule.default;

const map = new DottedMap({ height: 50, grid: "vertical" });

const svg = map.getSVG({
  radius: 0.22,
  color: "#00000040",
  shape: "circle",
  backgroundColor: "#fdfdfd",
});

fs.writeFileSync("public/world-map.svg", svg);
console.log("Generated public/world-map.svg");
