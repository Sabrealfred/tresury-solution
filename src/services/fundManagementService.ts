import { supabase } from "@/integrations/supabase/client";

// Simple UUID generator function
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Mock data for portfolios
const MOCK_PORTFOLIOS: Portfolio[] = [
  {
    id: "1",
    name: "Growth Portfolio",
    description: "Optimized for long-term growth with a focus on technology and emerging markets",
    type: "growth",
    risk_level: "High",
    expected_return: 12.5,
    user_id: "user-1",
    created_at: "2023-06-15T10:00:00Z",
    updated_at: "2023-06-15T10:00:00Z",
    allocation: {
      "US Stocks": 45,
      "International Stocks": 25,
      "Emerging Markets": 15,
      "Bonds": 10,
      "Alternatives": 5
    },
    status: "active" as const
  },
  {
    id: "2",
    name: "Income Portfolio",
    description: "Focused on generating stable income with lower volatility",
    type: "income",
    risk_level: "Medium",
    expected_return: 8.2,
    user_id: "user-1",
    created_at: "2023-08-22T14:30:00Z",
    updated_at: "2023-08-22T14:30:00Z",
    allocation: {
      "Dividend Stocks": 30,
      "Bonds": 40,
      "REITs": 15,
      "Preferred Stocks": 10,
      "Cash": 5
    },
    status: "active" as const
  },
  {
    id: "3",
    name: "Balanced Portfolio",
    description: "Balanced approach with moderate risk and diversified asset allocation",
    type: "balanced",
    risk_level: "Medium-Low",
    expected_return: 6.5,
    user_id: "user-1",
    created_at: "2023-11-05T09:15:00Z",
    updated_at: "2023-11-05T09:15:00Z",
    allocation: {
      "US Stocks": 30,
      "International Stocks": 20,
      "Bonds": 35,
      "Real Estate": 10,
      "Cash": 5
    },
    status: "active" as const
  },
  {
    id: "4",
    name: "AI Conservative Portfolio",
    description: "AI-generated portfolio optimized for capital preservation with low risk tolerance",
    type: "conservative",
    risk_level: "Low",
    expected_return: 4.5,
    user_id: "user-1",
    created_at: "2024-01-10T11:20:00Z",
    updated_at: "2024-01-10T11:20:00Z",
    allocation: {
      "Bonds": 60,
      "Dividend Stocks": 20,
      "Cash": 15,
      "Gold": 5
    },
    status: "recommended" as const
  },
  {
    id: "5",
    name: "AI Aggressive Growth",
    description: "AI-generated portfolio optimized for maximum growth potential with higher volatility",
    type: "growth",
    risk_level: "Very High",
    expected_return: 15.8,
    user_id: "user-1",
    created_at: "2024-02-18T16:45:00Z",
    updated_at: "2024-02-18T16:45:00Z",
    allocation: {
      "US Growth Stocks": 40,
      "International Stocks": 25,
      "Emerging Markets": 20,
      "Small Cap Stocks": 10,
      "Alternatives": 5
    },
    status: "recommended" as const
  }
];

// Mock data for transactions
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    portfolio_id: "1",
    security_symbol: "AAPL",
    security_name: "Apple Inc.",
    transaction_type: "buy" as const,
    quantity: 10,
    price: 182.52,
    total_amount: 1825.20,
    status: "completed",
    created_at: "2024-02-25T14:30:00Z",
    user_id: "user-1"
  },
  {
    id: "2",
    portfolio_id: "1",
    security_symbol: "MSFT",
    security_name: "Microsoft Corporation",
    transaction_type: "sell" as const,
    quantity: 5,
    price: 415.32,
    total_amount: 2076.60,
    status: "completed",
    created_at: "2024-02-24T10:15:00Z",
    user_id: "user-1"
  },
  {
    id: "3",
    portfolio_id: "2",
    security_symbol: "GOOGL",
    security_name: "Alphabet Inc.",
    transaction_type: "buy" as const,
    quantity: 8,
    price: 147.68,
    total_amount: 1181.44,
    status: "completed",
    created_at: "2024-02-22T09:45:00Z",
    user_id: "user-1"
  }
];

export interface Portfolio {
  id: string;
  name: string;
  description: string;
  type: string;
  risk_level: string;
  expected_return: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  allocation: Record<string, number>;
  status: "active" | "recommended" | "archived";
}

export interface Transaction {
  id: string;
  portfolio_id: string;
  security_symbol: string;
  security_name: string;
  transaction_type: "buy" | "sell";
  quantity: number;
  price: number;
  total_amount: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
  user_id: string;
}

export interface Security {
  symbol: string;
  name: string;
  current_price: number;
  change_percentage: number;
  market_cap: number;
  volume: number;
  sector: string;
}

/**
 * Fund Management Service
 * 
 * Provides methods for interacting with the fund management data in Supabase
 */
export const fundManagementService = {
  /**
   * Get all portfolios for the current user
   */
  async getPortfolios(): Promise<Portfolio[]> {
    try {
      // In a real app, we would fetch from Supabase
      // For now, return mock data
      const { data: { user } } = await supabase.auth.getUser();
      
      // Filter portfolios for the current user
      // In this mock implementation, we're just returning all mock portfolios
      return [...MOCK_PORTFOLIOS];
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      throw error;
    }
  },

  /**
   * Get a specific portfolio by ID
   */
  async getPortfolio(id: string): Promise<Portfolio | null> {
    try {
      // In a real app, we would fetch from Supabase
      // For now, find in mock data
      const portfolio = MOCK_PORTFOLIOS.find(p => p.id === id);
      return portfolio || null;
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      throw error;
    }
  },

  /**
   * Create a new portfolio
   */
  async createPortfolio(portfolio: Omit<Portfolio, "id" | "created_at" | "updated_at" | "user_id">): Promise<Portfolio> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const now = new Date().toISOString();
      const newPortfolio: Portfolio = {
        ...portfolio,
        id: generateUUID(),
        user_id: user.id || "user-1", // Fallback for mock data
        created_at: now,
        updated_at: now
      };

      // In a real app, we would save to Supabase
      // For now, just return the new portfolio
      return newPortfolio;
    } catch (error) {
      console.error("Error creating portfolio:", error);
      throw error;
    }
  },

  /**
   * Update an existing portfolio
   */
  async updatePortfolio(id: string, updates: Partial<Omit<Portfolio, "id" | "created_at" | "user_id">>): Promise<Portfolio> {
    try {
      const portfolio = MOCK_PORTFOLIOS.find(p => p.id === id);
      if (!portfolio) throw new Error("Portfolio not found");

      const now = new Date().toISOString();
      const updatedPortfolio: Portfolio = {
        ...portfolio,
        ...updates,
        updated_at: now
      };

      // In a real app, we would update in Supabase
      // For now, just return the updated portfolio
      return updatedPortfolio;
    } catch (error) {
      console.error("Error updating portfolio:", error);
      throw error;
    }
  },

  /**
   * Delete a portfolio
   */
  async deletePortfolio(id: string): Promise<void> {
    try {
      // In a real app, we would delete from Supabase
      // For now, just log the deletion
      console.log(`Portfolio ${id} would be deleted`);
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      throw error;
    }
  },

  /**
   * Get transactions for a specific portfolio
   */
  async getPortfolioTransactions(portfolioId: string): Promise<Transaction[]> {
    try {
      // In a real app, we would fetch from Supabase
      // For now, filter mock transactions
      return MOCK_TRANSACTIONS.filter(t => t.portfolio_id === portfolioId);
    } catch (error) {
      console.error("Error fetching portfolio transactions:", error);
      throw error;
    }
  },

  /**
   * Create a new transaction
   */
  async createTransaction(transaction: Omit<Transaction, "id" | "created_at" | "user_id">): Promise<Transaction> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const newTransaction: Transaction = {
        ...transaction,
        id: generateUUID(),
        user_id: user.id || "user-1", // Fallback for mock data
        created_at: new Date().toISOString()
      };

      // In a real app, we would save to Supabase
      // For now, just return the new transaction
      return newTransaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },

  /**
   * Get available securities for trading
   */
  async getSecurities(): Promise<Security[]> {
    // In a real app, this would fetch from a securities table or external API
    // For now, return mock data
    return [
      { 
        symbol: "AAPL", 
        name: "Apple Inc.", 
        current_price: 182.52, 
        change_percentage: 0.69,
        market_cap: 2850000000000,
        volume: 52436789,
        sector: "Technology"
      },
      { 
        symbol: "MSFT", 
        name: "Microsoft Corporation", 
        current_price: 415.32, 
        change_percentage: -0.52,
        market_cap: 3100000000000,
        volume: 28745123,
        sector: "Technology"
      },
      { 
        symbol: "GOOGL", 
        name: "Alphabet Inc.", 
        current_price: 147.68, 
        change_percentage: 2.37,
        market_cap: 1850000000000,
        volume: 18965432,
        sector: "Technology"
      },
      { 
        symbol: "AMZN", 
        name: "Amazon.com Inc.", 
        current_price: 178.35, 
        change_percentage: 0.49,
        market_cap: 1950000000000,
        volume: 32145678,
        sector: "Consumer Cyclical"
      },
      { 
        symbol: "TSLA", 
        name: "Tesla, Inc.", 
        current_price: 175.21, 
        change_percentage: -2.95,
        market_cap: 550000000000,
        volume: 45632178,
        sector: "Automotive"
      },
      { 
        symbol: "JPM", 
        name: "JPMorgan Chase & Co.", 
        current_price: 183.45, 
        change_percentage: 0.32,
        market_cap: 530000000000,
        volume: 12345678,
        sector: "Financial Services"
      },
      { 
        symbol: "V", 
        name: "Visa Inc.", 
        current_price: 275.62, 
        change_percentage: 1.25,
        market_cap: 580000000000,
        volume: 8765432,
        sector: "Financial Services"
      },
      { 
        symbol: "PG", 
        name: "Procter & Gamble Co.", 
        current_price: 162.35, 
        change_percentage: 0.15,
        market_cap: 380000000000,
        volume: 5432167,
        sector: "Consumer Defensive"
      },
      { 
        symbol: "JNJ", 
        name: "Johnson & Johnson", 
        current_price: 155.78, 
        change_percentage: -0.45,
        market_cap: 405000000000,
        volume: 6543217,
        sector: "Healthcare"
      },
      { 
        symbol: "WMT", 
        name: "Walmart Inc.", 
        current_price: 58.92, 
        change_percentage: 0.87,
        market_cap: 475000000000,
        volume: 9876543,
        sector: "Consumer Defensive"
      }
    ];
  },

  /**
   * Generate an AI portfolio recommendation
   */
  async generateAIPortfolio(params: {
    risk_level: number;
    investment_goal: string;
    time_horizon: string;
    initial_investment: number;
  }): Promise<Portfolio> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");

    // In a real app, this would call an AI service or algorithm
    // For now, generate a mock portfolio based on the parameters
    const now = new Date().toISOString();
    
    // Determine portfolio type based on investment goal
    const portfolioType = params.investment_goal || "balanced";
    
    // Determine risk level string
    let riskLevel = "Medium";
    if (params.risk_level <= 3) riskLevel = "Low";
    else if (params.risk_level <= 6) riskLevel = "Medium";
    else if (params.risk_level <= 8) riskLevel = "High";
    else riskLevel = "Very High";
    
    // Calculate expected return based on risk level and time horizon
    let expectedReturn = 5 + (params.risk_level * 0.8);
    if (params.time_horizon === "medium") expectedReturn += 1;
    if (params.time_horizon === "long") expectedReturn += 2;
    
    // Generate allocation based on risk level and investment goal
    let allocation: Record<string, number> = {};
    
    if (params.risk_level <= 3) {
      // Low risk
      allocation = {
        "Bonds": 50,
        "US Stocks": 20,
        "International Stocks": 10,
        "Real Estate": 10,
        "Cash": 10
      };
    } else if (params.risk_level <= 6) {
      // Medium risk
      allocation = {
        "US Stocks": 40,
        "International Stocks": 20,
        "Bonds": 30,
        "Real Estate": 5,
        "Alternatives": 5
      };
    } else {
      // High risk
      allocation = {
        "US Stocks": 50,
        "International Stocks": 25,
        "Emerging Markets": 15,
        "Bonds": 5,
        "Alternatives": 5
      };
    }
    
    // Adjust allocation based on investment goal
    if (params.investment_goal === "income") {
      allocation["Dividend Stocks"] = (allocation["US Stocks"] || 0) * 0.4;
      allocation["US Stocks"] = (allocation["US Stocks"] || 0) * 0.6;
      allocation["Bonds"] = (allocation["Bonds"] || 0) + 10;
      allocation["Real Estate"] = (allocation["Real Estate"] || 0) + 5;
      // Normalize to 100%
      const total = Object.values(allocation).reduce((sum, val) => sum + val, 0);
      Object.keys(allocation).forEach(key => {
        allocation[key] = Math.round((allocation[key] / total) * 100);
      });
    }
    
    const newPortfolio: Portfolio = {
      id: generateUUID(),
      name: `AI ${riskLevel} ${portfolioType.charAt(0).toUpperCase() + portfolioType.slice(1)} Portfolio`,
      description: `AI-generated portfolio optimized for ${params.investment_goal} with ${riskLevel.toLowerCase()} risk tolerance`,
      type: portfolioType,
      risk_level: riskLevel,
      expected_return: parseFloat(expectedReturn.toFixed(2)),
      user_id: user.id,
      created_at: now,
      updated_at: now,
      allocation,
      status: "recommended"
    };
    
    // In a real app, we would save this to the database
    // For now, just return the generated portfolio
    return newPortfolio;
  }
};
