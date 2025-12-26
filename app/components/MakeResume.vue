<script setup>
import { ref } from 'vue'

const activeTab = ref(0)
</script>

<template>
    <div class="container">
        <div class="heading">
            <h2>Build Your Resume</h2>

            <p>(Use desktop or laptop for better preview experience)</p>
        </div>

        <div class="tab">
            <div class="tab-buttons">
                <button :class="{ active: activeTab === 0 }" @click="activeTab = 0">Form</button>
                <button :class="{ active: activeTab === 1 }" @click="activeTab = 1">Preview</button>
            </div>

            <div class="tab-content">
                <div v-if="activeTab === 0">
                    <FormContainer />
                </div>

                <div v-if="activeTab === 1">
                    <PreviewContainer />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: clamp(0px, 100%, 1000px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3em;
}

.heading {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.heading p {
    color: #8c8c8c;
}

.tab-buttons {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tab-buttons button {
    padding: 10px 20px;
    border: 1px solid #bbb;
    border-radius: 0;
    background: #fff;
    cursor: pointer;
    transition: 0.7s;
}

.tab-buttons button:nth-child(1) {
    border-radius: 10px 0 0 0;
}

.tab-buttons button:nth-child(2) {
    border-radius: 0 10px 0 0;
}

.tab-buttons button.active {
    background: rgb(33, 150, 243);
    color: white;
    border-color: rgb(33, 150, 243);
    transform: scale(1);
}

.tab-content {
    width: clamp(0px, 100%, 1000px);
    border: 1px solid #bbb;
}

.tab-content form {
    padding: 1.5em 1em;
}
</style>