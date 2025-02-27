-- Fund Management Schema for Supabase

-- Portfolios Table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  risk_level TEXT NOT NULL,
  expected_return DECIMAL(10, 2) NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  allocation JSONB NOT NULL DEFAULT '{}'::JSONB,
  status TEXT NOT NULL CHECK (status IN ('active', 'recommended', 'archived'))
);

-- Portfolio Transactions Table
CREATE TABLE IF NOT EXISTS portfolio_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  security_symbol TEXT NOT NULL,
  security_name TEXT NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('buy', 'sell')),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Securities Table (for caching market data)
CREATE TABLE IF NOT EXISTS securities (
  symbol TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  current_price DECIMAL(10, 2) NOT NULL,
  change_percentage DECIMAL(10, 2) NOT NULL,
  market_cap BIGINT,
  volume BIGINT,
  sector TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports Table
CREATE TABLE IF NOT EXISTS investment_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Draft', 'Final')),
  content JSONB NOT NULL DEFAULT '{}'::JSONB,
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS Policies

-- Portfolios Policies
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own portfolios"
  ON portfolios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own portfolios"
  ON portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolios"
  ON portfolios FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolios"
  ON portfolios FOR DELETE
  USING (auth.uid() = user_id);

-- Portfolio Transactions Policies
ALTER TABLE portfolio_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON portfolio_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON portfolio_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
  ON portfolio_transactions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
  ON portfolio_transactions FOR DELETE
  USING (auth.uid() = user_id);

-- Securities Policies (public read-only)
ALTER TABLE securities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view securities"
  ON securities FOR SELECT
  USING (true);

-- Reports Policies
ALTER TABLE investment_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reports"
  ON investment_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports"
  ON investment_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports"
  ON investment_reports FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reports"
  ON investment_reports FOR DELETE
  USING (auth.uid() = user_id);

-- Insert sample securities data
INSERT INTO securities (symbol, name, current_price, change_percentage, market_cap, volume, sector)
VALUES
  ('AAPL', 'Apple Inc.', 182.52, 0.69, 2850000000000, 52436789, 'Technology'),
  ('MSFT', 'Microsoft Corporation', 415.32, -0.52, 3100000000000, 28745123, 'Technology'),
  ('GOOGL', 'Alphabet Inc.', 147.68, 2.37, 1850000000000, 18965432, 'Technology'),
  ('AMZN', 'Amazon.com Inc.', 178.35, 0.49, 1950000000000, 32145678, 'Consumer Cyclical'),
  ('TSLA', 'Tesla, Inc.', 175.21, -2.95, 550000000000, 45632178, 'Automotive'),
  ('JPM', 'JPMorgan Chase & Co.', 183.45, 0.32, 530000000000, 12345678, 'Financial Services'),
  ('V', 'Visa Inc.', 275.62, 1.25, 580000000000, 8765432, 'Financial Services'),
  ('PG', 'Procter & Gamble Co.', 162.35, 0.15, 380000000000, 5432167, 'Consumer Defensive'),
  ('JNJ', 'Johnson & Johnson', 155.78, -0.45, 405000000000, 6543217, 'Healthcare'),
  ('WMT', 'Walmart Inc.', 58.92, 0.87, 475000000000, 9876543, 'Consumer Defensive')
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  current_price = EXCLUDED.current_price,
  change_percentage = EXCLUDED.change_percentage,
  market_cap = EXCLUDED.market_cap,
  volume = EXCLUDED.volume,
  sector = EXCLUDED.sector,
  last_updated = NOW();
