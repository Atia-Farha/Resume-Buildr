<script setup>
definePageMeta({
    layout: 'dashboard'
})

useSeoMeta({
    title: 'Resume Buildr',
    description: 'Build professional resumes instantly with live preview and one-click PDF export. Simple, fast, and easy to use resume builder for everyone.',
    ogTitle: 'Resume Buildr',
    ogDescription: 'Build professional resumes instantly with live preview and one-click PDF export. Simple, fast, and easy to use resume builder for everyone.',
    twitterTitle: 'Resume Buildr',
    twitterDescription: 'Build professional resumes instantly with live preview and one-click PDF export. Simple, fast, and easy to use resume builder for everyone.',
})

useHead({
    title: 'Resume Buildr',
    htmlAttrs: {lang: 'en'},
    meta: [{
        name: 'Resume Buildr',
        content: 'Build professional resumes instantly with live preview and one-click PDF export. Simple, fast, and easy to use resume builder for everyone.'
    }]
})
</script>

<template>
    <MakeResume/>
</template>