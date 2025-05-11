import React, { useRef, useEffect } from "react";

interface CsvTableProps {
  columns: string[];
  data: { [key: string]: string | number }[];
}

const CsvTable: React.FC<CsvTableProps> = ({ columns, data }) => {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  // Sincroniza el scroll horizontal entre la barra superior y la tabla
  useEffect(() => {
    const top = topScrollRef.current;
    const table = tableScrollRef.current;
    if (!top || !table) return;
    const syncScroll = (from: HTMLDivElement, to: HTMLDivElement) => {
      return () => {
        if (to.scrollLeft !== from.scrollLeft) {
          to.scrollLeft = from.scrollLeft;
        }
      };
    };
    const onTopScroll = syncScroll(top, table);
    const onTableScroll = syncScroll(table, top);
    top.addEventListener("scroll", onTopScroll);
    table.addEventListener("scroll", onTableScroll);
    return () => {
      top.removeEventListener("scroll", onTopScroll);
      table.removeEventListener("scroll", onTableScroll);
    };
  }, []);

  return (
    <div
      className="relative border p-2 rounded-lg shadow bg-white"
      id="csv-table-container"
    >
      {/* Barra de scroll horizontal arriba */}
      <div
        ref={topScrollRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ height: 16 }}
        id="csv-table-scrollbar-top"
      >
        <div
          style={{ width: columns.length * 180 }}
          id="csv-table-scrollbar-top-inner"
        />
      </div>
      {/* Tabla con scroll horizontal y vertical, ocultando la barra horizontal */}
      <div
        ref={tableScrollRef}
        className="overflow-x-scroll border-b border-gray-200 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ maxHeight: 400, overflowY: "auto", overflowX: "hidden" }}
        id="csv-table-scrollable-area"
      >
        <table
          className="min-w-full text-sm text-left"
          style={{ minWidth: columns.length * 180 }}
          id="csv-table"
        >
          <thead className="bg-gray-100" id="csv-table-thead">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 font-bold border-b border-gray-200 whitespace-nowrap"
                  id={`csv-table-th-${col}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody id="csv-table-tbody">
            {data.slice(0, 20).map((row, i) => (
              <tr key={i} className="even:bg-gray-50" id={`csv-table-row-${i}`}>
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-3 py-2 border-b border-gray-100 whitespace-nowrap"
                    id={`csv-table-td-${i}-${col}`}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvTable;
