<template>
	<v-dialog
		v-model="dialogShown"
		max-width="650"
	>
		<UserReview :matrixable="reviewItem" :type="type" />
	</v-dialog>
</template>

<script>
import UserReview from "@/components/Review/UserReview"

export default {
	props: [ "reviewItem", "type" ],
	components: {
		UserReview
	},
	computed: {
		dialogShown: {
			get() {
				return this.$store.getters.getReviewDialogShown;
			},
			set(val) {
				this.$store.commit("SET_REVIEW_DIALOG_SHOWN", val);
			}
		}
	}
}
</script>

<style>

</style>