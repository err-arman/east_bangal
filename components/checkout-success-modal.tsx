"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface CheckoutSuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckoutSuccessModal({ open, onOpenChange }: CheckoutSuccessModalProps) {
  const router = useRouter()

  const handleContinueShopping = () => {
    onOpenChange(false)
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <DialogTitle className="text-center text-2xl">Order Placed Successfully!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Thank you for your order. We'll send you a confirmation email shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleContinueShopping} size="icon-lg" className="w-full">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
