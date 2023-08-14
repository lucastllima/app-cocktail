import { Category, Drink, DrinkComplement } from "models";

export const useCocktailApi = () => {
    
    const useFetchCategories = async () => {
        return await useCustomFetch<Category[]>("list.php?c=list");
    }

    const useFetchDrinksByCategory = async (category: string) => {
        return await useCustomFetch<Drink[]>(
            `filter.php?c=${category}`,
        );
    }
    
    const useFetchDrinkDetails = async (drink: string) => {
        return await useCustomFetch<DrinkComplement[]>(`/lookup.php?i=${drink}`)
    }

    return {
        useFetchCategories,
        useFetchDrinksByCategory,
        useFetchDrinkDetails
    }
}