import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="fullName">Full Name</label>
              <Input id="fullName" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="username">Username</label>
              <Input id="username" placeholder="johndoe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="role">Role</label>
              <Input id="role" placeholder="Administrator" disabled />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Update your password and security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="currentPassword">Current Password</label>
              <Input id="currentPassword" type="password" />
            </div>
            <div></div>
            <div className="space-y-2">
              <label htmlFor="newPassword">New Password</label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  )
}
