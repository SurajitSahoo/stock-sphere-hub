import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Sparkles, RefreshCw, Package, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StockPrediction {
  eventName: string;
  eventDate: string;
  category: string;
  currentStock: number;
  recommendedIncrease: number;
  reason: string;
}

const Prediction = () => {
  const [predictions, setPredictions] = useState<StockPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const currentStock = {
    rawMaterials: 156,
    finishedGoods: 89,
    packaging: 178,
  };

  const generatePredictions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('predict-stock', {
        body: { currentStock }
      });

      if (error) {
        console.error("Error calling predict-stock:", error);
        toast.error("Failed to generate predictions. Please try again.");
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setPredictions(data.predictions || []);
      setHasGenerated(true);
      toast.success("AI predictions generated successfully!");
    } catch (error) {
      console.error("Error generating predictions:", error);
      toast.error("Failed to generate predictions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Raw Materials":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "Finished Goods":
        return <Package className="h-5 w-5 text-green-500" />;
      case "Packaging":
        return <Package className="h-5 w-5 text-purple-500" />;
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Stock Prediction</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered inventory forecasting based on upcoming events
          </p>
        </div>
        <Button 
          onClick={generatePredictions} 
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              {hasGenerated ? "Regenerate Predictions" : "Generate AI Predictions"}
            </>
          )}
        </Button>
      </div>

      {/* Current Stock Overview */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Current Stock Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-muted-foreground text-sm">Raw Materials</p>
              <p className="text-2xl font-bold text-foreground">{currentStock.rawMaterials} units</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-muted-foreground text-sm">Finished Goods</p>
              <p className="text-2xl font-bold text-foreground">{currentStock.finishedGoods} units</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-muted-foreground text-sm">Packaging</p>
              <p className="text-2xl font-bold text-foreground">{currentStock.packaging} units</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions */}
      {!hasGenerated && !isLoading && (
        <Card className="border-border border-dashed">
          <CardContent className="py-12 text-center">
            <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Predictions Generated Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Click the button above to generate AI-powered stock predictions based on upcoming events
            </p>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card className="border-border">
          <CardContent className="py-12 text-center">
            <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Analyzing Upcoming Events...
            </h3>
            <p className="text-muted-foreground">
              AI is predicting stock requirements based on events, seasons, and trends
            </p>
          </CardContent>
        </Card>
      )}

      {hasGenerated && predictions.length > 0 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Event-Based Stock Predictions
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              AI-generated recommendations for upcoming events
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.map((prediction, index) => (
                <Card key={index} className="border-border bg-accent/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(prediction.category)}
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {prediction.category}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{prediction.eventDate}</span>
                    </div>
                    
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {prediction.eventName}
                    </h3>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Current Stock</span>
                        <span className="font-medium text-foreground">{prediction.currentStock} units</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Recommended Increase</span>
                        <span className="font-bold text-primary flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          +{prediction.recommendedIncrease} units
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{prediction.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {hasGenerated && predictions.length > 0 && (
        <Card className="border-border bg-primary/5">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Total Recommended Stock Increases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Raw Materials", "Finished Goods", "Packaging"].map((category) => {
                const total = predictions
                  .filter((p) => p.category === category)
                  .reduce((sum, p) => sum + p.recommendedIncrease, 0);
                return (
                  <div key={category} className="p-4 rounded-lg bg-background border border-border">
                    <p className="text-muted-foreground text-sm">{category}</p>
                    <p className="text-2xl font-bold text-primary">+{total} units</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Prediction;
