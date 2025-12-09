import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart3, PieChart } from "lucide-react";

const Report = () => {
  const reports = [
    {
      title: "Monthly Inventory Summary",
      description: "Complete overview of stock movements and levels",
      icon: FileText,
      lastGenerated: "Dec 1, 2025",
    },
    {
      title: "Stock Turnover Analysis",
      description: "Analysis of inventory turnover rates",
      icon: BarChart3,
      lastGenerated: "Nov 28, 2025",
    },
    {
      title: "Category Distribution",
      description: "Breakdown of inventory by category",
      icon: PieChart,
      lastGenerated: "Nov 25, 2025",
    },
  ];

  const inventorySummary = [
    { category: "Raw Materials", inStock: 156, received: 234, dispatched: 178 },
    { category: "Finished Goods", inStock: 89, received: 156, dispatched: 167 },
    { category: "Packaging", inStock: 178, received: 200, dispatched: 122 },
    { category: "Equipment", inStock: 45, received: 12, dispatched: 8 },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and download warehouse reports
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export All Data
        </Button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.title} className="border-border hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <report.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last generated: {report.lastGenerated}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inventory Summary Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl">Current Month Summary</CardTitle>
          <p className="text-sm text-muted-foreground">
            Overview of inventory movements for December 2025
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Category</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">In Stock</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Received</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Dispatched</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Net Change</th>
                </tr>
              </thead>
              <tbody>
                {inventorySummary.map((item) => {
                  const netChange = item.received - item.dispatched;
                  return (
                    <tr key={item.category} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 font-medium text-foreground">{item.category}</td>
                      <td className="py-3 px-4 text-right text-foreground">{item.inStock}</td>
                      <td className="py-3 px-4 text-right text-foreground">{item.received}</td>
                      <td className="py-3 px-4 text-right text-foreground">{item.dispatched}</td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        netChange > 0 ? "text-green-600" : netChange < 0 ? "text-destructive" : "text-muted-foreground"
                      }`}>
                        {netChange > 0 ? "+" : ""}{netChange}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-accent/30">
                  <td className="py-3 px-4 font-bold text-foreground">Total</td>
                  <td className="py-3 px-4 text-right font-bold text-foreground">
                    {inventorySummary.reduce((sum, item) => sum + item.inStock, 0)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-foreground">
                    {inventorySummary.reduce((sum, item) => sum + item.received, 0)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-foreground">
                    {inventorySummary.reduce((sum, item) => sum + item.dispatched, 0)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-primary">
                    +{inventorySummary.reduce((sum, item) => sum + (item.received - item.dispatched), 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
