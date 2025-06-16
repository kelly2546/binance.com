import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoBalance } from "@/lib/firebase";

interface CryptoBalanceCardProps {
  balances: CryptoBalance[];
}

export default function CryptoBalanceCard({ balances }: CryptoBalanceCardProps) {
  const totalBalance = balances.reduce((sum, crypto) => sum + crypto.balance, 0);

  return (
    <Card className="bg-[#1e2329] border-[#474d57] text-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Crypto Wallet</CardTitle>
        <p className="text-sm text-[#848e9c]">Total Balance: ${totalBalance.toFixed(2)}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {balances.map((crypto) => (
            <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-[#181a20] rounded-lg">
              <div className="flex items-center space-x-3">
                <img 
                  src={crypto.icon} 
                  alt={crypto.name}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/32/FCD535/000000?text=${crypto.symbol}`;
                  }}
                />
                <div>
                  <p className="font-medium">{crypto.symbol}</p>
                  <p className="text-sm text-[#848e9c]">{crypto.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{crypto.balance.toFixed(8)}</p>
                <p className="text-sm text-[#848e9c]">{crypto.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}