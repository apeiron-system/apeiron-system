import React from "react";
import { Link } from "react-router-dom";

const ItemDetailsPage = () => {
  const itemDetails = {
    itemId: "1",
    itemNo: "8030/1a",
    itemName: "Cement",
    itemType: "Material",
    description: "Plain",
    unit: "2",
    price: "250.00",
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-6">
        <h2 className="text-2xl font-bold">Apeiron Construction Solutions</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/contract" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded">
                Contract
              </Link>
            </li>
            <li>
              <Link to="/job-order" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded">
                Job Order
              </Link>
            </li>
            <li>
              <Link to="/item" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded bg-gray-900">
                Item
              </Link>
            </li>
            <li>
              <Link to="/progress-report" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded">
                Progress Report
              </Link>
            </li>
          </ul>
        </nav>
        <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">Item Details</h1>
              <div className="space-x-2">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded">
                  Edit
                </button>
                <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded">
                  View Price History
                </button>
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-4">
              {Object.keys(itemDetails).map((key) => (
                <div key={key} className="flex">
                  <span className="font-semibold w-1/3">{key}:</span>
                  <span>{itemDetails[key]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => <ItemDetailsPage />;

export default App;

