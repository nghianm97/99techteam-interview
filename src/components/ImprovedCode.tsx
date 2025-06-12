import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { improvedReactCode } from '../constants/codeExamples';

const ImprovedCode = () => {
  return (
    <div className="improved-code p-4 bg-white rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Improved Implementation</h2>
      
      <span className="block mb-4">
        Here's a refactored version of the code that addresses the issues identified in the analysis:
      </span>
      
      <div className="rounded-md overflow-hidden">
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            borderRadius: '0.375rem',
            fontSize: '14px',
          }}
        >
          {improvedReactCode}
        </SyntaxHighlighter>
      </div>
      
      <h3 className="text-xl font-semibold mt-6 mb-2 text-left">Key Improvements</h3>
      <ul className="list-disc pl-6 space-y-2 text-left">
        <li><strong>Type Safety:</strong> Added proper types for blockchain and fixed interface definitions</li>
        <li><strong>Code Organization:</strong> Moved utility functions outside the component</li>
        <li><strong>Performance:</strong> Removed unnecessary array transformations and fixed dependency arrays</li>
        <li><strong>Bug Fixes:</strong> Fixed the filter logic and completed the sort function</li>
        <li><strong>React Best Practices:</strong> Used better keys for list items</li>
        <li><strong>Maintainability:</strong> Added comments and consistent formatting</li>
        <li><strong>Error Handling:</strong> Added fallback UI for empty states</li>
        <li><strong>Accessibility:</strong> Added semantic class names</li>
      </ul>
    </div>
  );
};

export default ImprovedCode;