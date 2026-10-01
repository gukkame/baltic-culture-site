<script setup lang="ts">
import { publicUrl } from '../publicUrl'
</script>

<template>
  <div class="overflow-hidden rounded-xl bg-white p-2">
    <img
      :src="publicUrl('/images/partners/interreg-latvia-lithuania.jpg')"
      alt="Interreg Latvija–Lietuva. Līdzfinansē Eiropas Savienība."
      lang="lv"
      width="400"
      height="121"
      decoding="async"
      class="block h-auto w-full"
    />
  </div>
</template>
