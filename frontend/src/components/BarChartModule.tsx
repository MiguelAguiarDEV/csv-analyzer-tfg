import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

interface BarChartConfiguratorProps {
  columns: string[];
  xKey: string;
  yKey: string;
  barColor: string;
  title: string;
  setXKey: (v: string) => void;
  setYKey: (v: string) => void;
  setBarColor: (v: string) => void;
  setTitle: (v: string) => void;
  data: any[];
  limit: number;
  setLimit: (v: number) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (v: "asc" | "desc") => void;
  validXColumns: string[];
  validYColumns: string[];
}

export const BarChartConfigurator: React.FC<BarChartConfiguratorProps> = ({
  columns,
  xKey,
  yKey,
  barColor,
  title,
  setXKey,
  setYKey,
  setBarColor,
  setTitle,
  data,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  validXColumns,
  validYColumns,
}) => (
  <div className="flex flex-wrap gap-4 mb-4 items-end">
    <div>
      <label className="block text-xs font-semibold mb-1">Eje X</label>
      <select
        value={xKey}
        onChange={(e) => setXKey(e.target.value)}
        className="border rounded px-2 py-1"
      >
        {validXColumns.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-xs font-semibold mb-1">Eje Y</label>
      <select
        value={yKey}
        onChange={(e) => setYKey(e.target.value)}
        className="border rounded px-2 py-1"
      >
        {validYColumns.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-xs font-semibold mb-1">Color de barra</label>
      <input
        type="color"
        value={barColor}
        onChange={(e) => setBarColor(e.target.value)}
        className="w-8 h-8 p-0 border-none bg-transparent"
      />
    </div>
    <div>
      <label className="block text-xs font-semibold mb-1">Título</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-2 py-1"
      />
    </div>
    <div>
      <label className="block text-xs font-semibold mb-1">Ordenar por</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded px-2 py-1"
      >
        {[xKey, yKey].map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className="border rounded px-2 py-1 ml-2"
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
    <div>
      <label className="block text-xs font-semibold mb-1">
        Máximo de elementos
      </label>
      <input
        type="number"
        min={1}
        max={data.length}
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="border rounded px-2 py-1 w-20"
      />
    </div>
  </div>
);

interface BarChartDisplayProps {
  data: any[];
  xKey: string;
  yKey: string;
  barColor: string;
  title: string;
}

export const BarChartDisplay: React.FC<BarChartDisplayProps> = ({
  data,
  xKey,
  yKey,
  barColor,
  title,
}) => {
  // Calcular el rango automático para el eje Y
  const yValues = data.map((row) => Number(row[yKey])).filter((v) => !isNaN(v));
  const yMin = Math.min(...yValues, 0);
  const yMax = Math.max(...yValues, 10);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2">Gráfica de Barras</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 40, right: 30, left: 20, bottom: 40 }}
          barCategoryGap={"20%"}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            angle={-30}
            textAnchor="end"
            height={60}
            interval={0}
            tick={{ fontSize: 12 }}
          >
            <Label value={xKey} offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis
            label={{ value: yKey, angle: -90, position: "insideLeft" }}
            domain={[yMin, yMax]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip wrapperClassName="!text-xs" />
          <Legend
            wrapperStyle={{
              fontSize: 13,
              bottom: -10,
              left: 0,
              position: "absolute",
            }}
            verticalAlign="top"
            align="left"
          />
          <Bar
            dataKey={yKey}
            fill={barColor}
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
            isAnimationActive={true}
            name={yKey}
          />
        </BarChart>
      </ResponsiveContainer>
      {title && <h4 className="text-center mt-2 font-medium">{title}</h4>}
    </div>
  );
};
