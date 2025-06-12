import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeAnalysis = () => {
  return (
    <div className="code-analysis p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Code Analysis: Messy React Component</h2>

      <span className="block mb-4">
        This React component has several issues that make it difficult to maintain and likely to cause bugs. Let's analyze the problems:
      </span>

      <h3 className="text-xl font-semibold mt-6 mb-2">Interface Definitions</h3>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`interface WalletBalance {
  currency: string;
  amount: number;
}`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ Missing the <code>blockchain</code> property that's used later in the code, causing TypeScript errors.
      </span>

      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ Duplicates properties from <code>WalletBalance</code> instead of extending it.
      </span>

      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`interface Props extends BoxProps {
}`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ Empty interface that extends <code>BoxProps</code> which is not imported or defined.
      </span>

      <h3 className="text-xl font-semibold mt-6 mb-2">Component Definition</h3>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ Destructures <code>children</code> but never uses it.<br />
        ❌ Uses hooks (<code>useWalletBalances</code>, <code>usePrices</code>) that aren't imported or defined.
      </span>

      <h3 className="text-xl font-semibold mt-6 mb-2">getPriority Function</h3>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`const getPriority = (blockchain: any): number => {
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
}`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ Uses <code>any</code> type instead of a proper type or enum.<br />
        ❌ Missing semicolons after return statements (inconsistent style).<br />
        ❌ Hardcoded priority values with no explanation.<br />
        ❌ Multiple blockchains return the same priority (20), leading to undefined sorting behavior.<br />
        ❌ Function defined inside component, recreated on every render.
      </span>

      <h3 className="text-xl font-semibold mt-6 mb-2">useMemo Implementation</h3>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`const sortedBalances = useMemo(() => {
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
}, [balances, prices]);`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ Critical error: <code>lhsPriority</code> is used but never defined, causing a runtime error.<br />
        ❌ The filter logic is confusing and likely incorrect - it only returns true for balances with amount &lt;= 0.<br />
        ❌ The sort function doesn't handle the case when priorities are equal (missing return 0).<br />
        ❌ Inconsistent indentation makes the code hard to read.<br />
        ❌ <code>prices</code> is in the dependency array but not used in the useMemo function.
      </span>

      <h3 className="text-xl font-semibold mt-6 mb-2">Formatting and Rendering</h3>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  }
})`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ <code>toFixed()</code> without parameters will round to integer, potentially losing decimal precision.<br />
        ❌ Creates a new array (<code>formattedBalances</code>) but then never uses it.
      </span>

      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
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
})`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ Uses <code>sortedBalances</code> but casts each item as <code>FormattedWalletBalance</code>, which is incorrect.<br />
        ❌ Uses <code>classes.row</code> but <code>classes</code> is not defined anywhere.<br />
        ❌ Uses index as key, which is an anti-pattern in React.<br />
        ❌ Assumes <code>prices</code> is an object with currency keys, but there's no validation.
      </span>

      <h3 className="text-xl font-semibold mt-6 mb-2">Return Statement</h3>
      <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
        {`return (
  <div {...rest}>
    {rows}
  </div>
)`}
      </SyntaxHighlighter>
      <span className="block my-2 text-red-600">
        ❌ Spreads <code>rest</code> props onto a div without any validation.<br />
        ❌ No semantic HTML structure or accessibility considerations.
      </span>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-left">Summary of Issues</h3>
      <ul className="list-disc pl-6 space-y-2 text-left">
        <li><strong>Type Safety:</strong> Poor TypeScript usage with <code>any</code> types and inconsistent interfaces</li>
        <li><strong>Logic Errors:</strong> Undefined variables, incorrect filtering logic</li>
        <li><strong>Performance Issues:</strong> Unnecessary array transformations and computations</li>
        <li><strong>Code Organization:</strong> Functions defined inside component, inconsistent indentation</li>
        <li><strong>React Best Practices:</strong> Using index as key, not following hooks rules properly</li>
        <li><strong>Maintainability:</strong> No comments, confusing logic, duplicated code</li>
        <li><strong>Consistency:</strong> Mixing coding styles (with/without semicolons, inconsistent indentation)</li>
        <li><strong>Unused Code:</strong> Creates <code>formattedBalances</code> but never uses it</li>
      </ul>
    </div>
  );
};

export default CodeAnalysis;