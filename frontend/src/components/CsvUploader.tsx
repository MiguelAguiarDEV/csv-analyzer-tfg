import React, { useState } from "react";
import Papa from "papaparse";
import CsvTable from "./CsvTable";
import { BarChartConfigurator, BarChartDisplay } from "./BarChartModule";
import axios from "axios";

interface CsvData {
  [key: string]: string | number;
}

type ChartType = "bar" | "pie";

const CsvUploader: React.FC = () => {
  const [data, setData] = useState<CsvData[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [xKey, setXKey] = useState<string>("");
  const [yKey, setYKey] = useState<string>("");
  const [barColor, setBarColor] = useState<string>("#8884d8");
  const [title, setTitle] = useState<string>("");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<string>("");
  const [aiCharts, setAiCharts] = useState<any[]>([]);
  const [aiDatasetSummary, setAiDatasetSummary] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<CsvData>) => {
        setData(results.data);
        setColumns(results.meta.fields || []);
        setXKey(results.meta.fields?.[0] || "");
        setYKey(results.meta.fields?.[1] || "");
        setSortBy(results.meta.fields?.[1] || "");
        // Llamar a la IA para obtener resumen del dataset
        getDatasetSummary(results.data, results.meta.fields || []);
      },
    });
  };

  // Nueva función para obtener resumen IA del dataset
  const getDatasetSummary = async (data: CsvData[], columns: string[]) => {
    setAiDatasetSummary("");
    if (!data.length || !columns.length) return;
    try {
      const sample = data.slice(0, 20);
      const summary = columns.reduce((acc, col) => {
        const values = data.map((row) => row[col]);
        const nums = values.filter((v) => !isNaN(Number(v))).map(Number);
        acc[col] = {
          unique: Array.from(new Set(values)).length,
          min: nums.length ? Math.min(...nums) : undefined,
          max: nums.length ? Math.max(...nums) : undefined,
        };
        return acc;
      }, {} as Record<string, any>);
      const payload = {
        csvData: sample,
        meta: {
          columns,
          summary,
          onlySummary: true, // Indica al backend que solo queremos un resumen
        },
      };
      const res = await axios.post("/api/ai", payload);
      setAiDatasetSummary(res.data.report || "");
    } catch {
      setAiDatasetSummary("");
    }
  };

  const handleAIGenerate = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiReport("");
    setAiCharts([]);
    try {
      const sample = data.slice(0, 20);
      const summary = columns.reduce((acc, col) => {
        const values = data.map((row) => row[col]);
        const nums = values.filter((v) => !isNaN(Number(v))).map(Number);
        acc[col] = {
          unique: Array.from(new Set(values)).length,
          min: nums.length ? Math.min(...nums) : undefined,
          max: nums.length ? Math.max(...nums) : undefined,
        };
        return acc;
      }, {} as Record<string, any>);
      const payload = {
        csvData: sample,
        meta: {
          columns,
          summary,
        },
      };
      const res = await axios.post("/api/ai", payload);
      console.log("Respuesta IA:", res.data); // <-- Mostrar toda la respuesta de la IA
      setAiReport(res.data.report || "");
      setAiCharts(res.data.charts || []);
    } catch (err: any) {
      setAiError(
        err?.response?.data?.error || "Error al comunicarse con la IA"
      );
    } finally {
      setAiLoading(false);
    }
  };

  const validXColumns = columns.filter((col) => {
    const values = data.map((row) => row[col]);
    const unique = new Set(values);
    return unique.size > 1 && !values.every((v) => !isNaN(Number(v)));
  });
  const validYColumns = columns.filter((col) => {
    const values = data.map((row) => row[col]);
    return values.every((v) => !isNaN(Number(v)));
  });

  const sortedData = React.useMemo(() => {
    if (!validXColumns.includes(xKey) || !validYColumns.includes(yKey))
      return [];
    const map = new Map<string, number>();
    data.forEach((row) => {
      const xVal = String(row[xKey]);
      const yVal = Number(row[yKey]);
      if (!isNaN(yVal)) {
        map.set(xVal, (map.get(xVal) || 0) + yVal);
      }
    });
    let arr = Array.from(map.entries()).map(([x, y]) => ({
      [xKey]: x,
      [yKey]: y,
    }));
    if (sortBy && (sortBy === xKey || sortBy === yKey)) {
      arr = arr.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        if (!isNaN(Number(aVal)) && !isNaN(Number(bVal))) {
          return sortOrder === "asc"
            ? Number(aVal) - Number(bVal)
            : Number(bVal) - Number(aVal);
        }
        return sortOrder === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }
    return arr.slice(0, Math.max(1, Math.min(limit, arr.length)));
  }, [
    data,
    xKey,
    yKey,
    sortBy,
    sortOrder,
    limit,
    validXColumns,
    validYColumns,
  ]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-tight flex items-center gap-2">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Subir archivo CSV
      </h2>
      <label className="inline-block mb-6">
        <span className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors">
          Seleccionar archivo CSV
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </span>
      </label>
      {/* Mostrar resumen IA del dataset si existe */}
      {aiDatasetSummary && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
          <h4 className="font-bold mb-2 text-yellow-700">
            Resumen automático del dataset
          </h4>
          <div className="whitespace-pre-line text-sm text-yellow-900">
            {aiDatasetSummary}
          </div>
        </div>
      )}
      {data.length > 0 && (
        <>
          <CsvTable columns={columns} data={data} />
          <div className="mt-8">
            <div className="mb-4 flex gap-4 items-center">
              <label className="font-semibold text-sm">Tipo de gráfica:</label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as ChartType)}
                className="border rounded px-2 py-1"
              >
                <option value="bar">Barras</option>
                <option value="pie" disabled>
                  Tarta (próximamente)
                </option>
              </select>
              <button
                className="ml-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded shadow hover:from-blue-600 disabled:opacity-50"
                onClick={handleAIGenerate}
                disabled={aiLoading}
              >
                {aiLoading ? "Generando informe IA..." : "Sugerencia IA"}
              </button>
            </div>
            {aiError && <div className="text-red-500 mb-2">{aiError}</div>}
            {aiReport && (
              <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                <h4 className="font-bold mb-2 text-blue-700">Informe IA</h4>
                <div className="whitespace-pre-line text-sm text-blue-900">
                  {aiReport}
                </div>
              </div>
            )}
            {aiCharts.length > 0 && (
              <div className="mb-8">
                <h4 className="font-bold text-xl mb-4 text-blue-700 border-b pb-2">
                  Gráficas sugeridas por IA
                </h4>
                {aiCharts.map((chart, idx) => {
                  if (chart.type === "bar" && chart.xKey && chart.yKey) {
                    const xExists = columns.includes(chart.xKey);
                    const yExists = columns.includes(chart.yKey);
                    let aiData = [];
                    if (xExists && yExists) {
                      const map = new Map<string, number>();
                      data.forEach((row) => {
                        const xVal = String(row[chart.xKey]);
                        const yVal = Number(row[chart.yKey]);
                        if (!isNaN(yVal)) {
                          map.set(xVal, (map.get(xVal) || 0) + yVal);
                        }
                      });
                      aiData = Array.from(map.entries()).map(([x, y]) => ({
                        [chart.xKey]: x,
                        [chart.yKey]: y,
                      }));
                      aiData = aiData.sort((a, b) => {
                        const aVal = a[chart.yKey];
                        const bVal = b[chart.yKey];
                        if (!isNaN(Number(aVal)) && !isNaN(Number(bVal))) {
                          return Number(bVal) - Number(aVal);
                        }
                        return String(bVal).localeCompare(String(aVal));
                      });
                      aiData = aiData.slice(0, 30);
                    }
                    return (
                      <div
                        key={idx}
                        className="mb-12 bg-white rounded-lg shadow p-6 border border-blue-100"
                      >
                        <h5 className="text-2xl font-bold text-center mb-2 text-gray-800">
                          {chart.title || "Gráfica de Barras"}
                        </h5>
                        {chart.description && (
                          <div className="text-base text-gray-600 mb-4 text-center">
                            {chart.description}
                          </div>
                        )}
                        {xExists && yExists ? (
                          <BarChartDisplay
                            data={aiData}
                            xKey={chart.xKey}
                            yKey={chart.yKey}
                            barColor={chart.barColor || "#8884d8"}
                            title={""}
                          />
                        ) : (
                          <div className="text-red-500 text-center mb-2">
                            No se puede mostrar la gráfica: columna X "
                            {chart.xKey}" o Y "{chart.yKey}" no encontrada en
                            los datos.
                          </div>
                        )}
                        {chart.conclusion && (
                          <div className="mt-4 text-base text-green-700 bg-green-50 border border-green-200 rounded p-3 text-center">
                            <span className="font-semibold">
                              Conclusión IA:
                            </span>{" "}
                            {chart.conclusion}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <pre
                      key={idx}
                      className="bg-gray-100 p-2 rounded text-xs overflow-x-auto"
                    >
                      Tipo de gráfica no soportado: {chart.type}\n
                      {JSON.stringify(chart, null, 2)}
                    </pre>
                  );
                })}
              </div>
            )}
            {/* Menú de configuración solo si NO hay sugerencias IA */}
            {chartType === "bar" && aiCharts.length === 0 && (
              <>
                <BarChartConfigurator
                  columns={columns}
                  xKey={xKey}
                  yKey={yKey}
                  barColor={barColor}
                  title={title}
                  setXKey={setXKey}
                  setYKey={setYKey}
                  setBarColor={setBarColor}
                  setTitle={setTitle}
                  data={data}
                  limit={limit}
                  setLimit={setLimit}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  validXColumns={validXColumns}
                  validYColumns={validYColumns}
                />
                {validXColumns.includes(xKey) &&
                validYColumns.includes(yKey) &&
                sortedData.length > 0 ? (
                  <BarChartDisplay
                    data={sortedData}
                    xKey={xKey}
                    yKey={yKey}
                    barColor={barColor}
                    title={title}
                  />
                ) : (
                  <div className="text-red-500 mt-4">
                    Selecciona columnas válidas para X (texto/categoría) y Y
                    (numérica).
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CsvUploader;
