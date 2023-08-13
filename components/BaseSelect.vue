<template>
  <div class="base-select relative" v-bind="$attrs">
    <label v-if="label" class="block mb-2">{{ label }}</label>
    <div
      class="base-select__input border border-solid border-gray-300 p-3 cursor-pointer rounded"
      @click="showDropdown = !showDropdown"
    >
      <span>{{ internalPlaceholder }}</span>
    </div>

    <div
      class="base-select__items mt-2 border border-solid rounded bg-white absolute w-full z-50"
      v-show="showDropdown"
    >
      <div class="static p-3">
        <input
          class="p-2 rounded border border-solid border-gray-300 w-full"
          placeholder="Buscar..."
          v-model="searchInput"
          ref="searchInputRef"
        />
      </div>
      <ul class="overflow-auto max-h-48">
        <template v-if="!!computedItems.length">
          <li
            v-for="(item, idx) in computedItems"
            :key="`BaseSelect_${idx}`"
            class="p-3 cursor-pointer hover:bg-gray-600 hover:text-white select-none last:rounded-b"
            :class="{
              'bg-gray-600 text-white': modelValue == getItemText(item),
            }"
            @click="handleSelected(item)"
          >
            {{ getItemText(item) }}
          </li>
        </template>
        <template v-else>
          <span class="block p-3">Resultado não encontrado...</span>
        </template>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  items: { type: Array, default: [] },
  itemText: { type: String },
  itemValue: { type: String },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "Selecione um valor" },
  modelValue: { type: String },
  closeOnSelect: { type: Boolean, default: true },
});

const internalPlaceholder = computed(() => {
  return props.modelValue || props.placeholder;
});
const computedItems = computed(() => {
  return !!searchInput.value
    ? props.items.filter((item) =>
        getItemText(item).includes(searchInput.value)
      )
    : props.items;
});
const showDropdown = ref(false);
const searchInput = ref("");
const searchInputRef = ref<HTMLInputElement | null>(null);

watch(
  () => showDropdown.value,
  async (canShowDropdown) => {
    if (!canShowDropdown) {
      searchInput.value = "";
    } else {
      await nextTick();
      searchInputRef.value!.focus();
    }
  }
);

const getItemValue = (item: any) => {
  return props.itemValue ? item[props.itemValue] : item;
};

const getItemText = (item: any) => {
  return props.itemText ? item[props.itemText] : item;
};

const handleSelected = (item: any) => {
  if (props.closeOnSelect) {
    showDropdown.value = false;
  }
  emit("update:modelValue", getItemValue(item));
};
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
