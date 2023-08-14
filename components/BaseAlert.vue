<template>
  <div
    class="base-alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong class="font-bold">{{ title }}</strong>
    <template v-if="!$slots.content">
      <span class="block">{{ message }}</span>
    </template>
    <slot v-else name="content"></slot>
    <!-- TODO: Add dismissable button and timeout to hide -->
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: { type: String, default: "Falha ao processar informação" },
  message: { type: String },
  // Create variant prop to allow other alert styles (danger, warning, success, info...)
});
</script>
