import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { messyReactCode } from '../../constants/codeExamples';
import CodeAnalysis from '../CodeAnalysis';
import ImprovedCode from '../ImprovedCode';

const ThirdTab = () => {
  return (
    <motion.div
      className="p-4 bg-content-bg text-content-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Messy React</h2>
      
      <div className="mb-8 rounded-md overflow-hidden">
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            borderRadius: '0.375rem',
            fontSize: '14px',
          }}
        >
          {messyReactCode}
        </SyntaxHighlighter>
      </div>
      
      <CodeAnalysis />
      
      <ImprovedCode />
    </motion.div>
  );
};

export default ThirdTab;




