// app/members/MapChart.tsx
"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Tooltip } from "@/components/ui/tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/indonesia/indonesia-provinces.json";

interface Branch {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  members: number;
}

interface MapChartProps {
  branches: Branch[];
  onBranchClick?: (branchValue: string) => void;
}

export default function MapChart({ branches, onBranchClick }: MapChartProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [118, -2],
        scale: 1200,
      }}
      width={800}
      height={400}
      style={{ width: "100%", height: "100%" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#E5E7EB"
              stroke="#9CA3AF"
              strokeWidth={0.5}
              style={{
                default: { outline: "none" },
                hover: { fill: "#D1D5DB", outline: "none" },
                pressed: { fill: "#9CA3AF", outline: "none" },
              }}
            />
          ))
        }
      </Geographies>

      {branches.map((branch) => {
        const markerSize = Math.min(8 + branch.members * 2, 20);

        return (
          <Marker
            key={branch.id}
            coordinates={[branch.longitude, branch.latitude]}
            onClick={() => onBranchClick?.(branch.id)}
          >
            <circle
              r={markerSize}
              fill="#EF4444"
              stroke="#FFFFFF"
              strokeWidth={2}
              className="cursor-pointer hover:fill-red-700 transition-all duration-200"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
            />
            <text
              textAnchor="middle"
              y={4}
              className="text-xs font-bold fill-white pointer-events-none"
              style={{ fontSize: "10px" }}
            >
              {branch.members}
            </text>
            <title>
              {branch.name}: {branch.members} anggota
            </title>
          </Marker>
        );
      })}
    </ComposableMap>
  );
}
