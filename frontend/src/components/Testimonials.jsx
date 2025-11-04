export default function Testimonials() {
  const testimonials = [
    {
      name: "John Smith",
      role: "Gemstone Dealer",
      content: "GemStone Pro has been instrumental in expanding my international business. Their expertise and network are unmatched.",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "Jewelry Designer",
      content: "The training courses provided by GemStone Pro have significantly improved my gemstone identification skills.",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Gemstone Tester",
      content: "Their testing services are reliable and accurate. I trust them completely with my valuable stones.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}