"use client"

import { useState } from "react"
import { MessageCircle, Send, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

interface Conversation {
  id: string
  user: {
    name: string
    avatar: string
    online: boolean
  }
  lastMessage: string
  timestamp: string
  unread: number
}

interface Message {
  id: string
  sender: "me" | "them"
  content: string
  timestamp: string
}

const dummyConversations: Conversation[] = [
  {
    id: "1",
    user: { name: "Ahmad Khalil", avatar: "/placeholder.svg?height=40&width=40", online: true },
    lastMessage: "Thanks for sharing that resource!",
    timestamp: "10m ago",
    unread: 2,
  },
  {
    id: "2",
    user: { name: "Layla Hassan", avatar: "/placeholder.svg?height=40&width=40", online: false },
    lastMessage: "Would love to collaborate on this project",
    timestamp: "2h ago",
    unread: 0,
  },
  {
    id: "3",
    user: { name: "Omar Zaid", avatar: "/placeholder.svg?height=40&width=40", online: true },
    lastMessage: "See you at the workshop tomorrow",
    timestamp: "1d ago",
    unread: 0,
  },
]

const dummyMessages: Message[] = [
  { id: "1", sender: "them", content: "Hi! I saw your sustainable housing project", timestamp: "10:30 AM" },
  { id: "2", sender: "me", content: "Thank you! I'm glad you liked it", timestamp: "10:32 AM" },
  { id: "3", sender: "them", content: "Thanks for sharing that resource!", timestamp: "10:35 AM" },
]

export function MessagingPanel() {
  const [conversations] = useState<Conversation[]>(dummyConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages] = useState<Message[]>(dummyMessages)
  const [newMessage, setNewMessage] = useState("")

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Send message logic here
    setNewMessage("")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageCircle className="h-5 w-5" />
          {totalUnread > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
              {totalUnread}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0">
        {!selectedConversation ? (
          <>
            <SheetHeader className="p-6 pb-4">
              <SheetTitle>Messages</SheetTitle>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-1 p-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className="w-full rounded-lg p-4 text-left transition-colors hover:bg-accent/5"
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                        </Avatar>
                        {conversation.user.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{conversation.user.name}</span>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 border-b p-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}>
                ← Back
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{selectedConversation.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{selectedConversation.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.user.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "me" ? "bg-accent text-accent-foreground" : "bg-secondary"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage} size="icon" className="h-[60px] w-[60px]">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
