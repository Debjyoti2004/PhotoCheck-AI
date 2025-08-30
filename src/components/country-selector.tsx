"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Country } from "@/types";
import { cn } from "@/lib/utils";

interface CountrySelectorProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
  disabled?: boolean;
}

const countries: Country[] = [
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", flag: "🇮🇸" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
];

// Custom hook to detect clicks outside of a component
function useOnClickOutside(ref: React.RefObject<HTMLDivElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function CountrySelector({ onCountrySelect, selectedCountry, disabled = false }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectorRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(selectorRef, () => setIsOpen(false));

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  }

  return (
    <div className="relative" ref={selectorRef}>
      <button
        type="button"
        onClick={toggleOpen}
        disabled={disabled}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-lg border border-input bg-background px-4 py-3 text-left text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {selectedCountry ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedCountry.flag}</span>
            <span className="font-medium text-foreground">{selectedCountry.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">Select a country...</span>
        )}
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden"
            style={{ transformOrigin: 'top' }}
          >
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 text-popover-foreground shadow-lg">
              <div className="p-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md bg-transparent py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    autoFocus
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium flex-1">{country.name}</span>
                      {selectedCountry?.code === country.code && <Check className="h-5 w-5 text-primary" />}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No countries found.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}