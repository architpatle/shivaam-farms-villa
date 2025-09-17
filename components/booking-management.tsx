"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Plus, Search, Eye, Edit, MapPin, Users, Clock } from "lucide-react"

interface Booking {
  id: string
  guestName: string
  villa: string
  checkIn: string
  checkOut: string
  guests: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  totalAmount: number
  phone: string
  email: string
}

const mockBookings: Booking[] = [
  {
    id: "1",
    guestName: "John Smith",
    villa: "Villa Sunset",
    checkIn: "2024-01-20",
    checkOut: "2024-01-27",
    guests: 4,
    status: "confirmed",
    totalAmount: 4200,
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
  },
  {
    id: "2",
    guestName: "Maria Garcia",
    villa: "Villa Ocean View",
    checkIn: "2024-01-25",
    checkOut: "2024-01-30",
    guests: 2,
    status: "confirmed",
    totalAmount: 3100,
    phone: "+1 (555) 234-5678",
    email: "maria.garcia@email.com",
  },
  {
    id: "3",
    guestName: "David Johnson",
    villa: "Villa Mountain",
    checkIn: "2024-02-01",
    checkOut: "2024-02-04",
    guests: 6,
    status: "pending",
    totalAmount: 1800,
    phone: "+1 (555) 345-6789",
    email: "david.johnson@email.com",
  },
  {
    id: "4",
    guestName: "Sarah Wilson",
    villa: "Villa Sunset",
    checkIn: "2024-02-10",
    checkOut: "2024-02-17",
    guests: 3,
    status: "confirmed",
    totalAmount: 4900,
    phone: "+1 (555) 456-7890",
    email: "sarah.wilson@email.com",
  },
  {
    id: "5",
    guestName: "Michael Brown",
    villa: "Villa Ocean View",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    guests: 2,
    status: "completed",
    totalAmount: 2400,
    phone: "+1 (555) 567-8901",
    email: "michael.brown@email.com",
  },
]

const villas = ["Villa Sunset", "Villa Ocean View", "Villa Mountain", "Villa Garden", "Villa Paradise"]

// Simple calendar component
const CalendarView = ({ bookings }: { bookings: Booking[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getBookingsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return bookings.filter((booking) => {
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)
      const currentDay = new Date(dateStr)
      return currentDay >= checkIn && currentDay <= checkOut
    })
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
            ←
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
            →
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}

        {emptyDays.map((day) => (
          <div key={`empty-${day}`} className="p-2 h-20"></div>
        ))}

        {days.map((day) => {
          const dayBookings = getBookingsForDay(day)
          return (
            <div key={day} className="p-1 h-20 border border-border rounded-md">
              <div className="text-sm font-medium mb-1">{day}</div>
              <div className="space-y-1">
                {dayBookings.slice(0, 2).map((booking) => (
                  <div key={booking.id} className="text-xs p-1 rounded bg-accent/20 text-accent-foreground truncate">
                    {booking.villa.split(" ")[1]}
                  </div>
                ))}
                {dayBookings.length > 2 && (
                  <div className="text-xs text-muted-foreground">+{dayBookings.length - 2} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newBooking, setNewBooking] = useState({
    guestName: "",
    villa: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    phone: "",
    email: "",
  })

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.villa.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleAddBooking = () => {
    if (newBooking.guestName && newBooking.villa && newBooking.checkIn && newBooking.checkOut) {
      const booking: Booking = {
        id: Date.now().toString(),
        ...newBooking,
        guests: Number.parseInt(newBooking.guests) || 1,
        status: "pending",
        totalAmount: 0, // Would be calculated based on villa rates and duration
      }
      setBookings([...bookings, booking])
      setNewBooking({
        guestName: "",
        villa: "",
        checkIn: "",
        checkOut: "",
        guests: "",
        phone: "",
        email: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.checkIn) > new Date() && booking.status === "confirmed",
  ).length

  const currentGuests = bookings
    .filter((booking) => {
      const now = new Date()
      const checkIn = new Date(booking.checkIn)
      const checkOut = new Date(booking.checkOut)
      return now >= checkIn && now <= checkOut && booking.status === "confirmed"
    })
    .reduce((sum, booking) => sum + booking.guests, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Booking Management</h2>
          <p className="text-muted-foreground">Manage villa reservations and guest bookings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>Enter the booking details for the new reservation.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="guestName">Guest Name</Label>
                  <Input
                    id="guestName"
                    value={newBooking.guestName}
                    onChange={(e) => setNewBooking({ ...newBooking, guestName: e.target.value })}
                    placeholder="Enter guest name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="villa">Villa</Label>
                  <Select
                    value={newBooking.villa}
                    onValueChange={(value) => setNewBooking({ ...newBooking, villa: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select villa" />
                    </SelectTrigger>
                    <SelectContent>
                      {villas.map((villa) => (
                        <SelectItem key={villa} value={villa}>
                          {villa}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="checkIn">Check-in Date</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={newBooking.checkIn}
                    onChange={(e) => setNewBooking({ ...newBooking, checkIn: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="checkOut">Check-out Date</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={newBooking.checkOut}
                    onChange={(e) => setNewBooking({ ...newBooking, checkOut: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={newBooking.guests}
                  onChange={(e) => setNewBooking({ ...newBooking, guests: e.target.value })}
                  placeholder="Enter number of guests"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newBooking.phone}
                  onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newBooking.email}
                  onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                  placeholder="guest@email.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBooking} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Create Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{upcomingBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Guests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentGuests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">78%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Booking List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Manage and track all villa reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search bookings by guest name or villa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Villa</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.guestName}</div>
                            <div className="text-sm text-muted-foreground">{booking.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                            {booking.villa}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                              {new Date(booking.checkOut).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {Math.ceil(
                                (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )}{" "}
                              nights
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                            {booking.guests}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="font-medium">Rs. {booking.totalAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredBookings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No bookings found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Calendar</CardTitle>
              <CardDescription>View bookings in calendar format</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView bookings={bookings} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
