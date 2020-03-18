<template>
	<v-card>
		<v-tabs fixed-tabs center-active v-model="tab" class="pl-1">
			<v-tab v-for="tab of tabHeaders" :key="tab">{{ tab }}</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab" class="pa-5 pb-0">
			<v-tab-item v-for="(tab, tIndex) of tabHeaders" :key="tab">
				<div v-for="(question, qIndex) of guidedQuestions[type][tab]" :key="question">
					{{ question }}
					<v-radio-group v-model="radios[tIndex][qIndex]" row>
						<v-radio label="No" />
						<v-radio label="Maybe" />
						<v-radio label="Yes" />
					</v-radio-group>
				</div>
			</v-tab-item>
		</v-tabs-items>
		<v-card-actions class="pt-0">
			<v-spacer />
			<v-btn color="primary" @click="saveButton()">Save ></v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { getDefaultMatrixOrder } from "@/components/Matrix/matrices.js"

export default {
	props: [ "matrix", "type" ],
	data() {
		let guidedQuestions = {
			school: {
				Accommodating: [
					"Does the school make efforts to ease common issues, like finals crunch?",
					"Are accommodations made for disabilities, both physical and otherwise?",
					"If you miss a class or a test, are there systems in place to help?"
				], 
				Demanding: [
					"Was the school lauded highly for its difficulty?",
					"Is the school highly competitive, requiring high scores and extracurriculars?",
					"Does the school have a strong culture of indivudal struggle and excellence?"
				], 
				Grounds: [
					"Are there pleasant places to relax on campus, relatively silent and attractive?",
					"Does the school have available fitness and sports equipment?",
					"Are there well-kept meeting areas and either library or reading space?"
				], 
				Progressive: [
					"Does the school make speakers available, of differing stances and opinions?",
					"Does the administration react quickly and compassionately to issues?",
					"Are there systems in place to reduce common issues, such as personal safety?"
				], 
				Resources: [
					"Does students have easy access to the resources on campus and weren't restricted?",
					"Are there systems in place to ease and make possible the transition to a career?",
					"Are students able to use and experiment with learning tools?"
				],
				Transparent: [
					"Does the school make it obvious where money was coming from and going?",
					"Are grades given simply and were they easy to understand?",
					"Is the path from freshman to senior clear and obvious? Are major requirements?"
				]
			},
			course: {
				"Fast-paced": [
					"Did you ever feel you were being left behind?",
					"Were topics moved on from before being covered in depth?",
					"Did the instructor have little time for questions in favor of covering material?"
				], 
				Experimental: [
					"Was this class the first of its type or format, untested?",
					"Did the instructor seem like they were making things up as they went along?",
					"Did parts of the syllabus have to be skipped or adapted?"
				], 
				"Hands-on": [
					"Were you given time to experience and explore topics on your own?",
					"Was classwork based around giving you chances to learn important themes?",
					"Was more time devoted to personal tasks than lecturing time?"
				], 
				"Student-led": [
					"Did the instructor make an effort to tailor the course to the students' interests?",
					"Were lessons taught in part by the students, by discussion or presentations?",
					"Was the instructor open to feedback and criticism from the students?"
				], 
				Lecturing: [
					"Were classes generally devoted to covering assigned material?",
					"Did the instructor only allow questions at the end or not at all?",
					"Were students rarely given the stage or opportunities to share opinions?"
				], 
				Relevant: [
					"Did the class make you feel like you could meaningfully engage with its content?",
					"Was the material something you feel will be useful after the course's end?",
					"Did the instructor make the material relevant to contemporary life?"
				]
			},
			teacher: {
				Approachable: [
					"Are you able to ask the instructor about questions without worry?",
					"Does the instructor make office hours available and plentiful?",
					"Does the instructor respond to questions and concerns quickly and openly?"
				], 
				Innovative: [
					"Does the instructor make their own assignments and tasks?",
					"Does the instructor avoid relying on the coursebook, if there is one?",
					"Does the instructor vary their teaching to suit their current students?"
				], 
				Inspirational: [
					"Does the instructor demonstrate their field of expertise?",
					"Do you feel motivated by the enthusiasm the instructor shows?",
					"Is a love for the material and the field still obvious?"
				], 
				Instructive: [
					"Does the instructor teach their material in an approachable way?",
					"Do you feel that the instructor enjoys teaching and the material they teach?",
					"Does the instructor teach outside the class as well?"
				],
				Skillful: [
					"Does the instructor demonstrate clear ability in the field they're teaching?",
					"Does the instructor have accredidation or acadamic honors to their name?",
					"Is the instructor outstanding in their field, renowned for anything?"
				], 
				Strict: [
					"Does the instructor have firm boundaries around acceptable behavior?",
					"Does the instructor limit learning aids and tools, in and out of tests?",
					"Does the instructor have limited makeup policies, or filter their students?"
				]
			}
		}
		return {
			guidedQuestions: guidedQuestions,
			tab: 0,
			radios: [
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1]
			]
		}
	},
	computed: {
		tabHeaders() {
			return getDefaultMatrixOrder()[this.type];
		}
	},
	methods: {
		saveButton() {
			if (this.tab < 6) this.tab++;
			for (let i=0; i<this.tabHeaders.length; i++) {
				this.matrix[this.tabHeaders[i]] = this.radiosToScore(this.radios[i])
			}
		},
		radiosToScore(radios) {
			let average = 0;
			let conversion = { 0: 1, 1: 3, 2: 6 };
			for (let radio of radios) {
				average += conversion[radio];
			}
			return average / 3;
		}
	}
}
</script>

<style>
.v-slide-group__prev {
	display: none !important;
}

.v-input--radio-group__input {
	display: flex;
	justify-content: center;
}
</style>