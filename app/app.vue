<script setup>
useSeoMeta({
    title: 'Resume Buildr',
    description: 'Build professional resumes instantly with live preview and one-click PDF export. Simple, fast, and easy to use resume builder for everyone.',
    ogTitle: 'Resume Buildr',
    ogDescription: 'Build professional resumes instantly with live preview and one-click PDF export. Simple, fast, and easy to use resume builder for everyone.',
    ogType: 'website',
    ogSiteName: 'Resume Buildr',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Resume Buildr',
    twitterDescription: 'Build professional resumes instantly with live preview and one-click PDF export. Simple, fast, and easy to use resume builder for everyone.',
})

useHead({
    htmlAttrs: {
        lang: 'en',
    },
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>