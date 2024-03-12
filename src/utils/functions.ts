export function capitalise(inputString: string) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}

export function makeSingular(noun: string): string {
    const irregularPlurals: { [key: string]: string } = {
        // Add irregular plurals and their singular forms here
        // Example: "mice": "mouse"
    };

    const rules: [RegExp, string][] = [
        [/([^aeiou])ies$/i, '$1y'],  // e.g., babies -> baby
        [/s$/i, ''],                  // e.g., cats -> cat
        // Add more rules here as needed
    ];

    // Check if the noun is an irregular plural
    if (irregularPlurals.hasOwnProperty(noun)) {
        return irregularPlurals[noun];
    }

    // Apply rules to make the noun singular
    for (const [rule, replacement] of rules) {
        if (rule.test(noun)) {
            return noun.replace(rule, replacement);
        }
    }

    // If no rules match, return the original noun
    return noun;
}