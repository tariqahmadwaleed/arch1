"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { MessageSquare, Send } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  replies?: Comment[]
}

interface CommentSectionProps {
  postId?: string
  contentId?: string
  contentType?: string
  comments?: Comment[]
}

export function CommentSection({
  postId,
  contentId,
  contentType,
  comments: initialComments = [],
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/professional-woman-architect.png",
      },
      content: newComment,
      timestamp: "Just now",
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-accent" />
        <h3 className="font-semibold">Comments ({comments.length})</h3>
      </div>

      {/* New Comment Input */}
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/professional-woman-architect.png" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Write a comment... (supports **bold**, *italic*, and [links](url))"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitComment} size="sm">
              <Send className="mr-2 h-4 w-4" />
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onReply={setReplyingTo} />
        ))}
      </div>
    </div>
  )
}

function CommentItem({ comment, onReply }: { comment: Comment; onReply: (id: string) => void }) {
  const [showReplies, setShowReplies] = useState(false)

  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>
            <div className="prose prose-sm mt-2 max-w-none">
              <ReactMarkdown>{comment.content}</ReactMarkdown>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onReply(comment.id)}>
              Reply
            </Button>
            {comment.replies && comment.replies.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </Button>
            )}
          </div>
          {showReplies && comment.replies && (
            <div className="ml-6 mt-4 space-y-4 border-l-2 pl-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} onReply={onReply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
