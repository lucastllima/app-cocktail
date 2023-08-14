<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4 text-red-500">404</h1>
      <p class="text-xl font-semibold">As bebidas não estão nessa página.</p>
      <BaseButton class="mt-4" @click="$router.push('/')">
        Ir para página de bebidas
      </BaseButton>
    </div>
  </div>
</template>
