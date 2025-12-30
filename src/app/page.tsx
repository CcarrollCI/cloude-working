"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { 
  MessageCircle, 
  PlusCircle, 
  Settings, 
  MoreHorizontal,
  Paperclip,
  Send,
  BarChart3
} from "lucide-react"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const sampleResponses = [
  "I'd be happy to help you with that! Here's what I think about your request...",
  "That's a great question! Let me break this down for you step by step.",
  "I can definitely assist you with this. Based on what you've described, here's my recommendation...",
  "Interesting topic! Here's a comprehensive overview of what you're asking about...",
  "I understand what you're looking for. Let me provide you with a detailed explanation...",
  "Great question! Here's how I would approach this problem...",
  "I can help you with that. Here's a structured response to your inquiry...",
  "That's something I can definitely help with. Let me walk you through this..."
]

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentView, setCurrentView] = useState<'chat' | 'chart'>('chat')

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedPrompts = [
    "Help me write a professional email",
    "Explain a complex topic simply", 
    "Review my code for improvements",
    "Brainstorm creative ideas"
  ]

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt)
  }

  return (
    <div className="h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Cloude</span>
          </div>
          
          <Button 
            onClick={() => {
              setMessages([])
              setInputValue("")
              setCurrentView('chat')
            }}
            className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white mb-2"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Chat
          </Button>

          <Button 
            onClick={() => setCurrentView(currentView === 'chat' ? 'chart' : 'chat')}
            variant={currentView === 'chart' ? 'default' : 'outline'}
            className="w-full justify-start"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            {currentView === 'chart' ? 'Hide Chart' : 'Show Chart'}
          </Button>
        </div>

        <div className="flex-1" />

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-100 text-blue-600">U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">User</p>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
                {currentView === 'chat' ? <MessageCircle className="w-4 h-4 text-white" /> : <BarChart3 className="w-4 h-4 text-white" />}
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">
                  {currentView === 'chat' ? 'Cloude' : 'Analytics Dashboard'}
                </h1>
                <p className="text-sm text-gray-500">
                  {currentView === 'chat' ? 'Your AI assistant' : 'Data visualization'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {currentView === 'chat' ? (
          <>
            {/* Chat Messages */}
            <ScrollArea className="flex-1">
              <div className="p-6">
                {messages.length === 0 ? (
                  <div className="max-w-3xl mx-auto">
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-semibold text-gray-900 mb-3">Hello! I'm Cloude</h2>
                      <p className="text-lg text-gray-600 mb-8">How can I help you today?</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                        {suggestedPrompts.map((prompt, index) => (
                          <Card 
                            key={index}
                            onClick={() => handleSuggestedPrompt(prompt)}
                            className="p-4 hover:bg-gray-50 cursor-pointer border border-gray-200 transition-colors"
                          >
                            <p className="text-sm font-medium text-gray-900">{prompt}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((message) => (
                      <div key={message.id}>
                        {message.role === 'user' ? (
                          <div className="flex justify-end">
                            <Card className="max-w-xs lg:max-w-md p-3 bg-blue-600 text-white border-blue-600">
                              <p className="text-sm">{message.content}</p>
                            </Card>
                          </div>
                        ) : (
                          <div className="flex justify-start">
                            <div className="flex items-start space-x-3 max-w-2xl">
                              <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center mt-1">
                                <MessageCircle className="w-4 h-4 text-white" />
                              </div>
                              <Card className="flex-1 p-4 border border-gray-200">
                                <p className="text-sm text-gray-900">{message.content}</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  <Badge variant="secondary" className="text-xs">Helpful</Badge>
                                  <Badge variant="secondary" className="text-xs">Clear</Badge>
                                </div>
                              </Card>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-3 max-w-2xl">
                          <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center mt-1">
                            <MessageCircle className="w-4 h-4 text-white" />
                          </div>
                          <Card className="flex-1 p-4 border border-gray-200">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                              <span className="text-sm text-gray-500">Cloude is typing...</span>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="max-w-3xl mx-auto">
                <Card className="border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <div className="flex items-end space-x-2 p-3">
                    <Button variant="ghost" size="icon" className="mb-1">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Message Cloude..."
                      className="flex-1 min-h-[24px] max-h-32 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      rows={1}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      size="icon" 
                      className="bg-blue-600 hover:bg-blue-700 mb-1 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Cloude can make mistakes. Please use with discretion.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Chart View */
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Analytics</CardTitle>
                  <CardDescription>
                    Showing total visitors for the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                      <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded" />
                      <span>Desktop</span>
                    </CardTitle>
                    <CardDescription>Total desktop users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24,828</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-sky-400 rounded" />
                      <span>Mobile</span>
                    </CardTitle>
                    <CardDescription>Total mobile users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">25,010</div>
                    <p className="text-xs text-muted-foreground">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}