import CircularProgress from "@/components/CircularProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  // Sample stock data - these would come from your backend
  const stockData = [
    { label: "Raw Materials", value: 156, maxValue: 200, color: "primary" as const },
    { label: "Finished Goods", value: 89, maxValue: 200, color: "chart-1" as const },
    { label: "Packaging", value: 178, maxValue: 200, color: "chart-2" as const },
  ];

  const stats = [
    { label: "Total Items", value: "1,234", icon: Package, trend: "+12%" },
    { label: "In Transit", value: "45", icon: TrendingUp, trend: "+5%" },
    { label: "Low Stock", value: "8", icon: AlertTriangle, trend: "-2" },
    { label: "Orders Ready", value: "23", icon: CheckCircle, trend: "+7" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your warehouse stock levels at a glance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <stat.icon className="h-8 w-8 text-primary" />
                  <span className="text-xs text-primary font-medium">{stat.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Circular Progress Section */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl">Stock Levels</CardTitle>
          <p className="text-sm text-muted-foreground">
            Current inventory across main categories (Max capacity: 200 units each)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-6">
            {stockData.map((stock) => (
              <div key={stock.label} className="flex justify-center">
                <CircularProgress
                  value={stock.value}
                  maxValue={stock.maxValue}
                  label={stock.label}
                  color={stock.color}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Stock received", item: "Raw Materials - Batch #1234", time: "2 hours ago" },
              { action: "Order shipped", item: "Finished Goods - Order #5678", time: "4 hours ago" },
              { action: "Low stock alert", item: "Packaging supplies", time: "Yesterday" },
              { action: "Inventory audit", item: "Warehouse Section A", time: "2 days ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.item}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
