"use client"

import React from "react"

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
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Edit, AlertTriangle, Package, Utensils, Wrench, Sofa } from "lucide-react"

interface StockItem {
  id: string
  name: string
  category: "furniture" | "groceries" | "maintenance" | "amenities"
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  location: string
  lastUpdated: string
  supplier?: string
}

const mockStock: StockItem[] = [
  {
    id: "1",
    name: "Bed Sheets (Queen)",
    category: "amenities",
    currentStock: 12,
    minStock: 8,
    maxStock: 20,
    unit: "sets",
    location: "Villa Sunset",
    lastUpdated: "2024-01-15",
    supplier: "Luxury Linens Co.",
  },
  {
    id: "2",
    name: "Toilet Paper",
    category: "amenities",
    currentStock: 24,
    minStock: 15,
    maxStock: 50,
    unit: "rolls",
    location: "All Villas",
    lastUpdated: "2024-01-14",
    supplier: "Cleaning Supplies Inc.",
  },
  {
    id: "3",
    name: "Pool Chemicals",
    category: "maintenance",
    currentStock: 3,
    minStock: 5,
    maxStock: 15,
    unit: "bottles",
    location: "Storage Room",
    lastUpdated: "2024-01-13",
    supplier: "Pool Care Pro",
  },
  {
    id: "4",
    name: "Coffee Beans",
    category: "groceries",
    currentStock: 8,
    minStock: 6,
    maxStock: 20,
    unit: "bags",
    location: "Villa Kitchen",
    lastUpdated: "2024-01-12",
    supplier: "Premium Coffee Co.",
  },
  {
    id: "5",
    name: "Outdoor Furniture Set",
    category: "furniture",
    currentStock: 2,
    minStock: 1,
    maxStock: 5,
    unit: "sets",
    location: "Villa Ocean View",
    lastUpdated: "2024-01-10",
    supplier: "Garden Furniture Ltd.",
  },
  {
    id: "6",
    name: "Cleaning Supplies",
    category: "maintenance",
    currentStock: 4,
    minStock: 8,
    maxStock: 20,
    unit: "kits",
    location: "Storage Room",
    lastUpdated: "2024-01-11",
    supplier: "Cleaning Supplies Inc.",
  },
  {
    id: "7",
    name: "Wine Collection",
    category: "groceries",
    currentStock: 18,
    minStock: 12,
    maxStock: 30,
    unit: "bottles",
    location: "Wine Cellar",
    lastUpdated: "2024-01-09",
    supplier: "Fine Wines Ltd.",
  },
  {
    id: "8",
    name: "Air Conditioning Filters",
    category: "maintenance",
    currentStock: 6,
    minStock: 10,
    maxStock: 25,
    unit: "pieces",
    location: "Maintenance Room",
    lastUpdated: "2024-01-08",
    supplier: "HVAC Parts Co.",
  },
]

const categories = [
  { value: "furniture", label: "Furniture", icon: Sofa },
  { value: "groceries", label: "Groceries", icon: Utensils },
  { value: "maintenance", label: "Maintenance", icon: Wrench },
  { value: "amenities", label: "Amenities", icon: Package },
]

export function StockManagement() {
  const [stock, setStock] = useState<StockItem[]>(mockStock)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unit: "",
    location: "",
    supplier: "",
  })

  const filteredStock = stock.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStockStatus = (item: StockItem) => {
    const percentage = (item.currentStock / item.maxStock) * 100
    if (item.currentStock <= item.minStock) {
      return { status: "low", color: "text-red-600", bgColor: "bg-red-100" }
    } else if (percentage < 50) {
      return { status: "medium", color: "text-orange-600", bgColor: "bg-orange-100" }
    } else {
      return { status: "good", color: "text-green-600", bgColor: "bg-green-100" }
    }
  }

  const getStockBadge = (item: StockItem) => {
    const { status, color, bgColor } = getStockStatus(item)
    const labels = { low: "Low Stock", medium: "Medium", good: "In Stock" }
    return <Badge className={`${bgColor} ${color} hover:${bgColor}`}>{labels[status as keyof typeof labels]}</Badge>
  }

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.currentStock && newItem.minStock && newItem.maxStock) {
      const item: StockItem = {
        id: Date.now().toString(),
        ...newItem,
        currentStock: Number.parseInt(newItem.currentStock),
        minStock: Number.parseInt(newItem.minStock),
        maxStock: Number.parseInt(newItem.maxStock),
        lastUpdated: new Date().toISOString().split("T")[0],
      }
      setStock([...stock, item])
      setNewItem({
        name: "",
        category: "",
        currentStock: "",
        minStock: "",
        maxStock: "",
        unit: "",
        location: "",
        supplier: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const lowStockItems = stock.filter((item) => item.currentStock <= item.minStock)
  const totalItems = stock.length
  const totalValue = stock.reduce((sum, item) => sum + item.currentStock * 50, 0) // Estimated value

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((cat) => cat.value === category)
    return categoryData ? categoryData.icon : Package
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Stock Management</h2>
          <p className="text-muted-foreground">Track villa supplies and inventory levels</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Stock Item</DialogTitle>
              <DialogDescription>Enter the details for the new inventory item.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    placeholder="e.g., pieces, bottles, sets"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    min="0"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({ ...newItem, currentStock: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    min="0"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxStock">Max Stock</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    min="0"
                    value={newItem.maxStock}
                    onChange={(e) => setNewItem({ ...newItem, maxStock: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  placeholder="Enter storage location"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier (Optional)</Label>
                <Input
                  id="supplier"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                  placeholder="Enter supplier name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription className="text-red-600">Items that need immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      {React.createElement(getCategoryIcon(item.category), {
                        className: "w-4 h-4 text-red-600",
                      })}
                    </div>
                    <div>
                      <div className="font-medium text-red-800">{item.name}</div>
                      <div className="text-sm text-red-600">
                        {item.currentStock} {item.unit} remaining (min: {item.minStock})
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                    Reorder
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>Complete list of all stock items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search items by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStock.map((item) => {
                      const stockPercentage = (item.currentStock / item.maxStock) * 100
                      const Icon = getCategoryIcon(item.category)
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                                <Icon className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="font-medium">{item.name}</div>
                                {item.supplier && <div className="text-sm text-muted-foreground">{item.supplier}</div>}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>
                                  {item.currentStock} / {item.maxStock} {item.unit}
                                </span>
                                <span className="text-muted-foreground">{Math.round(stockPercentage)}%</span>
                              </div>
                              <Progress value={stockPercentage} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>{getStockBadge(item)}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredStock.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No items found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <category.icon className="w-5 h-5 mr-2" />
                  {category.label}
                </CardTitle>
                <CardDescription>Items in the {category.label.toLowerCase()} category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stock
                    .filter((item) => item.category === category.value)
                    .map((item) => {
                      const stockPercentage = (item.currentStock / item.maxStock) * 100
                      return (
                        <Card key={item.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{item.name}</CardTitle>
                            <CardDescription>{item.location}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Stock Level</span>
                                {getStockBadge(item)}
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>
                                    {item.currentStock} / {item.maxStock} {item.unit}
                                  </span>
                                  <span className="text-muted-foreground">{Math.round(stockPercentage)}%</span>
                                </div>
                                <Progress value={stockPercentage} className="h-2" />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
