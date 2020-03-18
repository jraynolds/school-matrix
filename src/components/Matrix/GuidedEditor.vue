<template>
	<v-card>
		<v-tabs fixed-tabs v-model="tabs">
			<v-tab v-for="tab of tabHeaders" :key="tab">{{ tab }}</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tabs" class="pa-5 pb-0">
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

			}
		}
		return {
			guidedQuestions: guidedQuestions,
			tabHeaders: [],
			tabs: 0,
			radios: []
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
	},
	beforeMount() {
		this.tabHeaders = getDefaultMatrixOrder()[this.type];
		let radios = [];
		for (let i=0; i<6; i++) radios.push([1, 1, 1]);
		this.radios = radios;
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