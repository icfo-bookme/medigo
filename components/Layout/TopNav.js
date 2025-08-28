
const TopNav = () => {
  return (
    <div className="bg-gradient-to-r from-green-700 via-green-500 to-green-600 py-2">
      <div className="mx-auto max-w-7xl">
        <ul className="flex justify-around">
          <li className="text-white font-semibold text-sm">Home</li>
          <li className="text-white font-semibold text-sm">OTC Medicines</li>
          <li className="text-white font-semibold text-sm">
            Prescription Medicines
          </li>
          <li className="text-white font-semibold text-sm">
            Healthcare Products
          </li>
          <li className="text-white font-semibold text-sm">
            Devices & Equipment
          </li>
          <li className="text-white font-semibold text-sm">Baby Care</li>
          <li className="text-white font-semibold text-sm">Mens Products</li>
          <li className="text-white font-semibold text-sm">Online Doctors</li>
          <li className="text-white font-semibold text-sm">Womens Products</li>
        </ul>
      </div>
    </div>
  );
}

export default TopNav