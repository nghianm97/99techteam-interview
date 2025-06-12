import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
}

const ArrowButton = ({ direction, onClick, className }: ArrowButtonProps) => {
  return (
    <motion.button
      className={cn("p-3 rounded-full bg-primary text-app-text shadow-md hover:bg-primary-hover", className)}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {direction === 'left' ? <ChevronLeft /> : <ChevronRight />}
    </motion.button>
  );
};

export default ArrowButton;