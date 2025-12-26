<script setup>
import {useResumeStore} from '~/stores/formStore'

const store = useResumeStore()
</script>

<template>
    <div class="resume">
        <div v-if="store.firstName.length || store.lastName.length">
            <h1 class="name">{{ store.firstName }} {{ store.lastName }}</h1>
        </div>

        <div v-if="store.jobTitle.length">
            <h2 class="jobTitle">{{ store.jobTitle }}</h2>
        </div>

        <div class="primary-info">
            <div v-if="store.address.length">
                <a :href="'https://maps.google.com/?q=' + store.address" target="_blank"><strong>Address:</strong> {{ store.address }}</a>
            </div>

            <div v-if="store.phone.length">
                <a :href="'tel:' + store.phone" target="_blank"><strong>Phone:</strong> {{ store.phone }}</a>
            </div>

            <div v-if="store.email.length">
                <a :href="'mailto:' + store.email" target="_blank"><strong>Email:</strong> {{ store.email }}</a>
            </div>
        </div>

        <div class="contact">
            <div v-for="(contact, index) in store.contacts" :key="index">
                <a v-if="contact.username.length && contact.platform.length && contact.link.length" :href="contact.link" target="_blank"><strong>{{ contact.platform }}</strong>: {{ contact.username }}</a>
                <p v-else-if="contact.username.length && contact.platform.length"><strong>{{ contact.platform }}</strong>: {{ contact.username }}</p>
            </div>
        </div>

        <div v-if="store.educations.length" class="educations">
            <div>
                <h3>Education</h3>

                <hr>
            </div>

            <div v-for="(edu, index) in store.educations" :key="index" class="education">
                <div v-if="edu.inst.length || edu.location.length" class="hor-grp">
                    <div>
                        <h4>{{ edu.inst }}</h4>
                    </div>

                    <div>
                        <p>{{ edu.location }}</p>
                    </div>
                </div>

                <div v-if="edu.degree.length || edu.sub.length || edu.sYearMonth.length || edu.eYearMonth.length" class="hor-grp">
                    <div>
                        <span>{{ edu.degree }}</span>
                        <span v-if="edu.sub.length && edu.degree.length "> in </span>
                        <span>{{ edu.sub }}</span>
                    </div>

                    <div>
                        <span>{{ edu.sYearMonth }}</span>
                        <span v-if="edu.sYearMonth.length && edu.eYearMonth.length"> — </span>
                        <span>{{ edu.eYearMonth }}</span>
                    </div>
                </div>

                <div v-if="edu.resultType && typeof edu.score === 'number' && !isNaN(edu.score)">
                    <p>{{ edu.resultType }}: {{ edu.score.toFixed(2) }}</p>
                </div>
            </div>
        </div>

        <div v-if="store.experiences.length" class="experiences">
            <div>
                <h3>Experience</h3>

                <hr>
            </div>

            <div v-for="(exp, index) in store.experiences" :key="index" class="experience">
                <div v-if="exp.company.length || exp.sYearMonth.length || exp.eYearMonth.length" class="hor-grp">
                    <div>
                        <h4>{{ exp.company }}</h4>
                    </div>

                    <div>
                        <p>
                            {{ exp.sYearMonth }}
                            <span v-if="exp.sYearMonth.length && exp.eYearMonth.length"> — </span>
                            {{ exp.eYearMonth }}
                        </p>
                    </div>
                </div>

                <div v-if="exp.role.length">
                    <h4><em>{{ exp.role }}</em></h4>
                </div>

                <div v-if="exp.desc.length">
                    <p>{{ exp.desc }}</p>
                </div>
            </div>
        </div>

        <div v-if="store.skills.length" class="skills">
            <div>
                <h3>Skills</h3>

                <hr>
            </div>

            <div v-for="(skill, index) in store.skills" :key="index" class="skill">
                <div v-if="skill.field.length">
                    <h4>{{ skill.field }}:</h4>
                </div>

                <div v-if="skill.tools.length">
                    <p>{{ skill.tools }}</p>
                </div>
            </div>
        </div>

        <div v-if="store.projects.length" class="projects">
            <div>
                <h3>Projects</h3>

                <hr>
            </div>

            <div v-for="(pro, index) in store.projects" :key="index" class="project">
                <div v-if="pro.name.length || pro.sYearMonth.length || pro.eYearMonth.length" class="hor-grp">
                    <div class="project-title">
                        <h4 v-if="pro.name && pro.link.length">
                            <a :href="pro.link" target="_blank">{{ pro.name }} &#8599;</a>
                        </h4>

                        <h4 v-else>{{ pro.name }}</h4>
                    </div>

                    <div>
                        <p>
                            {{ pro.sYearMonth }}
                            <span v-if="pro.sYearMonth.length && pro.eYearMonth.length"> — </span>
                            {{ pro.eYearMonth }}
                        </p>
                    </div>
                </div>

                <div v-if="pro.desc.length">
                    <p>{{ pro.desc }}</p>
                </div>
            </div>
        </div>

        <div v-if="store.achievements.length" class="achievements">
            <div>
                <h3>Achievements</h3>

                <hr>
            </div>

            <div v-for="(ach, index) in store.achievements" :key="index" class="achievement">
                <div v-if="ach.title.length || ach.yearMonth.length" class="hor-grp">
                    <div class="ach">
                        <div v-if="ach.title.length">&#8226;</div>

                        <p>{{ ach.title }}</p>
                    </div>

                    <div v-if="ach.yearMonth.length">
                        <p>{{ ach.yearMonth }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    font-family: monospace;
    font-size: 2.8mm;
    flex-wrap: wrap;
}

.resume {
    width: 210mm;
    min-height: 297mm;
    margin: auto;
    padding: 12mm;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 1mm;
}

@media print {
    .resume {
        box-shadow: none;
        transform: none;
        margin: 0;
        padding: 12mm;
        width: 210mm;
        height: 297mm;
        page-break-inside: avoid;
        page-break-after: avoid;
    }
}

hr {
    border-color: black;
}

h1 {
    text-align: center;
    font-size: 7mm;
    font-weight: bolder;
}

h2 {
    text-align: center;
    font-size: 5.5mm;
    font-weight: normal;
}

h3 {
    font-size: 4.5mm;
    font-weight: bolder;
}

h4 {
    font-size: 3.5mm;
    font-weight: bolder;
}

a {
    color: black;
    text-decoration: none;
}

.primary-info,
.contact {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5mm;
}

.educations, .experiences, .skills, .projects, .achievements {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2.5mm;
}

.hor-grp {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 6mm;
}

.hor-grp > div:nth-child(2) {
    white-space: nowrap;
    word-break: keep-all;
    flex-shrink: 0;
}

.skill {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 3mm;
}

.skill > div:nth-child(2) p {
    font-size: 3.5mm;
    font-weight: normal;
}

.project-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.project-title h4 a {
    font-size: 3.5mm;
}

.ach {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 3mm;
    flex-wrap: nowrap;
}
</style>