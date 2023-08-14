export interface Category {
    strCategory: string
}

export interface Drink {
    strDrink: string
    strDrinkThumb: string
    idDrink: string
    strInstructions?: string
}

export interface DrinkComplement extends Drink {
    strInstructions: string
    // TODO: Add remaining fields
}