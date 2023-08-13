<template>
  <div class="base-card border rounded border-gray-300" v-bind="$attrs">
    <div v-if="!hideHeader" class="base-card__header p-4 border-b border-gray-300" :class="headerClass">
      <template v-if="!$slots.header">
        <h3 class="text-lg font-semibold" :class="titleClass">{{ title }}</h3>
      </template>

      <slot v-else name="header"></slot>
    </div>
    <div class="base-card__content p-4" :class="contentClass">
      <slot name="default"></slot>
    </div>
    <div v-if="!hideFooter" class="base-card__footer p-4 border-t border-gray-300" :class="footerClass">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: { type: String, default: "Header Title" },
  headerClass: { type: String },
  footerClass: { type: String },
  contentClass: { type: String },
  titleClass: { type: String },
  hideHeader: { type: Boolean, default: false },
  hideFooter: { type: Boolean, default: false },
});
</script>
