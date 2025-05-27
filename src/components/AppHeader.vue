<script setup lang="ts">
// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Map Explorer'
  }
})

// Current date
const currentDate = new Date().toLocaleDateString()
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">{{ title }}</h1>
      <div class="header-right">
        <span class="date">{{ currentDate }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  padding: 16px;
  background-color: var(--color-bg-light);
  color: var(--color-text-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.app-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
}

.header-right {
  display: flex;
  align-items: center;
}

.date {
  font-size: 0.9rem;
  color: var(--color-neutral-600);
}

@media (prefers-color-scheme: dark) {
  .app-header {
    background-color: var(--color-bg-dark);
    color: var(--color-text-dark);
  }
  
  .date {
    color: var(--color-neutral-400);
  }
}

@media (max-width: 640px) {
  .app-header {
    padding: 12px;
  }
  
  .app-title {
    font-size: 1.2rem;
  }
}
</style>