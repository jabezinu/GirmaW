export default function Products() {
  const products = [
    { name: "Diamond", price: "$5,000", image: "https://via.placeholder.com/300x200?text=Diamond" },
    { name: "Ruby", price: "$2,500", image: "https://via.placeholder.com/300x200?text=Ruby" },
    { name: "Sapphire", price: "$3,000", image: "https://via.placeholder.com/300x200?text=Sapphire" },
    { name: "Emerald", price: "$4,200", image: "https://via.placeholder.com/300x200?text=Emerald" },
    { name: "Opal", price: "$800", image: "https://via.placeholder.com/300x200?text=Opal" },
    { name: "Amethyst", price: "$150", image: "https://via.placeholder.com/300x200?text=Amethyst" }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Gemstone Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Inquire Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}