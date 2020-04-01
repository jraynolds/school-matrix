<template>
	<v-card class="pa-2">
		<MatrixEditor :matrix="matrixable.matrix" 
			:type="type" />
		<v-row class="pl-6" style="width: 100%;">
			<v-col cols="12" class="justify-center d-flex">
				<v-card-title>How much did this {{ type }} fit your preferences?</v-card-title>
			</v-col>
			<v-col cols="12">
				<v-slider v-model="rating" tick-size="4" 
					ticks="always"
					step="1"
					min="1"
					max="6"
					prepend-icon="mdi-thumb-down-outline"
					append-icon="mdi-thumb-up-outline" 
					dense />
			</v-col>
			<v-col cols="12">
				<v-textarea v-model="ratingText" 
					label="Put your thoughts here." 
					rows="2" 
					prepend-icon="mdi-comment-outline">
				</v-textarea>
			</v-col>
		</v-row>
		<v-card-actions>
			<v-spacer />
			<v-btn color="primary" @click.stop="saveReview()">Save</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { addUserReview } from "@/scripts/dbActions.js"

import MatrixEditor from "@/components/Matrix/MatrixEditor"

export default {
	props: [ "matrixable", "type" ],
	components: {
		MatrixEditor
	},
	data() {
		return {
			rating: 3,
			ratingText: ""
		}
	},
	methods: {
		saveReview() {
			let review = { 
				comment: this.ratingText, 
				rating: this.rating, 
				matrix: this.matrixable.matrix, 
				user: this.$store.getters.user.email
			};
			review[this.type] = this.matrixable.id;
			addUserReview(this.type, review);
		}
	}
}
</script>

<style>

</style>