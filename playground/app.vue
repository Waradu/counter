<template>
  <div>
    <NumCounter
      :value="num"
      :size="4"
      :digits="4"
    />
    <button @click="num++">
      Up
    </button>
    <button @click="num--">
      down
    </button>
  </div>
</template>

<script setup>
const num = ref(1)

onMounted(() => {
  num.value = 999
})
</script>
