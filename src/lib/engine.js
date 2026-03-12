export const calculatePlan = (budget, timeframe, assets) => {
  const totalRatio = assets.reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0);

  const summary = assets.map(asset => {
    const targetValue = (parseFloat(asset.value) / totalRatio) * budget;
    const totalQty = Math.floor(targetValue / asset.price);
    return { ...asset, totalQty, targetValue, actualCost: totalQty * asset.price };
  });

  let calendar = [];
  let buckets = assets.map(() => 0);
  
  for (let i = 1; i <= timeframe; i++) {
    let dayTotal = 0;
    const dayAssets = summary.map((asset, idx) => {
      const dailyTarget = asset.totalQty / timeframe;
      buckets[idx] += dailyTarget;
      const toBuy = Math.floor(buckets[idx] + 0.000001);
      buckets[idx] -= toBuy;
      dayTotal += toBuy * asset.price;
      return { name: asset.name, qty: toBuy };
    });
    calendar.push({ period: i, dayAssets, dayTotal });
  }

  const totalInvested = summary.reduce((sum, a) => sum + a.actualCost, 0);
  return { summary, calendar, totalInvested, remaining: budget - totalInvested };
};