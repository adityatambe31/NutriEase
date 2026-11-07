

export const formatRecipeTitle = (title: string): string => {
    return title.charAt(0).toUpperCase() + title.slice(1);
};

export const formatIngredientsList = (ingredients: string[]): string => {
    return ingredients.map(ingredient => `- ${ingredient}`).join('\n');
};

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isValidInput = (input: string): boolean => {
    return input.trim().length > 0;
};