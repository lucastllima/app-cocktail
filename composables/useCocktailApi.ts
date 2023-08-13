import { Category, Drink } from "models";

export const useCocktailApi = () => {
    
    const useFetchCategories = async () => {
        return await useCustomFetch<Category[]>("list.php?c=list");
    }

    const useFetchDrinksByCategory = async (category: string) => {
        return await useCustomFetch<Drink[]>(
            `filter.php?c=${category}`,
        );
    }

    return {
        useFetchCategories,
        useFetchDrinksByCategory
    }
}