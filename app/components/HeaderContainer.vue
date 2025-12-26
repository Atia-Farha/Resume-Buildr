<script setup>
import {useResumeStore} from '~/stores/formStore'

const store = useResumeStore()
</script>

<template>
    <header>
        <NuxtLink to="/">
            <h1>Resume Buildr</h1>
        </NuxtLink>

        <button type="button" class="reset-btn" @click="store.reset">Reset Info</button>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    padding: 0.5em 1em;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
}

h1 {
    font-family: 'Doto', monospace;
    font-weight: 500;
}

.reset-btn {
    border: 1.5px dotted #f44336;
    color: #f44336;
    transition: background-color 0.7s ease, color 0.7s ease;
}

.reset-btn:hover {
    background-color: #f44336;
    color: white;
}

.reset-btn:active {
    transform: scale(0.95);
}
</style>