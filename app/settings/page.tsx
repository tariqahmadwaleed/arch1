"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsIcon, Bell, Lock, Globe, BadgeCheck, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="border-b bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2">
              <SettingsIcon className="mr-2 h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Account Settings</span>
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl text-balance">Settings</h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Manage your account preferences and privacy settings
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-accent" />
                  <CardTitle>Verification</CardTitle>
                </div>
                <CardDescription>Request verification for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="h-5 w-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">Get Verified</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Verified accounts are trusted members of the architectural community including firms,
                        universities, professors, and professional architects.
                      </p>
                      <Badge variant="secondary" className="mb-3">
                        Not Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-type">Account Type</Label>
                    <Select>
                      <SelectTrigger id="verification-type">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="architect">Professional Architect</SelectItem>
                        <SelectItem value="firm">Architectural Firm</SelectItem>
                        <SelectItem value="university">University/Institution</SelectItem>
                        <SelectItem value="professor">Professor/Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization/Institution Name</Label>
                    <Input id="organization" placeholder="e.g., Jordan Engineers Association" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">License/Credential Number (if applicable)</Label>
                    <Input id="license" placeholder="Professional license or credential number" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verification-details">Additional Information</Label>
                    <Textarea
                      id="verification-details"
                      placeholder="Provide details about your professional background, credentials, or why you should be verified..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documents">Supporting Documents</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Documents
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Upload professional license, ID, or institutional proof
                      </p>
                    </div>
                  </div>

                  <Button className="w-full">Submit Verification Request</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-accent" />
                  <CardTitle>Notifications</CardTitle>
                </div>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="like-notifications">Like Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone likes your posts</p>
                  </div>
                  <Switch id="like-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comment-notifications">Comment Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new comments</p>
                  </div>
                  <Switch id="comment-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="follow-notifications">Follow Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                  </div>
                  <Switch id="follow-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="message-notifications">Message Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                  </div>
                  <Switch id="message-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="competition-alerts">Competition Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new competitions</p>
                  </div>
                  <Switch id="competition-alerts" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="job-alerts">Job Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive job opportunity notifications</p>
                  </div>
                  <Switch id="job-alerts" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  <CardTitle>Privacy</CardTitle>
                </div>
                <CardDescription>Control your privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visibility">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                  </div>
                  <Switch id="profile-visibility" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-activity">Show Activity</Label>
                    <p className="text-sm text-muted-foreground">Display your activity to followers</p>
                  </div>
                  <Switch id="show-activity" defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="default-post-privacy">Default Post Privacy</Label>
                  <Select defaultValue="public">
                    <SelectTrigger id="default-post-privacy">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see</SelectItem>
                      <SelectItem value="connections">Connections Only</SelectItem>
                      <SelectItem value="private">Private - Only me</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Choose who can see your posts by default</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-messages">Allow Messages</Label>
                    <p className="text-sm text-muted-foreground">Let others send you direct messages</p>
                  </div>
                  <Switch id="allow-messages" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <CardTitle>Preferences</CardTitle>
                </div>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue="English" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC+3 (Amman)" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
