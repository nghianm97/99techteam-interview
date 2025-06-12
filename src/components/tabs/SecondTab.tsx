import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCw } from 'lucide-react';
import { CurrencyCombobox } from '../CurrencyCombobox';

// Define form schema with Zod
const formSchema = z.object({
  fromAmount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0, 
    { message: "Must be a positive number" }
  ),
  fromCurrency: z.string().min(1, "Select a currency"),
  toAmount: z.string(),
  toCurrency: z.string().min(1, "Select a currency"),
});

type FormValues = z.infer<typeof formSchema>;

// Define currency type based on API response
interface Currency {
  currency: string;
  date: string;
  price: number;
}

// Function to get icon based on currency name
const getCurrencyIcon = (currency: string) => {
  const iconSize = 20;
  const tokenName = currency; // Keep original case
  const iconUrl = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${tokenName}.svg`;
  
  return (
    <img 
      src={iconUrl} 
      alt={currency} 
      width={iconSize} 
      height={iconSize} 
      className="inline-block"
      onError={(e) => {
        // Fallback to default icon if SVG fails to load
        e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
      }}
    />
  );
};

const SecondTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(true);

  // Fetch currencies from API
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setIsLoadingCurrencies(true);
        const response = await fetch('https://interview.switcheo.com/prices.json');
        const data = await response.json();
        
        // Filter out currencies without prices
        const validCurrencies = data.filter((currency: Currency) => 
          currency.price && !isNaN(Number(currency.price))
        );
        
        setCurrencies(validCurrencies);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        // Fallback to some default currencies if API fails
        setCurrencies([
          { currency: 'BTC', date: new Date().toISOString(), price: 65000 },
          { currency: 'ETH', date: new Date().toISOString(), price: 3500 },
          { currency: 'USDT', date: new Date().toISOString(), price: 1 },
        ]);
      } finally {
        setIsLoadingCurrencies(false);
      }
    };

    fetchCurrencies();
  }, []);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromAmount: '',
      fromCurrency: '',
      toAmount: '',
      toCurrency: '',
    }
  });

  // Set default currencies once data is loaded
  useEffect(() => {
    if (currencies.length > 0 && !watch('fromCurrency') && !watch('toCurrency')) {
      setValue('fromCurrency', currencies[0].currency);
      setValue('toCurrency', currencies.length > 1 ? currencies[1].currency : currencies[0].currency);
    }
  }, [currencies, setValue, watch]);

  const fromAmount = watch('fromAmount');
  const fromCurrency = watch('fromCurrency');
  const toCurrency = watch('toCurrency');

  // Calculate exchange rate when currencies change
  useEffect(() => {
    if (fromCurrency && toCurrency && currencies.length > 0) {
      const fromCurrencyData = currencies.find(c => c.currency === fromCurrency);
      const toCurrencyData = currencies.find(c => c.currency === toCurrency);
      
      if (fromCurrencyData && toCurrencyData) {
        const rate = fromCurrencyData.price / toCurrencyData.price;
        setExchangeRate(rate);
        
        // Update toAmount if fromAmount exists
        if (fromAmount) {
          setValue('toAmount', (Number(fromAmount) * rate).toFixed(6));
        }
      }
    }
  }, [fromCurrency, toCurrency, fromAmount, currencies, setValue]);

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Swap submitted:', data);
      setIsLoading(false);
      // Show success message or redirect
    }, 1500);
  };

  const handleSwapCurrencies = () => {
    const currentFromCurrency = fromCurrency;
    const currentToCurrency = toCurrency;
    const currentFromAmount = fromAmount;
    const currentToAmount = watch('toAmount');
    
    setValue('fromCurrency', currentToCurrency);
    setValue('toCurrency', currentFromCurrency);
    setValue('fromAmount', currentToAmount);
    setValue('toAmount', currentFromAmount);
  };

  return (
    <motion.div 
      className="p-6 bg-content-bg text-content-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Currency Swap</h2>
      
      {isLoadingCurrencies ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-[600px] mx-auto">
          {/* From Currency Section */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium mb-2">From</label>
            
            <div className="flex gap-2">
              <div className="w-2/3">
                <Controller
                  name="fromAmount"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        placeholder="0.00"
                        className={`w-full h-[50px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${errors.fromAmount ? 'border-red-500' : ''}`}
                      />
                      {errors.fromAmount && (
                        <p className="text-red-500 text-sm mt-1">{errors.fromAmount.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
              
              <div className="w-1/3">
                <Controller
                  name="fromCurrency"
                  control={control}
                  render={({ field }) => (
                    <CurrencyCombobox
                      currencies={currencies}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.fromCurrency?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          
          {/* Swap Button */}
          <div className="flex justify-center">
            <button 
              type="button"
              onClick={handleSwapCurrencies}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          
          {/* To Currency Section */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium mb-2">To</label>
            
            <div className="flex gap-2">
              <div className="w-2/3">
                <Controller
                  name="toAmount"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="0.00"
                      readOnly
                      className="w-full h-[50px] p-3 border rounded-md bg-gray-100"
                    />
                  )}
                />
              </div>
              
              <div className="w-1/3">
                <Controller
                  name="toCurrency"
                  control={control}
                  render={({ field }) => (
                    <CurrencyCombobox
                      currencies={currencies}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.toCurrency?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          
          {/* Exchange Rate Display */}
          {exchangeRate && fromCurrency && toCurrency && (
            <div className="text-sm text-gray-500 text-center">
              <div className="flex items-center justify-center gap-1">
                <span>1</span> 
                {getCurrencyIcon(fromCurrency)} 
                <span>{fromCurrency} = {exchangeRate.toFixed(6)}</span> 
                {getCurrencyIcon(toCurrency)} 
                <span>{toCurrency}</span>
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Swap Currencies'}
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default SecondTab;













