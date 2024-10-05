<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="slider" :style="{ '--value': value, '--label': size }">
    <div
      class="wheels"
      :style="{ 'grid-template-columns': gridTemplateColumns }"
      aria-hidden="true"
    >
      <span
        v-for="i in digits"
        :key="i"
        class="wheel"
        :class="{ last: i == digits, normal: i != digits }"
        :style="{ '--pos': Math.pow(10, digits - i) }"
      >
        <span v-for="n in 10" :key="n" :style="{ '--index': n - 1 }">{{ n - 1 }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
    default: 2,
  },
  digits: {
    type: Number,
    required: true,
    default: 3,
  },
})

const gridTemplateColumns = computed(() => {
  const columns = []
  const wheelWidth = `var(--wheel-width)`
  const val = Math.round(props.value)
  for (let i = 1; i <= props.digits; i++) {
    const pos = Math.pow(10, props.digits - i)
    const div = Math.floor(val / pos)
    const minExpr = `min(${wheelWidth}, ${div} * ${wheelWidth})`
    columns.push(minExpr)
  }
  return columns.join(' ')
})
</script>

<style scoped>
.slider {
  --ease: linear(0 0%,
      0.5007 7.21%,
      0.7803 12.29%,
      0.8883 14.93%,
      0.9724 17.63%,
      1.0343 20.44%,
      1.0754 23.44%,
      1.0898 25.22%,
      1.0984 27.11%,
      1.1014 29.15%,
      1.0989 31.4%,
      1.0854 35.23%,
      1.0196 48.86%,
      1.0043 54.06%,
      0.9956 59.6%,
      0.9925 68.11%,
      1 100%);

  .wheels {
    --val: round(var(--value), 1);
    pointer-events: none;
    display: grid;
    --wheel-width: calc(var(--label) * 0.65rem);
    align-content: center;
    height: calc(var(--label) * 2rem);
    transition: grid-template-columns 0.2s;
    transition: grid-template-columns 0.2s, -ms-grid-columns 0.2s;

    -webkit-mask: linear-gradient(#0000 0.25rem,
        #000 calc(50% - 0.35rem) calc(50% + 0.35rem),
        #0000 calc(100% - 0.25rem));

    mask: linear-gradient(#0000 0.25rem,
        #000 calc(50% - 0.35rem) calc(50% + 0.35rem),
        #0000 calc(100% - 0.25rem));

    .wheel {
      font-size: calc(var(--label) * 1rem);
      width: calc(var(--label) * 0.65rem);
      height: calc(var(--label) * 1.25rem);
      transform-style: preserve-3d;
      transition: transform 0.5s var(--ease);

      &.normal {
        --val: round(var(--value), 1);
        transform: rotateX(calc(round(down, var(--val) / var(--pos), 1) * -36deg));

        span {
          opacity: min(1, round(down, var(--val) / var(--pos), 1));
          transition: opacity 0.2s ease-out;
        }
      }

      &.last {
        --rotation: calc(var(--value) * -36);
        --final: round(nearest, var(--rotation), 1);
        transform: rotateX(calc(var(--final) * 1deg));
      }

      span {
        --radius: calc((var(--character-width, var(--label) * 1.25) / sin(36deg)) * -1rem);
        transform: translate(-50%, -50%) rotateX(calc(36deg * var(--index))) translateZ(calc(var(--radius, -5ch) * -1));
        display: grid;
        place-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
    }
  }
}
</style>
