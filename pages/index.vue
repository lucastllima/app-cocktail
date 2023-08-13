<template>
  <section class="container mx-auto px-4 md:px-14 my-14">
    <h1 class="text-3xl mb-4">Drink Discover</h1>

    <BaseAlert
      v-if="drinkErrorMessage || cocktailErrorMessage"
      class="mb-4"
      message="Houve uma falha ao tentar realizar a requisição"
    />

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
            content-class="p-0"
          >
            <template #header>
              <div class="flex justify-between">
                <h3 class="text-lg font-semibold">{{ drink.strDrink }}</h3>
                <BaseStar
                  :filled="isItemFavorite(drink.strDrink)"
                  @click="setItemFavorite"
                />
              </div>
            </template>
            <img :src="drink.strDrinkThumb" />
            <template #footer>
              <BaseButton class="w-full">Detalhes</BaseButton>
            </template>
          </BaseCard>
        </div>
      </template>
    </BaseCard>
  </section>
</template>

<script lang="ts" setup>
import { Drink } from "models";

const selectedCategory = ref("");
const drinks = ref<Drink[]>([]);
const isLoadingDrinks = ref(false);
const drinkErrorMessage = ref("");
const { useFetchCategories, useFetchDrinksByCategory } = await useCocktailApi();

const { data: cocktails, error: cocktailErrorMessage } =
  await useFetchCategories();

const handleDrinkSearch = async () => {
  resetDrinksData()
  const { data, error } = await useFetchDrinksByCategory(selectedCategory.value);

  isLoadingDrinks.value = true;
  drinks.value = data.value || [];
  drinkErrorMessage.value = error.value?.data || ''
  isLoadingDrinks.value = false;
};

const isItemFavorite = (name: string): boolean => {
  return name === "123";
};

const setItemFavorite = () => {
  console.log("definir local storage");
};

const resetDrinksData = () => {
  drinks.value = []
  drinkErrorMessage.value = ''
}
</script>
