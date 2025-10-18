"use client"

import { X, BookMarked, GraduationCap, User, Settings, Activity, LogOut, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

interface UserSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ savedBooks: 0, projects: 0, followers: 0 })

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

        if (profile) {
          setUser({
            name: profile.full_name || "User",
            email: authUser.email,
            avatar: profile.avatar_url,
            title: profile.title || "Architect",
            username: profile.username,
          })

          setStats({
            savedBooks: 0,
            projects: profile.projects_count || 0,
            followers: profile.followers_count || 0,
          })
        }
      }
      setLoading(false)
    }

    if (isOpen) {
      fetchUser()
    }
  }, [isOpen])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-80 bg-background shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-serif text-xl font-bold">My Account</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {loading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          ) : !user ? (
            <div className="flex flex-1 flex-col items-center justify-center p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Welcome to ArchNet</h3>
                <p className="text-sm text-muted-foreground">Sign in to access your account and explore all features</p>
              </div>
              <Button className="w-full" asChild>
                <Link href="/login" onClick={onClose}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* User Profile Section */}
              <div className="border-b p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.title}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button className="mt-4 w-full bg-transparent" variant="outline" asChild>
                  <Link href={`/profile/${user.username}`} onClick={onClose}>
                    View Profile
                  </Link>
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-2">
                  <Link
                    href="/library"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent/10 hover:text-accent"
                    onClick={onClose}
                  >
                    <BookMarked className="h-5 w-5" />
                    <div>
                      <p className="font-medium">My Library</p>
                      <p className="text-xs text-muted-foreground">Saved books & resources</p>
                    </div>
                  </Link>

                  <Link
                    href="/my-courses"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent/10 hover:text-accent"
                    onClick={onClose}
                  >
                    <GraduationCap className="h-5 w-5" />
                    <div>
                      <p className="font-medium">My Courses</p>
                      <p className="text-xs text-muted-foreground">Your subscribed courses</p>
                    </div>
                  </Link>

                  <Link
                    href={`/profile/${user.username}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent/10 hover:text-accent"
                    onClick={onClose}
                  >
                    <User className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Profile</p>
                      <p className="text-xs text-muted-foreground">Bio & personal info</p>
                    </div>
                  </Link>

                  <Link
                    href="/activity"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent/10 hover:text-accent"
                    onClick={onClose}
                  >
                    <Activity className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Activity</p>
                      <p className="text-xs text-muted-foreground">Posts & saved items</p>
                    </div>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent/10 hover:text-accent"
                    onClick={onClose}
                  >
                    <Settings className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-xs text-muted-foreground">Notifications & privacy</p>
                    </div>
                  </Link>
                </nav>

                <Separator className="my-4" />

                {/* Quick Stats */}
                <div className="rounded-lg bg-secondary/30 p-4">
                  <h4 className="mb-3 text-sm font-semibold">Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saved Books</span>
                      <span className="font-medium">{stats.savedBooks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-medium">{stats.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Followers</span>
                      <span className="font-medium">{stats.followers}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
