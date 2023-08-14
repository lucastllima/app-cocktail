<template>
  <transition name="modal-fade">
    <div
      v-show="modalOpen"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full max-h-full bg-black bg-opacity-50"
      @click="$emit('on:close')"
    >
      <div class="relative w-full max-w-md max-h-full m-auto mt-[10%] -mb-[10%]" @click.stop>
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <div
            v-if="!hideHeader"
            class="base-modal__header flex items-start justify-between p-4 border-b rounded-t border-gray-300"
            :class="headerClass"
          >
            <slot name="title"
              ><h3 class="text-lg font-semibold">{{ title }}</h3></slot
            >
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-400 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-300 dark:hover:text-white"
              @click="$emit('on:close')"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Fechar</span>
            </button>
          </div>
          <div class="base-modal__content p-4" :class="contentClass">
            <slot name="default"></slot>
          </div>
          <div
            v-if="!hideFooter"
            class="flex justify-end items-center p-6 space-x-2 border-t border-gray-300 rounded-b"
            :class="footerClass"
          >
            <BaseButton @click="$emit('on:close')"> Fechar </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps({
  modalOpen: { type: Boolean, default: false },
  title: {
    type: String,
    default: "Modal title",
  },
  headerClass: { type: String },
  footerClass: { type: String },
  contentClass: { type: String },
  titleClass: { type: String },
  hideHeader: { type: Boolean, default: false },
  hideFooter: { type: Boolean, default: false },
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
