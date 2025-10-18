"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Send, MoreVertical, Pin, Bell, BellOff, Trash2, UserX, Reply, Archive, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VerificationBadge } from "@/components/verification-badge"
import { SuggestedPeople } from "@/components/suggested-people"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  timestamp: string
  isOwn: boolean
  isRead: boolean
}

interface Conversation {
  id: string
  username: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  isPinned: boolean
  isMuted: boolean
  isArchived: boolean
  isVerified: boolean
  verificationType?: "architect" | "academic" | "firm"
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    username: "ahmad-hassan",
    name: "Ahmad Hassan",
    avatar: "/placeholder.svg",
    lastMessage: "Thanks for sharing that resource!",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    isVerified: true,
    verificationType: "architect",
  },
  {
    id: "2",
    username: "sara-mansour",
    name: "Sara Mansour",
    avatar: "/placeholder.svg",
    lastMessage: "Would love to collaborate on this project",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: true,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isVerified: false,
  },
  {
    id: "3",
    username: "noor-almasri",
    name: "Dr. Noor Al-Masri",
    avatar: "/placeholder.svg",
    lastMessage: "I'll review your portfolio this week",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: false,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    isVerified: true,
    verificationType: "academic",
  },
  {
    id: "4",
    username: "studio-mada",
    name: "Studio Mada",
    avatar: "/placeholder.svg",
    lastMessage: "We have an opening for an intern position",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: false,
    isPinned: false,
    isMuted: true,
    isArchived: false,
    isVerified: true,
    verificationType: "firm",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hi! I saw your sustainable housing project. Really impressive work!",
    timestamp: "10:30 AM",
    isOwn: false,
    isRead: true,
  },
  {
    id: "2",
    content: "Thank you! I'd love to hear your thoughts on the passive cooling strategies.",
    timestamp: "10:32 AM",
    isOwn: true,
    isRead: true,
  },
  {
    id: "3",
    content: "The courtyard design is brilliant. Have you considered adding more vegetation for additional cooling?",
    timestamp: "10:35 AM",
    isOwn: false,
    isRead: true,
  },
  {
    id: "4",
    content: "That's a great suggestion! I was thinking about native plants that require minimal water.",
    timestamp: "10:38 AM",
    isOwn: true,
    isRead: true,
  },
  {
    id: "5",
    content: "Thanks for sharing that resource!",
    timestamp: "10:40 AM",
    isOwn: false,
    isRead: false,
  },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
  const [conversations, setConversations] = useState(mockConversations)
  const [messageText, setMessageText] = useState("")
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [showArchived, setShowArchived] = useState(false)

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArchived = showArchived ? conv.isArchived : !conv.isArchived
    return matchesSearch && matchesArchived
  })

  const pinnedConversations = filteredConversations.filter((c) => c.isPinned)
  const regularConversations = filteredConversations.filter((c) => !c.isPinned)

  const handlePinConversation = (id: string) => {
    setConversations((prev) => prev.map((conv) => (conv.id === id ? { ...conv, isPinned: !conv.isPinned } : conv)))
  }

  const handleMuteConversation = (id: string) => {
    setConversations((prev) => prev.map((conv) => (conv.id === id ? { ...conv, isMuted: !conv.isMuted } : conv)))
  }

  const handleArchiveConversation = (id: string) => {
    setConversations((prev) => prev.map((conv) => (conv.id === id ? { ...conv, isArchived: !conv.isArchived } : conv)))
    if (selectedConversation?.id === id) {
      setSelectedConversation(null)
    }
  }

  const handleBlockUser = (id: string) => {
    // In a real app, this would call an API
    console.log("Blocking user:", id)
    setConversations((prev) => prev.filter((conv) => conv.id !== id))
    if (selectedConversation?.id === id) {
      setSelectedConversation(null)
    }
  }

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id))
    if (selectedConversation?.id === id) {
      setSelectedConversation(null)
    }
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return
    // In a real app, this would send the message via API
    console.log("Sending message:", messageText)
    setMessageText("")
    setReplyingTo(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="font-serif text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">Connect with architects and students</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Conversations List */}
            <Card className="lg:col-span-1 flex flex-col overflow-hidden h-[calc(100vh-250px)]">
              <div className="p-4 border-b space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={!showArchived ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowArchived(false)}
                    className={showArchived ? "bg-transparent flex-1" : "flex-1"}
                  >
                    Active
                  </Button>
                  <Button
                    variant={showArchived ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowArchived(true)}
                    className={!showArchived ? "bg-transparent flex-1" : "flex-1"}
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Archived
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Pinned Conversations */}
                {pinnedConversations.length > 0 && !showArchived && (
                  <div className="border-b">
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Pinned
                    </div>
                    {pinnedConversations.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isSelected={selectedConversation?.id === conv.id}
                        onSelect={() => setSelectedConversation(conv)}
                        onPin={() => handlePinConversation(conv.id)}
                        onMute={() => handleMuteConversation(conv.id)}
                        onArchive={() => handleArchiveConversation(conv.id)}
                        onBlock={() => handleBlockUser(conv.id)}
                        onDelete={() => handleDeleteConversation(conv.id)}
                      />
                    ))}
                  </div>
                )}

                {/* Regular Conversations */}
                {regularConversations.length > 0 ? (
                  <div>
                    {!showArchived && regularConversations.length > 0 && pinnedConversations.length > 0 && (
                      <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        All Messages
                      </div>
                    )}
                    {regularConversations.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isSelected={selectedConversation?.id === conv.id}
                        onSelect={() => setSelectedConversation(conv)}
                        onPin={() => handlePinConversation(conv.id)}
                        onMute={() => handleMuteConversation(conv.id)}
                        onArchive={() => handleArchiveConversation(conv.id)}
                        onBlock={() => handleBlockUser(conv.id)}
                        onDelete={() => handleDeleteConversation(conv.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No {showArchived ? "archived" : ""} conversations found</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Message Thread */}
            <Card className="lg:col-span-2 flex flex-col overflow-hidden h-[calc(100vh-250px)]">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Link href={`/profile/${selectedConversation.username}`}>
                        <div className="relative">
                          <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                            <AvatarImage
                              src={selectedConversation.avatar || "/placeholder.svg"}
                              alt={selectedConversation.name}
                            />
                            <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {selectedConversation.isOnline && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          )}
                        </div>
                      </Link>
                      <div>
                        <Link href={`/profile/${selectedConversation.username}`}>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold hover:text-accent transition-colors cursor-pointer">
                              {selectedConversation.name}
                            </h3>
                            {selectedConversation.isVerified && (
                              <VerificationBadge type={selectedConversation.verificationType} size="sm" />
                            )}
                          </div>
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {selectedConversation.isOnline ? "Active now" : "Offline"}
                        </p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePinConversation(selectedConversation.id)}>
                          <Pin className="mr-2 h-4 w-4" />
                          {selectedConversation.isPinned ? "Unpin" : "Pin"} Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMuteConversation(selectedConversation.id)}>
                          {selectedConversation.isMuted ? (
                            <Bell className="mr-2 h-4 w-4" />
                          ) : (
                            <BellOff className="mr-2 h-4 w-4" />
                          )}
                          {selectedConversation.isMuted ? "Unmute" : "Mute"} Notifications
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleArchiveConversation(selectedConversation.id)}>
                          <Archive className="mr-2 h-4 w-4" />
                          {selectedConversation.isArchived ? "Unarchive" : "Archive"} Conversation
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleBlockUser(selectedConversation.id)}
                          className="text-destructive"
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Block User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteConversation(selectedConversation.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((message) => (
                      <div key={message.id} className={cn("flex gap-3", message.isOwn && "flex-row-reverse")}>
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage
                            src={message.isOwn ? "/placeholder.svg" : selectedConversation.avatar || "/placeholder.svg"}
                            alt={message.isOwn ? "You" : selectedConversation.name}
                          />
                          <AvatarFallback>{message.isOwn ? "Y" : selectedConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className={cn("flex flex-col gap-1 max-w-[70%]", message.isOwn && "items-end")}>
                          <div
                            className={cn(
                              "rounded-lg px-4 py-2 group relative",
                              message.isOwn ? "bg-accent text-accent-foreground" : "bg-secondary",
                            )}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={cn(
                                    "absolute -top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity",
                                    message.isOwn ? "-left-8" : "-right-8",
                                  )}
                                >
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align={message.isOwn ? "end" : "start"}>
                                <DropdownMenuItem onClick={() => setReplyingTo(message)}>
                                  <Reply className="mr-2 h-4 w-4" />
                                  Reply
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Star className="mr-2 h-4 w-4" />
                                  Star Message
                                </DropdownMenuItem>
                                {message.isOwn && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Message
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <span className="text-xs text-muted-foreground px-2">{message.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    {replyingTo && (
                      <div className="mb-2 p-2 bg-secondary rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Reply className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Replying to:</span>
                          <span className="truncate max-w-[200px]">{replyingTo.content}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setReplyingTo(null)} className="h-6 w-6">
                          <span className="sr-only">Cancel reply</span>×
                        </Button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        className="min-h-[60px] max-h-[120px] resize-none"
                      />
                      <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-8">
                  <div>
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 p-4">
                      <Send className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Suggested People Sidebar */}
            <div className="lg:col-span-1">
              <SuggestedPeople limit={6} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

interface ConversationItemProps {
  conversation: Conversation
  isSelected: boolean
  onSelect: () => void
  onPin: () => void
  onMute: () => void
  onArchive: () => void
  onBlock: () => void
  onDelete: () => void
}

function ConversationItem({
  conversation,
  isSelected,
  onSelect,
  onPin,
  onMute,
  onArchive,
  onBlock,
  onDelete,
}: ConversationItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-accent/5 border-b",
        isSelected && "bg-accent/10",
      )}
      onClick={onSelect}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-12 w-12">
          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.isOnline && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <h4 className="font-semibold text-sm truncate">{conversation.name}</h4>
            {conversation.isVerified && <VerificationBadge type={conversation.verificationType} size="sm" />}
            {conversation.isPinned && <Pin className="h-3 w-3 text-accent flex-shrink-0" />}
            {conversation.isMuted && <BellOff className="h-3 w-3 text-muted-foreground flex-shrink-0" />}
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{conversation.timestamp}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
          {conversation.unreadCount > 0 && (
            <Badge variant="default" className="ml-2 flex-shrink-0 h-5 min-w-5 px-1.5">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onPin()
            }}
          >
            <Pin className="mr-2 h-4 w-4" />
            {conversation.isPinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onMute()
            }}
          >
            {conversation.isMuted ? <Bell className="mr-2 h-4 w-4" /> : <BellOff className="mr-2 h-4 w-4" />}
            {conversation.isMuted ? "Unmute" : "Mute"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onArchive()
            }}
          >
            <Archive className="mr-2 h-4 w-4" />
            {conversation.isArchived ? "Unarchive" : "Archive"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onBlock()
            }}
            className="text-destructive"
          >
            <UserX className="mr-2 h-4 w-4" />
            Block User
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
