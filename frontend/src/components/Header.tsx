import React from "react";

const Header: React.FC = () => (
  <header className="bg-white shadow py-4 px-8 flex items-center justify-between">
    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
      CSV Analyzer
    </h1>
    <span className="text-xs text-gray-400">MVP Demo</span>
  </header>
);

export default Header;
