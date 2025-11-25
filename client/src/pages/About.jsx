import { Trophy, Handshake, Sparkles, Target, Eye, Globe, CheckCircle, ShieldCheck } from 'lucide-react';
import kalImage from '../assets/kal_asset/exprerts/kal.jpg';

export default function About() {
  // English text constants
  const t = {
      hero: {
        title: 'About TiletOpal',
        subtitle: 'Your Trusted Partner in the World of Precious Gemstones'
      },
      about: {
        title: 'About Us',
        paragraphs: [
          'TiletOpal is a registered Ethiopian company licensed by the Ministry of Mines to export gemstones and industrial minerals.',
          'Building on a solid background in the construction materials sector, we are expanding into responsible gemstone processing and export. Using Ethiopia’s world-renowned deposits—from Opal and Red Garnet to Agate/Chalcedony—we supply high-quality natural stones to international markets.',
          'Our focus is on quality, ethical sourcing, and transparent operations to ensure every export represents the beauty and integrity of Ethiopian origin.'
        ]
      },
      vision: {
        title: 'Our Vision',
        description: 'To become one of Ethiopia’s leading and trusted exporters of gemstones and industrial minerals, recognized for high quality and sustainable business practices.'
      },
      mission: {
        title: 'Our Mission',
        description: 'To connect Ethiopian artisanal and small-scale miners with international markets through responsible trade, reliable partnerships, and consistent quality.'
      },
      values: {
        title: 'Why Choose TiletOpal',
        items: [
          {
            title: 'Legally Licensed Exporter',
            description: 'We are fully licensed and approved by the Ethiopian Ministry of Mines for the export of natural gemstones and minerals.',
            icon: <ShieldCheck size={30} className="text-white" />
          },
          {
            title: 'Ethical & Sustainable Sourcing',
            description: 'We work closely with local miners and cooperatives, ensuring all operations respect and uplift mining communities.',
            icon: <Handshake size={30} className="text-white" />
          },
          {
            title: 'Quality Commitment',
            description: 'All gemstones and minerals are professionally inspected and graded before export.',
            icon: <CheckCircle size={30} className="text-white" />
          },
          {
            title: 'Experience & Trustworthiness',
            description: 'Our team brings years of experience in minerals and trade, backed by buyers’ trust in the international market.',
            icon: <Trophy size={30} className="text-white" />
          },
          {
            title: 'Reliable Partnership',
            description: 'We aim for transparent, long-term cooperation with buyers worldwide.',
            icon: <Globe size={30} className="text-white" />
          }
        ]
      },
      products: {
        title: 'Our Main Export Products',
        items: [
          {
            title: 'Ethiopian Opal',
            description: 'Admired for its brilliance and play-of-color.'
          },
          {
            title: 'Red Garnet',
            description: 'Prized for its intense color and high clarity.'
          },
          {
            title: 'Agate & Chalcedony',
            description: 'Vibrant stones with unique patterns and colors.'
          },
          {
            title: 'Black Obsidian',
            description: 'Natural volcanic glass used in decorative and craft applications.'
          },
          {
            title: 'Quartz Crystals & Citrine',
            description: 'Transparent and semi-precious stones for multiple uses.'
          }
        ]
      },
      stats: [
        { number: '10+', label: 'Years Experience' },
        { number: '340+', label: 'Satisfied Clients' },
        { number: '17+', label: 'Countries Served' }
      ],
      founder: {
        title: 'Who Is Girma Wondimu?',
        role: 'Founder & CEO',
        description: [
          'Girma Wondimu is a visionary leader and a pioneer in the Ethiopian gemstone industry. With a deep-rooted passion for the earth\'s hidden treasures, we have dedicated our life to showcasing the unique beauty of Ethiopian opals and other precious stones to the world.',
          'Starting our journey over a decade ago, Girma Wondimu has built a reputation for integrity, expertise, and an unwavering commitment to quality. Our hands-on approach ensures that every gemstone that passes through our hands meets the highest standards of excellence.',
          'Beyond business, Girma Wondimu is a mentor and an advocate for sustainable mining practices, working tirelessly to uplift local communities and promote ethical sourcing in the industry.'
        ]
      },
      cta: {
        title: 'Ready to Start Your Journey?',
        button: 'Get in Touch'
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.1),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.1),transparent_50%)]" />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)`
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: "'Playball', cursive", paddingRight: '20px' }}>{t.hero.title}</h1>
              <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl text-cyan-100 font-light">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* About Us, Vision, Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* About Us */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📖</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">{t.about.title}</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {t.about.paragraphs.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <Eye className="text-white w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{t.vision.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{t.vision.description}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <Target className="text-white w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{t.mission.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{t.mission.description}</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-10 mb-20 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">{t.values.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.values.items.map((value, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-br ${
                    index % 3 === 0 ? 'from-yellow-400 to-orange-500' :
                    index % 3 === 1 ? 'from-green-400 to-emerald-500' :
                    'from-purple-400 to-pink-500'
                  } rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg mx-auto`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{value.title}</h3>
                  <p className="text-blue-100 text-center leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Export Products Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">{t.products.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.products.items.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
            {t.stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Founder Section */}
          <div className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-96 lg:h-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" 
                    alt="Girma Wondimu" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:bg-gradient-to-l"></div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">{t.founder.role}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t.founder.title}</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    {t.founder.description.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Trophy size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">10+ Years of Excellence</p>
                        <p className="text-sm text-gray-500">Leading the Industry</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 rounded-3xl shadow-2xl overflow-hidden p-12 text-center text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
                {t.cta.title}
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              </h2>
              <a href="/contact">
                <button className="relative group bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-600 text-white font-bold px-10 py-5 rounded-xl transition-all duration-500 hover:transform hover:scale-110 shadow-2xl shadow-cyan-500/40 overflow-hidden">
                  <span className="relative z-10">{t.cta.button}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}