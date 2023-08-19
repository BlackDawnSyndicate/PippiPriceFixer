document.getElementById('priceCalculator').addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve selected values from the form
    const rarity = document.getElementById('rarity').value;
    const sourceDistance = document.getElementById('sourceDistance').value;
    const demand = document.getElementById('demand').value;
    const weight = document.getElementById('weight').value;
    const tier = document.getElementById('tier').value;
	const materialCost = document.getElementById('materialCost').value;
	const craftingEase = document.getElementById('craftingEase').value;

    // Define multipliers
    const rarityValues = {
        NA: 1,
		VeryCommon: 0.8,
        Common: 2,
        Uncommon: 5,
        Rare: 10,
        ExtremelyRare: 20
    };

    const sourceDistanceValues = {
        NA: 1,
		ImmediateArea: 0.7,
        Close: 1.8,
        Medium: 3.2,
        Far: 5,
        Unknown: 15
    };
    
 const demandValues = {
        NA: 1,
		None: 0.5,
        Low: 1.2,
        Moderate: 3,
        High: 6,
        Extreme: 10
    };
    
	
	 const weightValues = {
        Heavy: 2,
        Moderate: 1.5,
        Light: 1.2,
        None: 1,
    };
    
	
	 const tierValues = {
        NA: 1,
		Beginner: 0.5,
        Basic: 2,
        Simple: 3,
        Low: 5,
        Medium: 8,
		High: 12,
		Advanced: 80,
		Epic: 20,
		Endgame: 40,
		
    };

	const materialCostValues = {
		NA: 1,
		Low: 2,
		Moderate: 4,
		High: 6,
		VeryHigh: 10,
	};
	
		const craftingEaseValues = {
		NA: 1,
		Easy: 0.8,
		Standard: 1.1,
		Annoying: 3,
		Hard: 6,
		VeryHard: 9,
		ExtremelyDifficult: 12,
		Impossible: 20,
	};

    // Calculate base price in Copper
    let basePriceInCopper = 1; // you can adjust this as needed
    basePriceInCopper *= rarityValues[rarity];
    basePriceInCopper *= sourceDistanceValues[sourceDistance];
    basePriceInCopper *= demandValues[demand];
    basePriceInCopper *= weightValues[weight];
    basePriceInCopper *= tierValues[tier];
	basePriceInCopper *= materialCostValues[materialCost];
	basePriceInCopper *= craftingEaseValues[craftingEase];

    // Define buy and sell multipliers for each role
    const useValues = {
        Harvester: { BuyMultiplier: 1, SellMultiplier: 0.8 },
        Processor: { BuyMultiplier: 1.2, SellMultiplier: 1 },
        Reseller: { BuyMultiplier: 1.3, SellMultiplier: 1.1 },
        User: { BuyMultiplier: 1.5, SellMultiplier: 1.2 }
    };
    
    // Calculate and display prices for each role
    for (const role in useValues) {
        const buyPriceInCopper = basePriceInCopper * useValues[role]['BuyMultiplier'];
        const sellPriceInCopper = basePriceInCopper * useValues[role]['SellMultiplier'];
        
        document.getElementById(`buyPrice${role}`).textContent = `${buyPriceInCopper.toFixed(2)} Copper, ${convertToSilver(buyPriceInCopper).toFixed(2)} Silver, ${convertToGold(buyPriceInCopper).toFixed(2)} Gold`;
        document.getElementById(`sellPrice${role}`).textContent = `${sellPriceInCopper.toFixed(2)} Copper, ${convertToSilver(sellPriceInCopper).toFixed(2)} Silver, ${convertToGold(sellPriceInCopper).toFixed(2)} Gold`;
    }
});

function convertToSilver(copper) {
    return copper / 100;
}

function convertToGold(copper) {
    return copper / 10000;
}



// Example Price Calculation Function
// Replace this with your actual calculation logic
function calculatePrice(rarity, tier, sourceDistance, demand, weight, role) {
    // Sample base price (in Copper) calculation based on the provided parameters and role
    let basePrice = 100; // a placeholder base price value, modify as needed

    // Apply multipliers based on role
    let roleMultiplier = 1.0;
    switch (role) {
        case 'Harvester':
            roleMultiplier = 0.8;
            break;
        case 'Processor':
            roleMultiplier = 1.2;
            break;
        case 'Reseller':
            roleMultiplier = 1.5;
            break;
        case 'User':
            roleMultiplier = 2.0;
            break;
    }

    // Calculate the final price based on the base price and role multiplier
    const finalPrice = Math.round(basePrice * roleMultiplier);
    
    return finalPrice;
}
