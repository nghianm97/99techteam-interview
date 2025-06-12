import { useState } from 'react';
import { motion } from 'framer-motion';
import FirstTab from './tabs/FirstTab';
import SecondTab from './tabs/SecondTab';
import ThirdTab from './tabs/ThirdTab';
import ArrowButton from './ArrowButton';

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState(0);
  const totalTabs = 3;

  const nextTab = () => {
    setActiveTab((prev) => (prev === totalTabs - 1 ? 0 : prev + 1));
  };

  const prevTab = () => {
    setActiveTab((prev) => (prev === 0 ? totalTabs - 1 : prev - 1));
  };

  const renderTabName = (tab: number) => {
    switch (tab) {
      case 0:
        return 'Problem 1: Three ways to sum to n';
      case 1:
        return 'Problem 2: Fancy Form';
      case 2:
        return 'Problem 3: Messy React';
      default:
        return 'Problem 1: Three ways to sum to n';
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-4 max-w-[430px] mx-auto">
        <ArrowButton direction="left" onClick={prevTab} className="cursor-pointer" />
        <motion.div 
          className="text-lg font-medium text-app-text tex-gray-400 font-semibold"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabName(activeTab)}
        </motion.div>
        <ArrowButton direction="right" onClick={nextTab} className="cursor-pointer"/>
      </div>
      
      <motion.div 
        className="rounded-custom overflow-hidden bg-content-bg"
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 0 && <FirstTab />}
        {activeTab === 1 && <SecondTab />}
        {activeTab === 2 && <ThirdTab />}
      </motion.div>
    </div>
  );
}



