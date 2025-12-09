import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";

const Prediction = () => {
  const predictions = [
    {
      category: "Raw Materials",
      current: 156,
      predicted: 120,
      trend: "down",
      recommendation: "Order within 5 days",
    },
    {
      category: "Finished Goods",
      current: 89,
      predicted: 145,
      trend: "up",
      recommendation: "Prepare additional storage",
    },
    {
      category: "Packaging",
      current: 178,
      predicted: 180,
      trend: "stable",
      recommendation: "Maintain current levels",
    },
  ];

  const upcomingOrders = [
    { id: "ORD-001", items: 45, date: "Dec 12, 2025", status: "Confirmed" },
    { id: "ORD-002", items: 78, date: "Dec 15, 2025", status: "Pending" },
    { id: "ORD-003", items: 32, date: "Dec 18, 2025", status: "Confirmed" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "down":
        return <TrendingDown className="h-5 w-5 text-destructive" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Prediction</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered inventory forecasting and recommendations
        </p>
      </div>

      {/* 7-Day Forecast */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            7-Day Inventory Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {predictions.map((item) => (
              <Card key={item.category} className="border-border bg-accent/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{item.category}</h3>
                    {getTrendIcon(item.trend)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current</span>
                      <span className="font-medium text-foreground">{item.current} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Predicted</span>
                      <span className="font-medium text-foreground">{item.predicted} units</span>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-primary font-medium">{item.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Orders */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Orders Impact</CardTitle>
          <p className="text-sm text-muted-foreground">
            Scheduled orders that will affect inventory
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Order ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Items</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Expected Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-medium text-foreground">{order.id}</td>
                    <td className="py-3 px-4 text-foreground">{order.items}</td>
                    <td className="py-3 px-4 text-foreground">{order.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Confirmed"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Prediction;
