import {defineStore} from 'pinia'

export const useResumeStore = defineStore('resume', {
    state: () => {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            jobTitle: '',
            contacts: [],
            educations: [],
            experiences: [],
            skills: [],
            projects: [],
            achievements: [],
        }
    },

    actions: {
        loadFromLocalStorage() {
            if (typeof window !== 'undefined') {
                const savedData = localStorage.getItem('resumeData')
                if (savedData) {
                    this.$patch(JSON.parse(savedData))
                }
            }
        },

        addContact() {
            this.contacts.push({
                platform: '',
                username: '',
                link: ''
            });
        },
        deleteContact(index) {
            this.contacts.splice(index, 1)
        },

        addEducation() {
            this.educations.push({
                inst: '',
                location: '',
                degree: '',
                sub: '',
                sYearMonth: '',
                eYearMonth: '',
                resultType: '',
                score: ''
            });
        },
        deleteEducation(index) {
            this.educations.splice(index, 1)
        },

        addExperience() {
            this.experiences.push({
                company: '',
                role: '',
                sYearMonth: '',
                eYearMonth: '',
                desc: ''
            })
        },
        deleteExperience(index) {
            this.experiences.splice(index, 1)
        },

        addSkill() {
            this.skills.push({
                field: '',
                tools: ''
            })
        },
        deleteSkill(index) {
            this.skills.splice(index, 1)
        },

        addProject() {
            this.projects.push({
                name: '',
                link: '',
                sYearMonth: '',
                eYearMonth: '',
                desc: ''
            })
        },
        deleteProject(index) {
            this.projects.splice(index, 1)
        },

        addAchievement() {
            this.achievements.push({
                title: '',
                yearMonth: ''
            })
        },
        deleteAchievement(index) {
            this.achievements.splice(index, 1)
        },

        reset() {
            localStorage.removeItem('resumeData')
            this.$reset()
        }
    }
})