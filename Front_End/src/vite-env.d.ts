/// <reference types="vite/client" />
interface modeState {
    mode: "dark" | "light";
}
interface sidebarState {
    isNonMobile: boolean;
    isSidebarOpen: boolean;
}
interface userData {
    city: string;
    country: string;
    createdAt: string;
    email: string;
    name: string;
    occupation: string;
    password: string;
    phoneNumber: string;
    role: string;
    state: null | string;
    transactions: string[];
    updatedAt: string;
    __v: number;
    _id: string;
}
interface userProducts {
    _id?: string;
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    rating?: number;
    supply?: number;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
    stat: [
        {
            _id?: string;
            productId?: string;
            monthlyData?: [
                {
                    month?: string;
                    totalSales?: number;
                    totalUnits?: number;
                    _id?: string;
                }[]
            ];
            __v?: number;
            createdAt?: string;
            updatedAt?: string;
        }
    ];
}
interface transactions {
    _id: string;
    userId: string;
    cost: string;
    products: string[];
    __v: number;
    createdAt: string;
    updatedAt: string;
}
interface overallStats {
    _id: string;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: {
        month: string;
        totalSales: number;
        totalUnits: number;
        _id: string;
    }[];
    dailyData: {
        date: string;
        totalSales: number;
        totalUnits: number;
        _id: string;
    }[];
    salesByCategory: {
        shoes: number;
        clothing: number;
        accessories: number;
        misc: number;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface userState {
    id: string;
    userData: userData | null;
}
interface ColorTokens {
    0?: string;
    10?: string;
    50?: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000?: string;
}
interface ColorOptions {
    alt?: string;
    light?: string;
    main?: string;
    default?: string;
}
