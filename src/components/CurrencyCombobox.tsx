import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface Currency {
  currency: string;
  date: string;
  price: number;
}

interface CurrencyComboboxProps {
  currencies: Currency[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
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

export function CurrencyCombobox({
  currencies,
  value,
  onChange,
  placeholder = "Select currency",
  disabled = false,
  error
}: CurrencyComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  // Convert currencies to options format with index
  const options = currencies.map((currency, index) => ({
    value: currency.currency,
    label: currency.currency,
    icon: getCurrencyIcon(currency.currency),
    index: index // Store the original index
  }));

  // Find the selected option by index
  const selectedOption = selectedIndex !== null 
    ? options.find(option => option.index === selectedIndex)
    : null;

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (searchQuery === "") {
      return options;
    }
    
    const query = searchQuery.toLowerCase();
    
    return options.filter(option => {
      const label = option.label.toLowerCase();
      
      // Check if label starts with the query
      if (label.startsWith(query)) {
        return true;
      }
      
      // Check if any word in the label starts with the query
      const words = label.split(/\s+/);
      if (words.some(word => word.startsWith(query))) {
        return true;
      }
      
      return false;
    });
  }, [options, searchQuery]);

  // Initialize selectedIndex when value changes from parent
  React.useEffect(() => {
    if (value) {
      const foundOption = options.find(option => option.value === value);
      if (foundOption) {
        setSelectedIndex(foundOption.index);
      }
    } else {
      setSelectedIndex(null);
    }
  }, [value, options]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full h-[50px] justify-between px-3 font-normal",
              !selectedOption && "text-muted-foreground",
              error && "border-red-500"
            )}
            disabled={disabled}
          >
            {selectedOption ? (
              <div className="flex items-center gap-2">
                {selectedOption.icon}
                <span>{selectedOption.label}</span>
              </div>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div className="rounded-md border">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search currencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm">No currency found.</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={`${option.value}-${option.index}`}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 hover:text-gray-900",
                      selectedIndex === option.index && "bg-gray-100 text-gray-900"
                    )}
                    onClick={() => {
                      setSelectedIndex(option.index);
                      onChange(option.value);
                      setOpen(false);
                      setSearchQuery(""); // Reset search when an option is selected
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                    {selectedIndex === option.index && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}










