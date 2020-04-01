<template>
	<v-container class="fill-height pt-10 pl-10">
		<v-row>
			<v-col cols="12"><h1>Your Reviews</h1></v-col>
		</v-row>
		<v-row v-for="(row, index) of rows" :key="index">
			<v-col cols="12"><h3>{{ row.title }} reviews</h3></v-col>
			<v-col class="d-flex justify-center" v-if="items[row.type].length > 0">
				<Card v-for="(item, subIndex) of items[row.type]" 
					:key="subIndex" :matrixable="item" 
					:type="row.type" 
					:startsCollapsed="true" 
					:isCollapsible="true"
					:reviewsAddable="false" />
			</v-col>
			<v-col class="d-flex justify-center" v-else>
				<v-btn>No reviews. Find a teacher and review them!</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { getUserReviewItems } from "@/scripts/dbActions.js"

import Card from "@/components/Card/Card"

export default {
	components: {
		Card
	},
	data() {
		return {
			rows: [
				{
					title: "School",
					type: "school"
				},
				{
					title: "Course",
					type: "course"
				},
				{
					title: "Teacher",
					type: "teacher"
				}
			],
			items: {
				school: [],
				course: [],
				teacher: []
			}
		}
	},
	mounted() {
		getUserReviewItems(this.$store.getters.user.id).then((items) => {
			// eslint-disable-next-line no-console
			console.log(items);
			this.items.school = items.schools;
			this.items.course = items.courses;
			this.items.teacher = items.teachers;
		});
	}
}
</script>

<style>

</style>