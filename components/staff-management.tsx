"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Phone, Mail } from "lucide-react"

interface StaffMember {
  id: string
  name: string
  role: string
  status: "active" | "inactive" | "on-leave"
  phone: string
  email: string
  joinDate: string
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Villa Manager",
    status: "active",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@villa.com",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Maintenance",
    status: "active",
    phone: "+1 (555) 234-5678",
    email: "mike.chen@villa.com",
    joinDate: "2023-03-20",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Housekeeping",
    status: "active",
    phone: "+1 (555) 345-6789",
    email: "emily.rodriguez@villa.com",
    joinDate: "2023-02-10",
  },
  {
    id: "4",
    name: "David Wilson",
    role: "Security",
    status: "on-leave",
    phone: "+1 (555) 456-7890",
    email: "david.wilson@villa.com",
    joinDate: "2022-11-05",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "Concierge",
    status: "active",
    phone: "+1 (555) 567-8901",
    email: "lisa.thompson@villa.com",
    joinDate: "2023-04-12",
  },
]

export function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
  })

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: StaffMember["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "on-leave":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">On Leave</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleAddStaff = () => {
    if (newStaff.name && newStaff.role && newStaff.phone && newStaff.email) {
      const newMember: StaffMember = {
        id: Date.now().toString(),
        ...newStaff,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      }
      setStaff([...staff, newMember])
      setNewStaff({ name: "", role: "", phone: "", email: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteStaff = (id: string) => {
    setStaff(staff.filter((member) => member.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Staff Management</h2>
          <p className="text-muted-foreground">Manage your villa staff members and their roles</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Enter the details for the new staff member. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newStaff.role} onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Villa Manager">Villa Manager</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Concierge">Concierge</SelectItem>
                    <SelectItem value="Chef">Chef</SelectItem>
                    <SelectItem value="Gardener">Gardener</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="email@villa.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStaff} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Add Staff Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>Search and manage all staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search staff by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Staff Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1" />
                          {member.phone}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1" />
                          {member.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStaff(member.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No staff members found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Staff Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{staff.filter((s) => s.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">On Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {staff.filter((s) => s.status === "on-leave").length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
