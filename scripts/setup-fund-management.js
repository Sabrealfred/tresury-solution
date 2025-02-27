// Script to set up the fund management module in Supabase
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Use the same credentials as the application
const SUPABASE_URL = "https://lhmdjdukkwoxznovlonp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobWRqZHVra3dveHpub3Zsb25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMjQzMzAsImV4cCI6MjA1NTkwMDMzMH0.x9na5iDFKggFtlFKfpmj0uvFfPk-bDbXdhl_xrVv1Ko";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function setupFundManagement() {
  console.log('Setting up fund management module...');
  
  try {
    // Read the SQL migration file
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20240226_fund_management.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        // Execute the SQL statement using Supabase's rpc function
        const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
        
        if (error) {
          console.error(`Error executing statement ${i + 1}:`, error.message);
        }
      } catch (err) {
        console.error(`Error executing statement ${i + 1}:`, err.message);
      }
    }
    
    console.log('Database schema setup complete');
    
    // Seed initial portfolio data for demo users
    await seedDemoPortfolios();
    
    console.log('Fund management module setup complete!');
  } catch (error) {
    console.error('Error setting up fund management module:', error);
  }
}

async function seedDemoPortfolios() {
  console.log('Seeding demo portfolios...');
  
  // Get demo users
  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, profile_type')
    .in('first_name', ['Admin', 'User', 'Business']);
  
  if (usersError) {
    console.error('Error fetching demo users:', usersError.message);
    return;
  }
  
  if (!users || users.length === 0) {
    console.log('No demo users found. Run create-demo-users.js first.');
    return;
  }
  
  console.log(`Found ${users.length} demo users`);
  
  // Create portfolios for each user
  for (const user of users) {
    console.log(`Creating portfolios for ${user.first_name} ${user.last_name}...`);
    
    // Sample portfolios based on user type
    const portfolios = [];
    
    if (user.profile_type === 'user') {
      portfolios.push({
        name: "Personal Growth Portfolio",
        description: "Long-term growth portfolio focused on technology and emerging markets",
        type: "growth",
        risk_level: "High",
        expected_return: 12.5,
        user_id: user.id,
        allocation: {
          "US Stocks": 45,
          "International Stocks": 25,
          "Emerging Markets": 15,
          "Bonds": 10,
          "Alternatives": 5
        },
        status: "active"
      });
      
      portfolios.push({
        name: "Retirement Fund",
        description: "Balanced portfolio for retirement savings",
        type: "balanced",
        risk_level: "Medium",
        expected_return: 8.2,
        user_id: user.id,
        allocation: {
          "US Stocks": 35,
          "International Stocks": 15,
          "Bonds": 40,
          "Real Estate": 5,
          "Cash": 5
        },
        status: "active"
      });
    } else if (user.profile_type === 'business') {
      portfolios.push({
        name: "Business Reserve Fund",
        description: "Conservative portfolio for business reserves",
        type: "income",
        risk_level: "Low",
        expected_return: 5.5,
        user_id: user.id,
        allocation: {
          "Bonds": 60,
          "Dividend Stocks": 20,
          "Cash": 15,
          "Gold": 5
        },
        status: "active"
      });
      
      portfolios.push({
        name: "Growth Opportunities",
        description: "Aggressive growth portfolio for excess business capital",
        type: "growth",
        risk_level: "High",
        expected_return: 14.2,
        user_id: user.id,
        allocation: {
          "US Growth Stocks": 50,
          "International Stocks": 25,
          "Emerging Markets": 20,
          "Alternatives": 5
        },
        status: "active"
      });
    } else if (user.profile_type === 'admin') {
      portfolios.push({
        name: "Demo Portfolio",
        description: "Sample portfolio for demonstration purposes",
        type: "balanced",
        risk_level: "Medium",
        expected_return: 7.5,
        user_id: user.id,
        allocation: {
          "US Stocks": 40,
          "International Stocks": 20,
          "Bonds": 30,
          "Real Estate": 5,
          "Alternatives": 5
        },
        status: "active"
      });
    }
    
    // Insert portfolios
    for (const portfolio of portfolios) {
      const { error: portfolioError } = await supabase
        .from('portfolios')
        .insert(portfolio);
      
      if (portfolioError) {
        console.error(`Error creating portfolio for ${user.first_name}:`, portfolioError.message);
      } else {
        console.log(`Created portfolio: ${portfolio.name}`);
      }
    }
    
    // Get the portfolios we just created
    const { data: userPortfolios, error: portfoliosError } = await supabase
      .from('portfolios')
      .select('id, name')
      .eq('user_id', user.id);
    
    if (portfoliosError) {
      console.error(`Error fetching portfolios for ${user.first_name}:`, portfoliosError.message);
      continue;
    }
    
    if (!userPortfolios || userPortfolios.length === 0) {
      console.log(`No portfolios found for ${user.first_name}`);
      continue;
    }
    
    // Create sample transactions for each portfolio
    for (const portfolio of userPortfolios) {
      console.log(`Creating transactions for portfolio: ${portfolio.name}`);
      
      const transactions = [
        {
          portfolio_id: portfolio.id,
          security_symbol: "AAPL",
          security_name: "Apple Inc.",
          transaction_type: "buy",
          quantity: 10,
          price: 182.52,
          total_amount: 1825.20,
          status: "completed",
          user_id: user.id
        },
        {
          portfolio_id: portfolio.id,
          security_symbol: "MSFT",
          security_name: "Microsoft Corporation",
          transaction_type: "buy",
          quantity: 5,
          price: 415.32,
          total_amount: 2076.60,
          status: "completed",
          user_id: user.id
        }
      ];
      
      // Insert transactions
      for (const transaction of transactions) {
        const { error: transactionError } = await supabase
          .from('portfolio_transactions')
          .insert(transaction);
        
        if (transactionError) {
          console.error(`Error creating transaction for ${portfolio.name}:`, transactionError.message);
        } else {
          console.log(`Created transaction: ${transaction.transaction_type} ${transaction.quantity} ${transaction.security_symbol}`);
        }
      }
    }
  }
  
  console.log('Demo portfolios seeded successfully');
}

// Execute the setup function
setupFundManagement()
  .catch(error => {
    console.error('Error in setup script:', error);
  })
  .finally(() => {
    console.log('Script finished.');
  });
