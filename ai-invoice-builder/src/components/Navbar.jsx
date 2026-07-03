import { FaFileInvoiceDollar } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaFileInvoiceDollar className="text-white text-3xl" />
          <h1 className="text-2xl font-bold text-white">
            AI Invoice Builder
          </h1>
        </div>

        
      </div>
    </nav>
  );
}