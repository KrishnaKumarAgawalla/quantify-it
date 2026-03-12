export const calculatePlan = (budget, timeframe, assets, mode) => {
  // mode '1' = Ratio, mode '2' = Fixed Amount
  const totalRatio = mode === '1' 
    ? assets.reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0) || 1
    : 1;

  // 1. Calculate Totals and Targets
  const summary = assets.map(asset => {
    const targetValue = (mode === '1') 
      ? (parseFloat(asset.value) / totalRatio) * budget 
      : parseFloat(asset.value);
    
    const price = parseFloat(asset.price) || 1; 
    const totalQty = Math.floor(targetValue / price);
    
    return { 
      ...asset, 
      totalQty, 
      targetValue, 
      actualCost: totalQty * price 
    };
  });

  // 2. Generate Calendar Breakdown
  let calendar = [];
  let buckets = assets.map(() => 0);
  
  for (let i = 1; i <= (timeframe || 1); i++) {
    let dayTotal = 0;
    const dayAssets = summary.map((asset, idx) => {
      const dailyTarget = asset.totalQty / timeframe;
      buckets[idx] += dailyTarget;
      
      const toBuy = Math.floor(buckets[idx] + 0.000001);
      buckets[idx] -= toBuy;
      dayTotal += toBuy * (parseFloat(asset.price) || 0);
      
      return { name: asset.name, qty: toBuy };
    });
    
    calendar.push({ period: i, dayAssets, dayTotal });
  }

  const totalInvested = summary.reduce((sum, a) => sum + a.actualCost, 0);
  const remaining = budget - totalInvested;

  // 3. Smart Recommendation (Find best use for leftover cash)
  let recommendation = null;
  const affordable = assets
    .filter(a => a.price > 0 && a.price <= remaining)
    .sort((a, b) => b.value - a.value); // Suggest based on highest weight first

  if (affordable.length > 0) {
    const best = affordable[0];
    const extraQty = Math.floor(remaining / best.price);
    recommendation = `You have ₹${remaining.toFixed(2)} left. To maximize utilization, you could purchase ${extraQty} more unit(s) of ${best.name}.`;
  }

  return { 
    summary, 
    calendar, 
    totalInvested, 
    remaining, 
    recommendation 
  };
};