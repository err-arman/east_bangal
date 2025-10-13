"use client"

import { Card } from "@/components/ui/card"

interface OrderSummaryProps {
  subtotal: number
  deliveryCost: number
  discount: number
  total: number
}

export function OrderSummary({ subtotal, deliveryCost, discount, total }: OrderSummaryProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery</span>
          <span className="font-medium">{deliveryCost.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount (10%)</span>
            <span className="font-medium">-{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg">{total.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  )
}
