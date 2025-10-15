"use client";

import type React from "react";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderSummary } from "@/components/order-summary";
import { CheckoutSuccessModal } from "@/components/checkout-success-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useUserAndOrderStorage } from "@/hook/useUserAndOrderStorage";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { userInfo, isLoaded, saveUserInfo, addOrder } =
    useUserAndOrderStorage();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Load saved user info when available
  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        city: userInfo.city,
        state: userInfo.state,
        zip: userInfo.zip,
        country: userInfo.country,
      });
    }
  }, [userInfo, isLoaded]);

  const deliveryCost = subtotal > 0 ? 35.0 : 0;
  // const discount = subtotal > 500 ? subtotal * 0.1 : 0
  const discount = 0;
  const total = subtotal + deliveryCost - discount;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      // Get form data
      const form = e.target as HTMLFormElement;
      const userData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value,
        country: form.country.value,
      };

      // Save user info for future orders
      saveUserInfo(userData);

      const data = {
        ...userData,
        paymentMethod,
        orderDetails: {
          items,
          subtotal,
          deliveryCost,
          discount,
          total,
        },
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_SPREADSHEET_WEBAPP_URL || "",
        {
          redirect: "follow",
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(data),
        }
      );

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order saved:", result);
      if (result?.success) {
        addOrder({
          orderId: result.orderId,
          date: new Date().toISOString(),
          total: total,
          status: "Pending",
        });
      }

      if (result.success) {
        setIsLoading(false);
        // Show success modal
        setShowSuccess(true);
        // Clear cart
        clearCart();
        // alert(`Order submitted successfully! Order ID: ${result.orderId}`);
      } else {
        setIsLoading(false);
        throw new Error(result.message || "Failed to save order");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting order:", error);
      // alert("There was an error submitting your order. Please try again.");
    }
  };

  if (items.length === 0 && !showSuccess) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
          <Card className="p-8 md:p-12 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Your cart is empty
            </p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="John"
                        defaultValue={formData.firstName}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Doe"
                        defaultValue={formData.lastName}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      defaultValue={formData.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      defaultValue={formData.phone}
                    />
                  </div>
                </div>
              </Card>

              {/* Shipping Address */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      placeholder="123 Main Street"
                      defaultValue={formData.address}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        placeholder="New York"
                        defaultValue={formData.city}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        name="state"
                        required
                        placeholder="NY"
                        defaultValue={formData.state}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP/Postal Code *</Label>
                      <Input
                        id="zip"
                        name="zip"
                        required
                        placeholder="10001"
                        defaultValue={formData.zip}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        required
                        placeholder="United States"
                        defaultValue={formData.country}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Method - unchanged */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-md">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-muted-foreground">
                        Pay when you receive your order
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-md opacity-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex-1">
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">
                        Coming soon
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>

              {/* Submit Button - Mobile */}
              <div className="lg:hidden">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? <Loader /> : "Place Order"}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-20">
              {/* Cart Items Summary */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Order Items ({items.length})
                </h2>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × {item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="font-medium text-sm">
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Order Summary */}
              <OrderSummary
                subtotal={subtotal}
                deliveryCost={deliveryCost}
                discount={discount}
                total={total}
              />

              {/* Submit Button - Desktop */}
              <div className="hidden lg:block">
                <Button
                  disabled={isLoading}
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const form = document.querySelector("form");
                    if (form) {
                      form.requestSubmit();
                    }
                  }}
                >
                  {isLoading ? <Loader /> : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <CheckoutSuccessModal open={showSuccess} onOpenChange={setShowSuccess} />
    </main>
  );
}
