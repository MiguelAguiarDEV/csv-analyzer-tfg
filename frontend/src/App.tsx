import Header from "./components/Header";
import Footer from "./components/Footer";
import CsvUploader from "./components/CsvUploader";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8">
        <div className="w-full max-w-5xl">
          <CsvUploader />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
