import React from 'react';
import { Layers, PlusCircle, Trash2 } from 'lucide-react';

export const AssetCard = ({ assets, setAssets, updateAsset, mode }) => {
  
  const addAsset = () => {
    setAssets([...assets, { name: '', price: 0, value: 0 }]);
  };

  const removeAsset = (index) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2 underline decoration-indigo-200 decoration-4 underline-offset-4">
          <Layers size={16} className="text-indigo-500"/> Asset Allocation
        </h2>
        <button 
          onClick={addAsset}
          className="text-[9px] uppercase font-black bg-indigo-600 text-white py-1.5 px-3 rounded-full hover:bg-indigo-700 shadow-md transition-all flex items-center gap-1.5"
        >
          <PlusCircle size={12} /> Add New
        </button>
      </div>

      {/* Column Labels */}
      <div className="flex gap-3 px-1 mb-2">
        <label className="flex-1 text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Asset Name</label>
        <label className="w-20 text-[10px] font-black text-slate-400 uppercase text-center tracking-wider">Price</label>
        {/* Adjusted label to w-22 */}
        <label className="w-22 text-[10px] font-black text-slate-400 uppercase text-center tracking-wider">
          {mode === '1' ? 'Ratio' : 'Allocation'}
        </label>
        <div className="w-8"></div>
      </div>

      {/* Inputs List */}
      <div className="space-y-3">
        {assets.map((asset, index) => (
          <div key={index} className="flex gap-3 items-center group animate-in fade-in slide-in-from-left-1 duration-200">
            
            <div className="flex-grow min-w-0">
              <input 
                placeholder="Asset Name" 
                value={asset.name} 
                onChange={e => updateAsset(index, 'name', e.target.value)} 
                className="w-full p-2.5 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 focus:border-indigo-500 outline-none bg-white shadow-sm transition-all" 
              />
            </div>

            {/* Price - w-20 */}
            <div className="w-20 shrink-0">
              <input 
                type="number" 
                placeholder="0" 
                value={asset.price || ''} 
                onChange={e => updateAsset(index, 'price', e.target.value)} 
                className="w-full p-2.5 border border-slate-100 bg-slate-50/50 rounded-xl text-[12px] font-mono font-bold text-slate-600 text-center focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all" 
              />
            </div>

            {/* Allocation/Ratio - Set to w-22 */}
            <div className="w-22 shrink-0">
              <input 
                type="number" 
                placeholder="0" 
                value={asset.value || ''} 
                onChange={e => updateAsset(index, 'value', e.target.value)} 
                className="w-full p-2.5 border border-transparent rounded-xl text-[12px] font-bold bg-indigo-50 text-indigo-700 text-center focus:ring-2 focus:ring-indigo-200 outline-none transition-all" 
              />
            </div>

            <button 
              onClick={() => removeAsset(index)} 
              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
            >
              <Trash2 size={16}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};