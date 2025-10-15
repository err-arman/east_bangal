"use client";

fimport { useState, useEffect } from 'react';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderHistory {
  orderId: string;
  date: string;
  total: number;
  status: string;
}

export const useUserAndOrderStorage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount with hydration safety
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const savedUserInfo = localStorage.getItem('userInfo');
        const savedOrders = localStorage.getItem('orderHistory');

        if (savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo));
        }

        if (savedOrders) {
          setOrderHistory(JSON.parse(savedOrders));
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadStoredData();
  }, []);

  // Safe storage functions
  const safeStorage = {
    set: (key: string, value: any) => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error('Error saving to storage:', error);
      }
    },
    remove: (key: string) => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.error('Error removing from storage:', error);
      }
    }
  };

  // Updated storage functions
  const saveUserInfo = (info: UserInfo) => {
    setUserInfo(info);
    safeStorage.set('userInfo', info);
  };

  const addOrder = (order: OrderHistory) => {
    const updatedOrders = [order, ...orderHistory];
    setOrderHistory(updatedOrders);
    safeStorage.set('orderHistory', updatedOrders);
  };

  const clearUserInfo = () => {
    setUserInfo(null);
    safeStorage.remove('userInfo');
  };

  const clearOrderHistory = () => {
    setOrderHistory([]);
    safeStorage.remove('orderHistory');
  };

  return {
    userInfo,
    orderHistory,
    isLoaded,
    saveUserInfo,
    addOrder,
    clearUserInfo,
    clearOrderHistory,
  };
};