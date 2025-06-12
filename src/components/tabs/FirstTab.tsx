import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { sumToNCodeString } from '../../constants/codeExamples';

const FirstTab = () => {
  const [testValue, setTestValue] = useState<number>(5);
  const [results, setResults] = useState<{a: number, b: number, c: number}>({a: 15, b: 15, c: 15});

  // Implementation A: Using a loop
  const sum_to_n_a = function(n: number) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };

  // Implementation B: Using the mathematical formula (n * (n + 1)) / 2
  const sum_to_n_b = function(n: number) {
    return (n * (n + 1)) / 2;
  };

  // Implementation C: Using recursion
  const sum_to_n_c = function(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
  };

  const handleTestValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input (will be converted to 0)
    if (inputValue === '') {
      setTestValue(0);
      setResults({
        a: 0,
        b: 0,
        c: 0
      });
      return;
    }
    
    // Only allow numeric input
    if (!/^\d+$/.test(inputValue)) {
      return; // Ignore non-numeric input
    }
    
    const value = parseInt(inputValue);
    setTestValue(value);
    setResults({
      a: sum_to_n_a(value),
      b: sum_to_n_b(value),
      c: sum_to_n_c(value)
    });
  };

  return (
    <motion.div
      className="p-4 bg-content-bg text-content-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Three ways to sum to n</h2>
      
      <div className="mb-8">
        <p className="mb-4">
          Implement a function <code>sum_to_n</code> that calculates the sum of all integers from 1 to n.
          For example, <code>sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15</code>
        </p>
        
        <div className="rounded-md overflow-hidden mb-6">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{
              borderRadius: '0.375rem',
              fontSize: '14px',
            }}
          >
            {sumToNCodeString}
          </SyntaxHighlighter>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Test the implementations</h3>
          <div className="flex items-center mb-4">
            <label htmlFor="test-value" className="mr-2">Enter a value for n:</label>
            <input
              id="test-value"
              type="number"
              value={testValue}
              onChange={handleTestValueChange}
              className="border rounded px-2 py-1 w-20"
              min="1"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow">
              <h4 className="font-semibold mb-2">Implementation A (Loop)</h4>
              <p>Result: <span className="font-mono">{results.a}</span></p>
              <p className="text-sm text-gray-600 mt-2">Time Complexity: O(n)</p>
              <p className="text-sm text-gray-600">Space Complexity: O(1)</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow">
              <h4 className="font-semibold mb-2">Implementation B (Formula)</h4>
              <p>Result: <span className="font-mono">{results.b}</span></p>
              <p className="text-sm text-gray-600 mt-2">Time Complexity: O(1)</p>
              <p className="text-sm text-gray-600">Space Complexity: O(1)</p>
            </div>
            
            <div className="bg-white p-4 rounded-md shadow">
              <h4 className="font-semibold mb-2">Implementation C (Recursion)</h4>
              <p>Result: <span className="font-mono">{results.c}</span></p>
              <p className="text-sm text-gray-600 mt-2">Time Complexity: O(n)</p>
              <p className="text-sm text-gray-600">Space Complexity: O(n)</p>
            </div>
          </div>
          
          <div className="mt-6 text-left">
            <h4 className="font-semibold mb-2">Comparison</h4>
            <ul className="list-disc pl-6">
              <li><strong>Implementation A (Loop):</strong> Simple and intuitive approach with linear time complexity.</li>
              <li><strong>Implementation B (Formula):</strong> Most efficient with constant time complexity, using the mathematical formula n(n+1)/2.</li>
              <li><strong>Implementation C (Recursion):</strong> Elegant but less efficient due to call stack overhead and risk of stack overflow for large n.</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FirstTab;



