<script setup>
import {useResumeStore} from '~/stores/formStore'
import {onMounted, ref} from 'vue'

const resumeRef = ref(null)

const store = useResumeStore()

onMounted(() => {
    store.loadFromLocalStorage()

    store.$subscribe((mutation, state) => {
        localStorage.setItem('resumeData', JSON.stringify(state))
    })
})

function handleEduPresent(edu) {
    if (edu.isPresent) {
        edu.eYearMonth = 'Present'
    } else {
        edu.eYearMonth = ''
    }
}

function handleScore(edu) {
    if (edu.score < 0) {
        edu.score = 0
    } else if (edu.score > 10) {
        edu.score = 10
    }
}

function handleExpPresent(exp) {
    if (exp.isPresent) {
        exp.eYearMonth = 'Present'
    } else {
        exp.eYearMonth = ''
    }
}

function handleProPresent(pro) {
    if (pro.isPresent) {
        pro.eYearMonth = 'Present'
    } else {
        pro.eYearMonth = ''
    }
}

async function generatePDF() {
    const html2pdf = (await import('html2pdf.js')).default;

    const element = resumeRef.value;
    if (!element) return console.error('Resume ref missing');

    element.style.display = 'block';

    await new Promise(resolve => setTimeout(resolve, 100));

    const opt = {
        margin: [0, 0, 0, 0],
        filename: 'resume.pdf',
        image: {
            type: 'jpeg',
            quality: 0.9
        },
        html2canvas: {
            scale: 4,
            useCORS: true,
            logging: false
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
        pagebreak: {mode: ['avoid-all', 'css', 'legacy']}
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (err) {
        console.error('PDF error:', err);
    } finally {
        element.style.display = 'none';
    }
}
</script>

<template>
    <form>
        <AccordionItem title="Personal Info" defaultOpen>
            <div class="info">
                <div class="input-grp">
                    <label for="f-name">First Name</label>
                    <input id="f-name" v-model="store.firstName" type="text" maxlength="32" required>
                </div>
                <div class="input-grp">
                    <label for="l-name">Last Name</label>
                    <input id="l-name" v-model="store.lastName" type="text" maxlength="32" required>
                </div>
                <div class="input-grp">
                    <label for="email">Email</label>
                    <input id="email" v-model="store.email" type="email" maxlength="128">
                </div>
                <div class="input-grp">
                    <label for="phone">Phone</label>
                    <input id="phone" v-model="store.phone" type="tel" maxlength="32" required>
                </div>
                <div class="input-grp">
                    <label for="address">Address</label>
                    <input id="address" v-model="store.address" type="text" maxlength="512">
                </div>
                <div class="input-grp">
                    <label for="job">Job Title</label>
                    <input id="job" v-model="store.jobTitle" type="text" maxlength="128" required>
                </div>
            </div>

            <div class="contacts">
                <h4>Contacts</h4>

                <div v-for="(contact, index) in store.contacts" :key="index" class="dynamic-item">
                    <div class="items">
                        <div class="input-grp">
                            <label :for="'p-name-' + index">Platform Name</label>
                            <input :id="'p-name-' + index" v-model="contact.platform" type="text" maxlength="64" required>
                        </div>
                        <div class="input-grp">
                            <label :for="'p-username-' + index">Username</label>
                            <input :id="'p-username-' + index" v-model="contact.username" type="text" maxlength="64" required>
                        </div>
                        <div class="input-grp">
                            <label :for="'p-link-' + index">Profile Link</label>
                            <input :id="'p-link-' + index" v-model="contact.link" type="text" maxlength="256">
                        </div>
                    </div>

                    <button type="button" class="delete-btn" @click="store.deleteContact(index)">Delete</button>
                </div>

                <button v-if="store.contacts.length < 8" type="button" class="add-btn" @click="store.addContact">Add Contact</button>

                <div v-if="store.contacts.length >= 8" class="limit-info">Reached limit of 8</div>
            </div>
        </AccordionItem>

        <AccordionItem title="Education">
            <div v-for="(edu, index) in store.educations" :key="index" class="dynamic-item">
                <div class="items">
                    <div class="input-grp">
                        <label :for="'inst-' + index">Institution Name</label>
                        <input :id="'inst-' + index" v-model="edu.inst" type="text" maxlength="128" required>
                    </div>
                    <div class="input-grp">
                        <label :for="'inst-location-' + index">Location</label>
                        <input :id="'inst-location-' + index" v-model="edu.location" type="text" maxlength="64" required>
                    </div>
                    <div class="input-grp">
                        <label :for="'degree-' + index">Degree</label>
                        <input :id="'degree-' + index" v-model="edu.degree" type="text" maxlength="128" required>
                    </div>
                    <div class="input-grp">
                        <label :for="'sub-' + index">Subject</label>
                        <input :id="'sub-' + index" v-model="edu.sub" type="text" maxlength="128">
                    </div>
                    <div class="input-grp">
                        <label :for="'edu-start-' + index">Starting Time</label>
                        <input :id="'edu-start-' + index" v-model="edu.sYearMonth" type="month">
                    </div>
                    <div class="input-grp">
                        <label :for="'edu-end-' + index">Ending Time</label>
                        <div v-if="!edu.isPresent" class="end-time-input">
                            <input :id="'edu-end-' + index" v-model="edu.eYearMonth" type="month">
                        </div>
                        <div class="checkbox-grp">
                            <input :id="'edu-present-' + index" v-model="edu.isPresent" type="checkbox" @change="handleEduPresent(edu)">
                            <label :for="'edu-present-' + index">Present (ongoing)</label>
                        </div>
                    </div>
                    <div class="input-grp">
                        <label :for="'result-' + index">Result Type</label>
                        <select :id="'result-' + index" v-model="edu.resultType">
                            <option value="CGPA">CGPA</option>
                            <option value="GPA">GPA</option>
                        </select>
                    </div>
                    <div class="input-grp">
                        <label :for="'score-' + index">Score</label>
                        <input :id="'score-' + index" v-model="edu.score" type="number" min="0" max="10" step="0.01" @input="handleScore(edu)">
                    </div>
                </div>

                <button type="button" class="delete-btn" @click="store.deleteEducation(index)">Delete</button>
            </div>

            <button v-if="store.educations.length < 8" type="button" class="add-btn" @click="store.addEducation">Add Education</button>

            <div v-if="store.educations.length >= 8" class="limit-info">Reached limit of 8</div>
        </AccordionItem>

        <AccordionItem title="Experience">
            <div v-for="(exp, index) in store.experiences" :key="index" class="dynamic-item">
                <div class="items">
                    <div class="input-grp">
                        <label :for="'company-' + index">Company</label>
                        <input :id="'company-' + index" v-model="exp.company" type="text" maxlength="256" required>
                    </div>
                    <div class="input-grp">
                        <label :for="'role-' + index">Role</label>
                        <input :id="'role-' + index" v-model="exp.role" type="text" maxlength="128" required>
                    </div>
                    <div class="input-grp">
                        <label :for="'exp-start-' + index">Starting Time</label>
                        <input :id="'exp-start-' + index" v-model="exp.sYearMonth" type="month">
                    </div>
                    <div class="input-grp">
                        <label :for="'exp-end-' + index">Ending Time</label>
                        <div v-if="!exp.isPresent" class="end-time-input">
                            <input :id="'exp-end-' + index" v-model="exp.eYearMonth" type="month">
                        </div>
                        <div class="checkbox-grp">
                            <input :id="'exp-present-' + index" v-model="exp.isPresent" type="checkbox" @change="handleExpPresent(exp)">
                            <label :for="'exp-present-' + index">Present (ongoing)</label>
                        </div>
                    </div>
                    <div class="input-grp">
                        <label :for="'exp-desc-' + index">Description</label>
                        <textarea :id="'exp-desc-' + index" v-model="exp.desc" rows="3" maxlength="2000"/>
                    </div>
                </div>

                <button type="button" class="delete-btn" @click="store.deleteExperience(index)">Delete</button>
            </div>

            <button v-if="store.experiences.length < 8" type="button" class="add-btn" @click="store.addExperience">Add Experience</button>

            <div v-if="store.experiences.length >= 8" class="limit-info">Reached limit of 8</div>
        </AccordionItem>

        <AccordionItem title="Skills">
            <div v-for="(skill, index) in store.skills" :key="index" class="dynamic-item">
                <div class="items">
                    <div class="input-grp">
                        <label :for="'skill-field' + index">Field</label>
                        <input :id="'skill-field' + index" v-model="skill.field" type="text" maxlength="1024">
                    </div>
                    <div class="input-grp">
                        <label :for="'skill-tools' + index">Tools</label>
                        <input :id="'skill-tools' + index" v-model="skill.tools" type="text" maxlength="1024" required>
                    </div>
                </div>

                <button type="button" class="delete-btn" @click="store.deleteSkill(index)">Delete</button>
            </div>

            <button v-if="store.skills.length < 12" type="button" class="add-btn" @click="store.addSkill">Add Skill</button>

            <div v-if="store.skills.length >= 12" class="limit-info">Reached limit of 12</div>
        </AccordionItem>

        <AccordionItem title="Projects">
            <div v-for="(pro, index) in store.projects" :key="index" class="dynamic-item">
                <div class="items">
                    <div class="input-grp">
                        <label :for="'p-name-' + index">Project Name</label>
                        <input :id="'p-name-' + index" v-model="pro.name" type="text" maxlength="128" required>
                    </div>
                    <div class="input-grp">
                        <label :for="'p-link-' + index">Project Link</label>
                        <input :id="'p-link-' + index" v-model="pro.link" type="text" maxlength="256">
                    </div>
                    <div class="input-grp">
                        <label :for="'pro-start-' + index">Starting Time</label>
                        <input :id="'pro-start-' + index" v-model="pro.sYearMonth" type="month">
                    </div>
                    <div class="input-grp">
                        <label :for="'pro-end-' + index">Ending Time</label>
                        <div v-if="!pro.isPresent" class="end-time-input">
                            <input :id="'pro-end-' + index" v-model="pro.eYearMonth" type="month">
                        </div>
                        <div class="checkbox-grp">
                            <input :id="'pro-present-' + index" v-model="pro.isPresent" type="checkbox" @change="handleProPresent(pro)">
                            <label :for="'pro-present-' + index">Present (ongoing)</label>
                        </div>
                    </div>
                    <div class="input-grp">
                        <label :for="'pro-desc-' + index">Description</label>
                        <textarea :id="'pro-desc-' + index" v-model="pro.desc" rows="3" maxlength="2000"/>
                    </div>
                </div>

                <button type="button" class="delete-btn" @click="store.deleteProject(index)">Delete</button>
            </div>

            <button v-if="store.projects.length < 8" type="button" class="add-btn" @click="store.addProject">Add Project</button>

            <div v-if="store.projects.length >= 8" class="limit-info">Reached limit of 8</div>
        </AccordionItem>

        <AccordionItem title="Achievements">
            <div v-for="(ach, index) in store.achievements" :key="index" class="dynamic-item">
                <div class="items">
                    <div class="input-grp">
                        <label :for="'achievement-' + index">Achievement</label>
                        <input :id="'achievement-' + index" v-model="ach.title" type="text" maxlength="1024" required>
                    </div>
                    <div class="input-grp">
                        <label :for="'ach-time-' + index">Time</label>
                        <input :id="'ach-time-' + index" v-model="ach.yearMonth" type="month">
                    </div>
                </div>

                <button type="button" class="delete-btn" @click="store.deleteAchievement(index)">Delete</button>
            </div>

            <button v-if="store.achievements.length < 12" type="button" class="add-btn" @click="store.addAchievement">Add Achievement</button>

            <div v-if="store.achievements.length >= 12" class="limit-info">Reached limit of 12</div>
        </AccordionItem>

        <button type="button" class="submit-btn" @click="generatePDF">Generate Resume</button>

        <div ref="resumeRef" class="hidden">
            <ResumeContainer/>
        </div>
    </form>
</template>

<style scoped>
.hidden {
    display: none;
}

form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
}

.info {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
}

.input-grp {
    flex: 1 1 calc(50% - 0.5em);
    display: flex;
    flex-direction: column;
}

.contacts {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.dynamic-item {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #bbb;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
}

.items {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5em;
}

label {
    color: #8c8c8c;
}

input,
textarea,
select {
    padding: 0.5em;
    border: 1px dotted #8c8c8c;
    border-radius: 3px;
    transition: border 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
    border: 1px solid rgb(33, 150, 243);
}

.end-time-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.checkbox-grp {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3em;
    margin-top: 0.5em;
}

.delete-btn {
    background-color: rgb(244, 67, 54);
    color: white;
    transition: background-color 0.7s ease;
}

.delete-btn:hover {
    background-color: rgba(244, 67, 54, 0.8);
}

.add-btn {
    background-color: rgb(76, 175, 80);
    color: white;
    transition: background-color 0.7s ease;
}

.add-btn:hover {
    background-color: rgba(76, 175, 80, 0.8);
}

.submit-btn {
    margin-top: 1.5em;
    background-color: rgb(33, 150, 243);
    color: white;
    transition: background-color 0.7s ease;
}

.submit-btn:hover {
    background-color: rgba(33, 150, 243, 0.8);
    color: white;
}

button:active {
    transform: scale(0.9);
}

.limit-info {
    margin-top: 1em;
    color: gray;
    font-size: 1.2em;
    font-weight: 900;
    text-align: center;
    border: 2px dotted gray;
    border-radius: 3px;
    padding: 0.5em;
}
</style>