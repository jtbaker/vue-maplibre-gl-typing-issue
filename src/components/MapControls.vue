<script setup lang="ts">
import { ref } from 'vue'

// Props and interface definitions
interface MapStyle {
  id: string
  name: string
  url: string
}

const props = defineProps({
  mapStyles: {
    type: Array as () => MapStyle[],
    required: true
  },
  currentStyle: {
    type: String,
    required: true
  }
})

// Emits
const emit = defineEmits(['change-style'])

// UI state
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const isSearching = ref(false)

// Change map style
const selectMapStyle = (styleUrl: string) => {
  emit('change-style', styleUrl)
}

// Mock search function (would connect to a geocoding service in a real app)
const searchLocation = async () => {
  if (!searchQuery.value.trim()) return
  
  isSearching.value = true
  
  // Simulate API call
  setTimeout(() => {
    searchResults.value = [
      { id: 1, name: 'Paris, France', coordinates: [2.3522, 48.8566] },
      { id: 2, name: 'New York, USA', coordinates: [-74.0060, 40.7128] },
      { id: 3, name: 'Tokyo, Japan', coordinates: [139.6917, 35.6895] }
    ].filter(location => 
      location.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    
    isSearching.value = false
  }, 500)
}

// Clear search
const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
}

// Handle input event
const handleInput = () => {
  if (searchQuery.value.length > 2) {
    searchLocation()
  } else {
    searchResults.value = []
  }
}
</script>

<template>
  <div class="map-controls">
    <div class="control-panel">
      <h2>Map Controls</h2>
      
      <!-- Search -->
      <div class="control-section">
        <h3>Search</h3>
        <div class="search-container">
          <input 
            type="text"
            v-model="searchQuery"
            @input="handleInput"
            placeholder="Search for a location"
            class="search-input"
          />
          <button 
            v-if="searchQuery"
            @click="clearSearch" 
            class="clear-button"
            aria-label="Clear search"
          >
            ×
          </button>
        </div>
        
        <!-- Search results -->
        <div v-if="searchResults.length > 0" class="search-results">
          <div 
            v-for="result in searchResults" 
            :key="result.id"
            class="search-result-item"
          >
            {{ result.name }}
          </div>
        </div>
        
        <div v-if="isSearching" class="search-loading">
          Searching...
        </div>
      </div>
      
      <!-- Map Styles -->
      <div class="control-section">
        <h3>Map Style</h3>
        <div class="style-options">
          <div 
            v-for="style in mapStyles" 
            :key="style.id"
            class="style-option"
            :class="{ 'active': currentStyle === style.url }"
            @click="selectMapStyle(style.url)"
          >
            {{ style.name }}
          </div>
        </div>
      </div>
      
      <!-- Information -->
      <div class="control-section">
        <h3>Information</h3>
        <p>Use the map controls to navigate, search for locations, and change the map style.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-controls {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.control-panel {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-light);
  color: var(--color-text-light);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow-y: auto;
  pointer-events: auto;
}

.control-section {
  margin-bottom: 24px;
}

.search-container {
  position: relative;
  margin-top: 8px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--color-neutral-300);
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
  outline: none;
}

.clear-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--color-neutral-500);
  font-size: 16px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-results {
  margin-top: 8px;
  border: 1px solid var(--color-neutral-200);
  border-radius: 8px;
  overflow: hidden;
}

.search-result-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background-color: var(--color-neutral-100);
}

.search-loading {
  margin-top: 8px;
  font-size: 14px;
  color: var(--color-neutral-500);
}

.style-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.style-option {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--color-neutral-100);
}

.style-option:hover {
  background-color: var(--color-neutral-200);
}

.style-option.active {
  background-color: var(--color-primary);
  color: white;
}

@media (prefers-color-scheme: dark) {
  .control-panel {
    background-color: var(--color-bg-dark);
    color: var(--color-text-dark);
  }
  
  .search-input {
    background-color: var(--color-neutral-800);
    color: var(--color-text-dark);
    border-color: var(--color-neutral-700);
  }
  
  .search-result-item:hover {
    background-color: var(--color-neutral-800);
  }
  
  .style-option {
    background-color: var(--color-neutral-800);
  }
  
  .style-option:hover {
    background-color: var(--color-neutral-700);
  }
}

@media (max-width: 640px) {
  .map-controls {
    width: 100%;
    height: 60%;
    bottom: 0;
    top: auto;
  }
  
  .control-panel {
    height: 100%;
    border-radius: 16px 16px 0 0;
    padding: 16px;
  }
}
</style>