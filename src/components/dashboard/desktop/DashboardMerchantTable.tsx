export function DashboardMerchantsTable() {
  const merchantsData = [
    { id: 1, name: "Eco Stores", email: "contact@ecostores.com", category: "Retail" },
    { id: 2, name: "Tech Innovations", email: "info@techinnovations.com", category: "Technology" },
    // Add more merchants as needed
  ];

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50    ">
          <tr>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {merchantsData.map((merchant, index) => (
            <tr key={merchant.id} className={`${index % 2 === 0 ? "bg-white/80" : "bg-gray-50"} hover:bg-primary/5`}>
              <td className="py-4 px-6">{merchant.name}</td>
              <td className="py-4 px-6">{merchant.email}</td>
              <td className="py-4 px-6">{merchant.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
