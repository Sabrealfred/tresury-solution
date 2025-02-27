
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Account {
  id: string;
  account_number: string;
  balance: number;
  currency: string;
}

export default function TransferPage() {
  const [amount, setAmount] = useState('');
  const [sourceAccount, setSourceAccount] = useState('');
  const [destinationAccount, setDestinationAccount] = useState('');

  const queryClient = useQueryClient();
  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ['user-accounts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      return data as Account[];
    }
  });

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !sourceAccount || !destinationAccount) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    const transferAmount = parseFloat(amount);
    
    // Find source account to check balance
    const sourceAccountData = accounts.find(acc => acc.id === sourceAccount);
    if (!sourceAccountData) {
      toast.error('Cuenta origen no encontrada');
      return;
    }

    // Validate sufficient balance
    if (sourceAccountData.balance < transferAmount) {
      toast.error('Saldo insuficiente para realizar la transferencia');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      // Start a transaction
      const transferAmount = parseFloat(amount);
      
      // 1. Insert transfer record
      const { error: transferError } = await supabase
        .from('transfers')
        .insert({
          amount: transferAmount,
          source_wallet_id: sourceAccount,
          destination_details: { account_id: destinationAccount },
          destination_type: 'internal',
          source_currency: 'USD',
          destination_currency: 'USD',
          exchange_rate: 1,
          transfer_method: 'internal',
          user_id: user.id,
          status: 'completed' // Mark as completed immediately
        });

      if (transferError) throw transferError;

      // 2. Update source account balance (subtract amount)
      const { error: sourceUpdateError } = await supabase
        .from('accounts')
        .update({ balance: sourceAccountData.balance - transferAmount })
        .eq('id', sourceAccount);

      if (sourceUpdateError) throw sourceUpdateError;

      // 3. Update destination account balance (add amount)
      const destinationAccountData = accounts.find(acc => acc.id === destinationAccount);
      if (destinationAccountData) {
        const { error: destUpdateError } = await supabase
          .from('accounts')
          .update({ balance: destinationAccountData.balance + transferAmount })
          .eq('id', destinationAccount);

        if (destUpdateError) throw destUpdateError;
      }

      // 4. Create a transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          amount: transferAmount,
          currency: 'USD',
          transaction_type: 'transfer',
          status: 'completed',
          user_id: user.id
        });

      if (transactionError) {
        console.error('Error creating transaction record:', transactionError);
        // Continue even if transaction record fails
      }

      // Success - refresh data and reset form
      await queryClient.invalidateQueries({ queryKey: ['user-accounts'] });
      toast.success('Transferencia completada exitosamente');
      setAmount('');
      setSourceAccount('');
      setDestinationAccount('');
    } catch (error: any) {
      toast.error('Error al realizar la transferencia: ' + error.message);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Realizar Transferencia</h1>

      <Card className="p-6">
        <form onSubmit={handleTransfer} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cuenta Origen</label>
            <Select value={sourceAccount} onValueChange={setSourceAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cuenta origen" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.account_number} - {account.currency} {account.balance}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cuenta Destino</label>
            <Select value={destinationAccount} onValueChange={setDestinationAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cuenta destino" />
              </SelectTrigger>
              <SelectContent>
                {accounts
                  .filter(account => account.id !== sourceAccount)
                  .map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.account_number} - {account.currency} {account.balance}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Monto</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ingrese el monto"
              min="0"
              step="0.01"
            />
          </div>

          <Button type="submit" className="w-full">
            Realizar Transferencia
          </Button>
        </form>
      </Card>
    </div>
  );
}
