<template>
  <section class="container mx-auto px-4 md:px-14 my-14">
    <h1 class="text-3xl mb-4">Drink Discover</h1>

    <BaseAlert v-if="!errorMessage" class="mb-4" :message="errorMessage" />

    <BaseCard hide-footer>
      <template #header>
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-4 gap-y-4">
          <BaseSelect
            class="col-span-2 lg:col-span-4"
            label="Categoria"
            :items="cocktails || []"
            item-text="strCategory"
            item-value="strCategory"
            v-model="selectedCategory"
          />
          <BaseButton
            class="w-full lg:w-28 self-end !p-3 mb-[2px]"
            :disabled="!selectedCategory || isLoadingDrinks"
            @click="handleDrinkSearch"
          >
            {{ isLoadingDrinks ? "Buscando..." : "Buscar" }}
          </BaseButton>
        </div>
      </template>

      <h4
        v-if="!selectedCategory || !drinks.length"
        class="flex align-items-center font-semibold italic"
      >
        Explore nossa seleção de bebidas! Escolha uma categoria para começar sua
        busca.
      </h4>

      <template v-else>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto"
        >
          <BaseCard
            v-for="(drink, idx) in drinks"
            :key="`Drink__${idx}`"
            :title="drink.strDrink"
            content-class="!p-0"
          >
            <template #header>
              <div class="flex justify-between">
                <h3 class="text-md font-semibold">{{ drink.strDrink }}</h3>
                <BaseStar
                  class="ml-2"
                  :filled="isDrinkFavorite(drink.idDrink)"
                  @click="setItemFavorite(drink.idDrink)"
                />
              </div>
            </template>
            <img :src="drink.strDrinkThumb" />
            <template #footer>
              <BaseButton class="w-full" @click="handleDrinkDetails(drink)"
                >Detalhes</BaseButton
              >
            </template>
          </BaseCard>
        </div>
      </template>
    </BaseCard>

    <BaseModal
      :modalOpen="!!selectedDrink.idDrink"
      @on:close="handleCloseModal"
      :title="selectedDrink.strDrink"
      content-class="p-0"
    >
      <img :src="selectedDrink.strDrinkThumb" />
      <div class="p-4">
        {{ getDrinkInstruction }}
      </div>
    </BaseModal>
  </section>
</template>

<script lang="ts" setup>
import { Drink } from "models";

const STORAGE_FAVORITE_KEY = "COCKTAIL_FAVORITE";
const DEFAULT_DRINK = {
  strDrink: "",
  strDrinkThumb: "",
  idDrink: "",
  strInstructions: "",
};
const selectedCategory = ref("");
const drinks = ref<Drink[]>([]);
const selectedDrink = ref<Drink>(DEFAULT_DRINK);
const isLoadingDrinks = ref(false);
const isLoadingDrinkDetails = ref(false);
const drinkErrorMessage = ref("");
const drinkDetailsErrorMessage = ref("");

const { useFetchCategories, useFetchDrinksByCategory, useFetchDrinkDetails } =
  await useCocktailApi();

const { data: cocktails, error: cocktailErrorMessage } =
  await useFetchCategories();

const handleDrinkSearch = async () => {
  resetDrinksData();

  isLoadingDrinks.value = true;
  const { data, error } = await useFetchDrinksByCategory(
    selectedCategory.value
  );

  drinks.value = data.value || [];
  drinkErrorMessage.value = error.value?.data || "";
  isLoadingDrinks.value = false;
};

const handleDrinkDetails = async (drink: Drink) => {
  selectedDrink.value = drink;
  isLoadingDrinkDetails.value = true;
  const { data, error } = await useFetchDrinkDetails(
    selectedDrink.value.idDrink
  );
  // Api Returns the item inside drinks array
  const strInstructions = data.value ? data.value[0].strInstructions : "";

  selectedDrink.value.strInstructions = strInstructions;
  drinkErrorMessage.value = error.value?.data || "";
  isLoadingDrinkDetails.value = false;
};

const errorMessage = computed(() => {
  return (
    cocktailErrorMessage.value ||
    drinkErrorMessage.value ||
    drinkDetailsErrorMessage
  );
});

const getDrinkInstruction = computed(() => {
  return isLoadingDrinkDetails.value
    ? "Carregando..."
    : selectedDrink.value.strInstructions || "Instrução não inserida.";
});

const { set, get } = useStorage();
const favoriteDrinks = ref<string[]>([]);

onMounted(() => {
  initFavoriteDrinks();
});

const isDrinkFavorite = (idDrink: string): boolean => {
  return favoriteDrinks.value.includes(idDrink);
};

const setItemFavorite = (idDrink: string) => {
  const drinkFavoriteIdx = favoriteDrinks.value.indexOf(idDrink);

  drinkFavoriteIdx > -1
    ? favoriteDrinks.value.splice(drinkFavoriteIdx, 1)
    : favoriteDrinks.value.push(idDrink);
  set(STORAGE_FAVORITE_KEY, favoriteDrinks.value);
};

const resetDrinksData = () => {
  drinks.value = [];
  drinkErrorMessage.value = "";
};

const initFavoriteDrinks = () => {
  favoriteDrinks.value = (get(STORAGE_FAVORITE_KEY) as string[]) ?? [];
};

const handleCloseModal = () => {
  selectedDrink.value = DEFAULT_DRINK;
};
</script>
