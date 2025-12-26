<script setup>
definePageMeta({
    layout: 'dashboard'
})

useHead({
    title: 'Resume Buildr',
    htmlAttrs: { lang: 'en' },
    meta: [{
        name: 'Resume Buildr',
        content: 'AI assisted resume maker for quick resumes'
    }]
})
</script>

<template>
    <MakeResume />
</template>