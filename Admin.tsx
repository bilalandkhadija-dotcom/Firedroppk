import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // Agar file root mein hai

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Fetch orders from Supabase
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (!error && data) setOrders(data);
    };
    
    fetchOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-2 mb-4 rounded text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => password === "admin123" ? setIsAuthenticated(true) : alert("Wrong password!")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">FireDrop PK - Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 border-b">Date</th>
              <th className="p-4 border-b">Player ID</th>
              <th className="p-4 border-b">Package</th>
              <th className="p-4 border-b">Amount</th>
              <th className="p-4 border-b">Screenshot</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-500">No orders found.</td></tr>
            ) : (
              orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50 border-b">
                  <td className="p-4">{new Date(order.created_at).toLocaleString()}</td>
                  <td className="p-4 font-mono">{order.player_id}</td>
                  <td className="p-4">{order.package_name}</td>
                  <td className="p-4">Rs. {order.amount}</td>
                  <td className="p-4">
                    <a href={order.screenshot_url} target="_blank" rel="noreferrer" className="text-blue-500 underline">View Proof</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
