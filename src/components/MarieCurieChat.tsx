'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'marie'
  content: string
  timestamp: Date
}

export default function MarieCurieChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'marie',
      content: 'Bonjour! Ik ben Marie Curie. Het is mij een genoegen om met je te spreken over wetenschap, mijn onderzoek, of wat je maar wilt weten over mijn leven als wetenschapper. Wat zou je graag willen bespreken?',
      timestamp: new Date()
    }
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsLoading(true)

    try {
      // Maak een gedetailleerde prompt voor Marie Curie
      const mariePrompt = `Je bent Marie Curie, de beroemde Pools-Franse natuurkundige en scheikundige (1867-1934). 

BELANGRIJKE KARAKTERISTIEKEN:
- Spreek in de eerste persoon als Marie Curie
- Gebruik een warme, intelligente en inspirerende toon
- Verwijs naar je eigen ervaringen en ontdekkingen
- Toon je passie voor wetenschap en onderwijs
- Spreek over de uitdagingen als vrouw in de wetenschap
- Gebruik soms Franse uitdrukkingen (met uitleg)
- Wees bescheiden maar zelfverzekerd over je prestaties

BELANGRIJKE FEITEN OVER JEZELF:
- Geboren als Maria Skłodowska in Warschau, Polen
- Verhuisde naar Parijs om te studeren aan de Sorbonne
- Getrouwd met Pierre Curie, samen onderzoek gedaan
- Ontdekte polonium (genoemd naar Polen) en radium
- Eerste vrouw die een Nobelprijs won (Natuurkunde, 1903)
- Eerste persoon die twee Nobelprijzen won (Scheikunde, 1911)
- Ontwikkelde mobiele röntgenapparaten tijdens WO1
- Stichtte het Radium Instituut
- Stierf aan aplastische anemie, waarschijnlijk door blootstelling aan straling

Beantwoord de volgende vraag van een student op een educatieve, inspirerende manier:

Student: "${currentMessage}"

Antwoord als Marie Curie (in het Nederlands):`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: mariePrompt,
          aiModel: 'smart'
        }),
      })

      if (!response.ok) {
        throw new Error('Er ging iets mis bij het versturen van je bericht')
      }

      const data = await response.json()
      
      const marieMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'marie',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, marieMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'marie',
        content: 'Excusez-moi, er ging iets mis. Zou je je vraag opnieuw kunnen stellen?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            👩‍🔬
          </div>
          <div>
            <h3 className="font-semibold">Marie Curie</h3>
            <p className="text-sm opacity-90">Natuurkundige & Scheikundige</p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {message.role === 'marie' && (
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">👩‍🔬</span>
                  <span className="text-sm font-medium text-purple-600">Marie</span>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <p className={`text-xs mt-1 ${
                message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString('nl-NL', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-100">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">👩‍🔬</span>
                <span className="text-sm font-medium text-purple-600">Marie</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Stel Marie een vraag over wetenschap, haar ontdekkingen, of haar leven..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={2}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Verstuur</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </button>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>Druk Enter om te versturen, Shift+Enter voor nieuwe regel</span>
          <span>{currentMessage.length}/1000</span>
        </div>
      </div>
    </div>
  )
}