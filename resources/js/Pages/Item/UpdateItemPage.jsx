import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const UpdateItemPage = () => {
  const [newItemPrice, setNewItemPrice] = useState('');

  const itemDetails = {
    itemName: 'Item 1',
    itemType: 'Material',
    currentPrice: '1000.00',
  };

  const handleUpdatePrice = () => {
    // Logic to update the price in your backend/state
    console.log('Updating price to:', newItemPrice);
  };

  return (
    <AuthenticatedLayout>
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
        <main className="flex-1 p-8 bg-gray-100">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <Link to="/item" className="text-blue-500 hover:underline">&lt; Item</Link>
              <h1 className="text-xl font-semibold">Update Price</h1>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Create Item</button> 
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Item Name & Price History Column */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Item Name</h2>
                {/* Placeholder for item list */}
                <div className="bg-gray-100 p-4 rounded">Item 1</div>
                <div className="bg-gray-100 p-4 rounded">Item xxx</div>
                <div className="bg-gray-100 p-4 rounded">Item xxxx</div>
              </div>

              {/* Price History & Update Price Column */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Price History</h2>
                {/* Placeholder for price history */}
                <div className="bg-gray-100 p-4 rounded">Description...</div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">&lt; Update Price</h2>
                  <div className="bg-gray-100 p-4 rounded flex flex-col space-y-2">
                    <div>Item Type: {itemDetails.itemType}</div>
                    <div>Current Price: {itemDetails.currentPrice}</div>
                    <input 
                      type="number" 
                      className="border rounded px-3 py-2"
                      placeholder="Enter new price"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2">
                      <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded">Cancel</button>
                      <button 
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        onClick={handleUpdatePrice}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
};

export default UpdateItemPage;
