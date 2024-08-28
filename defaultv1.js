function evaluateDynamicExpression(expression, context) {
    // Replace placeholders with actual values from the context
    expression = expression.replace(/\$\{(.*?)\}/g, (_, key) => {
        key = key.trim().replace(/['"]/g, ""); // Remove quotes around the key
        return context[key] !== undefined ? JSON.stringify(context[key]) : `"${key}"`;
    });

    // Log the final expression for debugging
    console.log("Evaluating expression:", expression);

    // Validate and sanitize the expression
    const safeExpression = sanitizeExpression(expression);

    // Evaluate the final expression
    try {
        const result = eval(safeExpression);
        return result;
    } catch (error) {
        console.error("Error evaluating expression:", error.message);
        return null;
    }
}

// Function to sanitize and validate the expression
function sanitizeExpression(expr) {
    // Regular expression to allow safe characters including common operators and delimiters
    const safeChars = /^[\w\s().,!<>=&|+\-*/"[\]\d?:]+$/;

    // Find all characters that do not match the safe pattern
    const unsafeChars = expr.split('').filter(char => !safeChars.test(char));
    
    if (unsafeChars.length > 0) {
        console.error("Expression contains unsafe characters:", unsafeChars.join(''));
        throw new Error("Expression contains unsafe characters.");
    }

    return expr;
}

// Example usage
const context = {
    "A122": "08" // Replace this with your dynamic value
};

const expression = '(${"A122"} === "07" || ${"A122"} === "11") ? "01" : (${"A122"} === "08") ? "02" : (${"A122"} === "25" || ${"A122"} === "05") ? "03" : (${"A122"} === "09" || ${"A122"} === "06" || ${"A122"} === "13") ? "04" : (${"A122"} === "24" || ${"A122"} === "26") ? "05" : (${"A122"} === "15" || ${"A122"} === "17") ? "06" : (${"A122"} === "16") ? "07" : (${"A122"} === "14" || ${"A122"} === "18") ? "08" : (${"A122"} === "19" || ${"A122"} === "20" || ${"A122"} === "21" || ${"A122"} === "22" || ${"A122"} === "23") ? "09" : (${"A122"} === "03") ? "10" : (${"A122"} === "04") ? "11" : (${"A122"} === "12") ? "12" : (${"A122"} === "10") ? "17" : ""';

// Evaluating the expression
const result = evaluateDynamicExpression(expression, context);
console.log("Result:", result);
