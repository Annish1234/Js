function evaluateDynamicExpression(expression, context) {
    // Step 1: Replace placeholders with actual values from the context
    expression = expression.replace(/\$\{(.*?)\}/g, (_, p1) => {
        const key = p1.trim().replace(/['"]/g, ""); // Remove quotes around the key
        if (context[key] !== undefined) {
            return JSON.stringify(context[key]); // Use JSON.stringify for proper type handling
        } else {
            console.warn(`Warning: Key "${key}" not found in context.`);
            return `"${key}"`; // Return the key as a string if not found in context
        }
    });

    // Log the final expression for debugging
    console.log("Evaluating expression:", expression);

    // Step 2: Validate and sanitize the expression
    const safeExpression = sanitizeExpression(expression);

    // Step 3: Evaluate the final expression
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
    // Regular expressions to allow only safe characters and prevent harmful code
    const safeChars = /^[\w\s().,!<>=&|+\-*/"[\]\d]+$/;
    
    if (!safeChars.test(expr)) {
        throw new Error("Expression contains unsafe characters.");
    }
    
    // Additional sanitization can be added here
    // For example, removing any non-permitted method calls

    return expr;
}

// Example usage

const context = {
    "A65": "ORGANISATION",
    "A782": "YES",
    "A753": "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE" // Example value as a comma-separated string
};

// const expression = '!( ${"RMD_24A"} == "1" ) && !( ${"RMD_106_A1"} == "1" ) && ["03"].includes( ${"RMD_23"} )';
let expression= '(${"A65"} == "ORGANISATION" && ${"A782"} == "YES" && (${ "A753" }.includes("BENEFICIAL_OWNER") || ${ "A753" }.includes("BENEFICIARY") || ${ "A753" }.includes("COUNCIL_MEMBER") || ${ "A753" }.includes("DIRECT_APPOINTEE") || ${ "A753" }.includes("DONOR") || ${ "A753" }.includes("FOUNDER") || ${ "A753" }.includes("FUND_MANAGER") || ${ "A753" }.includes("GRANTOR") || ${ "A753" }.includes("GUARANTOR") || ${ "A753" }.includes("GUARDIAN") || ${ "A753" }.includes("INTERMEDIATE_BENEFICIARY") || ${ "A753" }.includes("KEY_CONTROLLER") || ${ "A753" }.includes("MAIN_PARTY") || ${ "A753" }.includes("MANAGING_MEMBER") || ${ "A753" }.includes("NOMINEE_COMPANY") || ${ "A753" }.includes("OTHER_RELATED_PARTY") || ${ "A753" }.includes("OTHER_TRUST_RELATED_PARTY") || ${ "A753" }.includes("PROTECTOR") || ${ "A753" }.includes("SETTLOR") || ${ "A753" }.includes("TRUSTEE")))';
const result = evaluateDynamicExpression(expression, context);
console.log("Result:", result);



function evaluateExpression(expression) {
    // Log the final expression for debugging
    console.log("Evaluating expression:", expression);

    // Step 1: Validate and sanitize the expression
    const safeExpression = sanitizeExpression(expression);

    // Step 2: Evaluate the final expression
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
    // Regular expressions to allow only safe characters and prevent harmful code
    const safeChars = /^[\w\s().,!<>=&|+\-*/"[\]\d]+$/;
    
    if (!safeChars.test(expr)) {
        throw new Error("Expression contains unsafe characters.");
    }
    
    // Additional sanitization can be added here
    // For example, removing any non-permitted method calls

    return expr;
}

// Example usage
let expression = '"ORGANISATION" == "ORGANISATION" && "YES" == "YES" && ("BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("BENEFICIAL_OWNER") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("BENEFICIARY") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("COUNCIL_MEMBER") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("DIRECT_APPOINTEE") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("DONOR") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("FOUNDER") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("FUND_MANAGER") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("GRANTOR") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("GUARANTOR") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("GUARDIAN") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("INTERMEDIATE_BENEFICIARY") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("KEY_CONTROLLER") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("MAIN_PARTY") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("MANAGING_MEMBER") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("NOMINEE_COMPANY") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("OTHER_RELATED_PARTY") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("OTHER_TRUST_RELATED_PARTY") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("PROTECTOR") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("SETTLOR") || "BENEFICIAL_OWNER,COUNCIL_MEMBER,DIRECT_APPOINTEE".includes("TRUSTEE"))';

const result = evaluateExpression(expression);
console.log("Result:", result);
