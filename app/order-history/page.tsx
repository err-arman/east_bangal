"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Package, Search, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useUserAndOrderStorage } from "@/hook/useUserAndOrderStorage";

export default function OrderTrackingPage() {
  const { orderHistory } = useUserAndOrderStorage();
  const [error, setError] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "shipped":
      case "delivered":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {orderHistory.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Recent Orders</h2>
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <Card key={order.orderId} className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-semibold text-lg">{order.orderId}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          Total: {order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {orderHistory.length === 0 && !error && (
          <Card className="p-8 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground mb-2">No orders yet</p>
            <p className="text-sm text-muted-foreground">
              Your order history will appear here after you make your first
              purchase
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
