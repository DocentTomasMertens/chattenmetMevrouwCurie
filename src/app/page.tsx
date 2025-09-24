import MarieCurieChat from '@/components/MarieCurieChat'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl">🧪</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Chat met Marie Curie
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontmoet de beroemde natuurkundige en scheikundige Marie Curie. 
            Stel haar vragen over wetenschap, haar ontdekkingen, of haar leven als pionier in de wetenschap.
          </p>
        </div>

        {/* Marie Curie Info Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-4xl">
                👩‍🔬
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Marie Curie (1867-1934)</h2>
                <p className="text-gray-600 leading-relaxed">
                  Pools-Franse natuurkundige en scheikundige. Eerste vrouw die een Nobelprijs won, 
                  eerste persoon die twee Nobelprijzen in verschillende wetenschappen won. 
                  Ontdekker van de elementen polonium en radium.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <MarieCurieChat />
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            💜 Educatieve AI-omgeving • Powered by Gemini AI
          </p>
        </div>
      </div>
    </div>
  )
}