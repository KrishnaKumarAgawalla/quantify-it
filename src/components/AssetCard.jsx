import React, { useState, useRef } from 'react';
import { Layers, PlusCircle, Trash2, Search, RefreshCw } from 'lucide-react';
import { getMarketPrice, searchSymbols } from '../lib/api';

export const AssetCard = ({ assets, setAssets, updateAsset, mode }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [searchResults, setSearchResults] = useState({});
  const debounceTimer = useRef(null);

  // 1. Logic to handle typing with Debounce
  const handleNameChange = (index, value) => {
    updateAsset(index, 'name', value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (value.length > 1) {
      debounceTimer.current = setTimeout(async () => {
        const res = await searchSymbols(value);
        if (res.success) {
          setSearchResults(prev => ({ ...prev, [index]: res.result.slice(0, 5) }));
        }
      }, 500);
    } else {
      setSearchResults(prev => ({ ...prev, [index]: [] }));
    }
  };

  // 2. Logic to select from dropdown
  const onSelectSymbol = (index, symbol) => {
    updateAsset(index, 'name', symbol);
    setSearchResults(prev => ({ ...prev, [index]: [] }));
    handleFetchPrice(index, symbol);
  };

  const handleFetchPrice = async (index, symbol) => {
    if (!symbol) return;
    setLoadingIndex(index);
    const result = await getMarketPrice(symbol);
    if (result.success) {
      updateAsset(index, 'price', result.price);
    } else {
      alert(result.error);
    }
    setLoadingIndex(null);
  };

  const addAsset = () => setAssets([...assets, { name: '', price: 0, value: 0 }]);
  const removeAsset = (index) => setAssets(assets.filter((_, i) => i !== index));

  return (
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2 underline decoration-indigo-200 decoration-4 underline-offset-4">
          <Layers size={16} className="text-indigo-500"/> Asset Allocation
        </h2>
        <button onClick={addAsset} className="text-[9px] uppercase font-black bg-indigo-600 text-white py-1.5 px-3 rounded-full hover:bg-indigo-700 shadow-md transition-all flex items-center gap-1.5">
          <PlusCircle size={12} /> Add New
        </button>
      </div>

      <div className="flex gap-2 px-1 mb-1">
        <label className="flex-1 text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Asset Name</label>
        <label className="w-20 text-[10px] font-black text-slate-400 uppercase text-center tracking-wider">Price</label>
        <label className="w-22 text-[10px] font-black text-slate-400 uppercase text-center tracking-wider">{mode === '1' ? 'Ratio' : 'Allocation'}</label>
        <div className="w-[28px]"></div>
      </div>

      <div className="space-y-2">
        {assets.map((asset, index) => (
          <div key={index} className="flex gap-2 items-center group relative duration-200">
            <div className="flex-grow min-w-0 relative">
              <input 
                placeholder="Ticker (e.g. AAPL)" 
                value={asset.name} 
                onChange={e => handleNameChange(index, e.target.value)} 
                className="w-full p-2 pr-8 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 focus:border-indigo-500 outline-none bg-white shadow-sm transition-all" 
              />
              
              {/* DROPDOWN UI */}
              {searchResults[index]?.length > 0 && (
                <div className="absolute z-[60] left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                  {searchResults[index].map((item) => (
                    <button
                      key={item.symbol}
                      onClick={() => onSelectSymbol(index, item.symbol)}
                      className="w-full px-3 py-2 text-left hover:bg-indigo-50 flex flex-col border-b border-slate-50 last:border-0 transition-colors"
                    >
                      <span className="text-[11px] font-black text-indigo-600">{item.symbol}</span>
                      <span className="text-[10px] text-slate-400 truncate">{item.description}</span>
                    </button>
                  ))}
                </div>
              )}

              <button 
                onClick={() => handleFetchPrice(index, asset.name)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500"
              >
                {loadingIndex === index ? <RefreshCw size={14} className="animate-spin text-indigo-500" /> : <Search size={14} />}
              </button>
            </div>

            <div className="w-20 shrink-0">
              <input type="number" value={asset.price || ''} onChange={e => updateAsset(index, 'price', e.target.value)} className="w-full p-2 border border-slate-100 bg-slate-50/50 rounded-xl text-[12px] font-mono font-bold text-slate-600 text-center outline-none" />
            </div>

            <div className="w-22 shrink-0">
              <input type="number" value={asset.value || ''} onChange={e => updateAsset(index, 'value', e.target.value)} className="w-full p-2 border border-transparent rounded-xl text-[12px] font-bold bg-indigo-50 text-indigo-700 text-center outline-none" />
            </div>

            <button onClick={() => removeAsset(index)} className="p-1.5 text-slate-300 hover:text-red-500 shrink-0"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};