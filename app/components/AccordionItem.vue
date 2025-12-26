<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },

    defaultOpen: {
        type: Boolean,
        default: false
    }
})

const isActive = ref(false)

onMounted(() => {
    isActive.value = props.defaultOpen
})

function toggleAccordion() {
    isActive.value = !isActive.value
}
</script>

<template>
    <div class="accordion-item" :class="{ active: isActive }">
        <div class="accordion-title" @click="toggleAccordion">
            <h3>{{ title }}</h3>
            <span class="arrow">&#x276F;</span>
        </div>

        <div class="accordion-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.accordion-item {
    border: 1px solid #bbb;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 0.2em;
}

.accordion-title {
    padding: 0.5em 1em;
    background-color: #f8f9fa;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.arrow {
    transition: transform 0.3s ease;
}

.accordion-content {
    max-height: 0;
    padding: 0 1em;
    overflow: hidden;
    transition: all 0.3s ease;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.accordion-item.active .arrow {
    transform: rotate(90deg);
}

.accordion-item.active .accordion-content {
    max-height: 300px;
    padding: 1em;
}
</style>