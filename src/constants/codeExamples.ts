export const messyReactCode = `interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

    const getPriority = (blockchain: any): number => {
      switch (blockchain) {
        case 'Osmosis':
          return 100
        case 'Ethereum':
          return 50
        case 'Arbitrum':
          return 30
        case 'Zilliqa':
          return 20
        case 'Neo':
          return 20
        default:
          return -99
      }
    }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          if (lhsPriority > -99) {
             if (balance.amount <= 0) {
               return true;
             }
          }
          return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}`;

export const improvedReactCode = `// Define blockchain type for better type safety
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | string;

// Complete interface with all required properties
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

// Extend the base interface instead of duplicating properties
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Import the BoxProps or define it
import { BoxProps } from './ui-components';

// Define component props properly
interface WalletPageProps extends BoxProps {
  // Add any specific props here
}

// Move utility functions outside the component
const getPriority = (blockchain: Blockchain): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
      return 20;
    case 'Neo':
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<WalletPageProps> = (props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Properly memoize with correct dependencies
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Simplified filter logic
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        
        // Complete sort function with all cases
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        return 0; // Handle equal priorities
      });
  }, [balances]); // Only depend on balances since prices isn't used

  // Format balances in the same step as rendering to avoid unnecessary array
  const rows = sortedBalances.map((balance: WalletBalance, index) => {
    const formatted = balance.amount.toFixed(2); // Specify decimal places
    const usdValue = prices[balance.currency] * balance.amount;
    
    return (
      <WalletRow 
        key={\`\${balance.blockchain}-\${balance.currency}\`} // Better key
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatted}
      />
    );
  });

  return (
    <div className="wallet-container" {...rest}>
      {rows.length > 0 ? (
        rows
      ) : (
        <p>No wallet balances available</p>
      )}
    </div>
  );
};

export default WalletPage;`;

// Add the sum_to_n implementations code string
export const sumToNCodeString = `// Implementation A: Using a loop
var sum_to_n_a = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Implementation B: Using the mathematical formula (n * (n + 1)) / 2
var sum_to_n_b = function(n) {
  return (n * (n + 1)) / 2;
};

// Implementation C: Using recursion
var sum_to_n_c = function(n) {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};`;

