"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, DollarSign, IndianRupee, CreditCard, Wallet, Download } from "lucide-react"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "Mar", revenue: 48000, expenses: 33000, profit: 15000 },
  { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000 },
  { month: "May", revenue: 55000, expenses: 36000, profit: 19000 },
  { month: "Jun", revenue: 67000, expenses: 41000, profit: 26000 },
]

const expenseBreakdown = [
  { name: "Staff Salaries", value: 18000, color: "#0f9d58" },
  { name: "Maintenance", value: 8000, color: "#2b6cb0" },
  { name: "Utilities", value: 5000, color: "#f59e0b" },
  { name: "Supplies", value: 4000, color: "#ef4444" },
  { name: "Marketing", value: 3000, color: "#8b5cf6" },
  { name: "Other", value: 3000, color: "#6b7280" },
]

const recentTransactions = [
  {
    id: "1",
    description: "Villa A - 7 nights booking",
    amount: 4200,
    type: "income",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    description: "Pool maintenance service",
    amount: -850,
    type: "expense",
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: "3",
    description: "Villa B - 5 nights booking",
    amount: 3100,
    type: "income",
    date: "2024-01-13",
    status: "completed",
  },
  {
    id: "4",
    description: "Housekeeping supplies",
    amount: -320,
    type: "expense",
    date: "2024-01-12",
    status: "completed",
  },
  {
    id: "5",
    description: "Villa C - 3 nights booking",
    amount: 1800,
    type: "income",
    date: "2024-01-11",
    status: "pending",
  },
]

export function FinanceSection() {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0)
  const totalProfit = totalRevenue - totalExpenses

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Finance Overview</h2>
          <p className="text-muted-foreground">Track revenue, expenses, and profitability</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />

          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Rs. {totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+12.5%</span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Rs. {totalExpenses.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-600">+8.2%</span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Rs. {totalProfit.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+18.7%</span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expenses Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Monthly comparison over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Bar dataKey="revenue" fill="#0f9d58" name="Revenue" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Current month expense distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {expenseBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                  <Area type="monotone" dataKey="revenue" stroke="#0f9d58" fill="#0f9d58" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Trend</CardTitle>
              <CardDescription>Monthly expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Expenses"]} />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : ""} Rs. {Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.status === "completed" ? "default" : "secondary"}
                      className={
                        transaction.status === "completed" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
