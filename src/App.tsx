import Spreadsheet from "./components/Spreadsheet";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>📊</span> Q3 Financial Overview
      </h1>
      <Spreadsheet />
    </main>
  );
}

