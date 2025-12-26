<script setup>
const startYear = 2025;
const year = new Date().getFullYear();
</script>

<template>
    <footer>
        Copyright {{ startYear }}{{ year > startYear ? ' - ' + year : '' }} <a href="https://github.com/Atia-Farha" target="_blank">Atia Farha</a> | All Rights Reserved
    </footer>
</template>

<style scoped>
footer {
    width: 100%;
    padding: 2em 1em;
    border-top: 1px solid #ccc;
    font-family: 'Doto', monospace;
    font-weight: 500;
    text-align: center;
}

a {
    font-family: 'Doto', monospace;
    font-weight: 700;
}
</style>