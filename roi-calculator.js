// ROI Calculator for Agent-Based Coding Productivity Boost

// Input parameters - all hardcoded variables defined here
const inputs = {
    numEngineers: 180,
    engineerHourlyCost: 80,
    hoursPerWeek: 38,
    calculationPeriodWeeks: 52,
    assistableTasksTimePercentage: 0.50,
    timeSavedPercentage: 0.33,
    agentToolCostPerEngineerPerMonth: 100,
    weeksToSetupAndTrain: 1,
    maintenanceEngineers: 2,
    maintenanceEngineerHourlyCost: 100
};

function calculateAgentCodingROI(inputs) {
    const effectiveAssistableHours = inputs.hoursPerWeek * inputs.assistableTasksTimePercentage;
    const hoursPerWeekSaved = effectiveAssistableHours * inputs.timeSavedPercentage;
    const setupAndTrainingCostPerEngineer = inputs.weeksToSetupAndTrain * inputs.hoursPerWeek * inputs.engineerHourlyCost;
    const totalMonths = inputs.calculationPeriodWeeks / 4.33;

    const totalHoursSaved = inputs.numEngineers * hoursPerWeekSaved * inputs.calculationPeriodWeeks;
    const totalBenefit = totalHoursSaved * inputs.engineerHourlyCost;

    const recurringCosts = inputs.numEngineers * inputs.agentToolCostPerEngineerPerMonth * totalMonths;
    const oneTimeCosts = inputs.numEngineers * setupAndTrainingCostPerEngineer;
    const maintenanceEngineerCosts = inputs.maintenanceEngineers * inputs.maintenanceEngineerHourlyCost * inputs.hoursPerWeek * inputs.calculationPeriodWeeks;
    const totalCost = recurringCosts + oneTimeCosts + maintenanceEngineerCosts;

    const netBenefit = totalBenefit - totalCost;
    const roi = (netBenefit / totalCost) * 100;

    return {
        effectiveAssistableHours,
        hoursPerWeekSaved,
        setupAndTrainingCostPerEngineer,
        totalMonths,
        totalHoursSaved,
        totalBenefit,
        recurringCosts,
        oneTimeCosts,
        maintenanceEngineerCosts,
        totalCost,
        netBenefit,
        roi,
        paybackPeriodWeeks: Math.round(totalCost / (totalBenefit / inputs.calculationPeriodWeeks)),
        weeklyBenefit: Math.round(totalBenefit / inputs.calculationPeriodWeeks)
    };
}

function printResults(inputs, result) {
    console.log("=== ROI Summary ===");
    console.log(`ROI: ${Math.round(result.roi)}%`);
    console.log(`Net Benefit: $${Math.round(result.netBenefit).toLocaleString()}`);
    console.log(`Total Benefit: $${result.totalBenefit.toLocaleString()}`);
    console.log(`Total Cost: $${Math.round(result.totalCost).toLocaleString()}`);
    console.log(`Payback Period: ${result.paybackPeriodWeeks} weeks`);
    console.log(`Weekly Benefit: $${result.weeklyBenefit.toLocaleString()}\n`);

    console.log("=== Input Parameters ===");
    console.log(`Team Size: ${inputs.numEngineers} engineers`);
    console.log(`Engineer Cost: $${inputs.engineerHourlyCost}/hour`);
    console.log(`Hours Per Week: ${inputs.hoursPerWeek}`);
    console.log(`Calculation Period: ${inputs.calculationPeriodWeeks} weeks`);
    console.log(`Assistable Tasks Time: ${inputs.assistableTasksTimePercentage * 100}%`);
    console.log(`Time Saved on Assistable Tasks: ${inputs.timeSavedPercentage * 100}%`);
    console.log(`Tool Cost: $${inputs.agentToolCostPerEngineerPerMonth}/engineer/month`);
    console.log(`Setup/Onboarding Time per Engineer: ${inputs.weeksToSetupAndTrain} weeks`);
    console.log(`Maintenance Engineers: ${inputs.maintenanceEngineers}`);
    console.log(`Maintenance Engineer Cost: $${inputs.maintenanceEngineerHourlyCost}/hour\n`);

    console.log("=== Key Intermediate Results ===");
    console.log(`Effective Assistable Hours: ${Math.round(result.effectiveAssistableHours)} hours/week/engineer`);
    console.log(`Hours Saved Per Week: ${Math.round(result.hoursPerWeekSaved)} hours/week/engineer`);
    console.log(`Total Hours Saved: ${Math.round(result.totalHoursSaved).toLocaleString()} hours`);
    console.log(`Setup/Training Cost Per Engineer: $${Math.round(result.setupAndTrainingCostPerEngineer).toLocaleString()}`);
    console.log(`Total Months: ${Math.round(result.totalMonths)}`);
    console.log(`Recurring Costs: $${Math.round(result.recurringCosts).toLocaleString()}`);
    console.log(`One-time Costs: $${Math.round(result.oneTimeCosts).toLocaleString()}`);
    console.log(`Maintenance Engineer Costs: $${Math.round(result.maintenanceEngineerCosts).toLocaleString()}`);
}

// Run calculation and display results
const result = calculateAgentCodingROI(inputs);
printResults(inputs, result);