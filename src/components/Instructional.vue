<template>
	<v-carousel height="700"
		hide-delimiter-background
		show-arrows-on-hover >
		<v-carousel-item v-for="(content, index) of carouselContent" :key="index">
			<v-sheet color="blue lighten-1" height="100%" align="center" justify="center">
				<v-row class="fill-height py-8" 
					style="max-width: 70%;" 
					align="center" 
					justify="center" >
					<div><h2>{{ content[0] }}</h2></div>
					<div style="width: 100%;" v-if="index === 2">
						<v-slider v-model="testMatrix.course['Fast-paced']"
							ticks="always" 
							tick-size="8" 
							min="1"
							max="6"
							prepend-icon="Slow"
							append-icon="Fast"></v-slider>
					</div>
					<v-card light v-if="index === 3">
						<Matrix :matrix="testMatrix.course" :type="'course'" />
					</v-card>
					<MatrixEditor :matrix="testMatrix.course" :type="'course'" v-if="index === 4" />
					<div v-if="content[1]"><h2>{{ content[1] }}</h2></div>
				</v-row>
			</v-sheet>
		</v-carousel-item>
		
		<!-- <v-carousel-item>
			<v-sheet color="blue lighten-1" height="100%" align="center" justify="center">
				<v-row class="fill-height" style="max-width: 70%;" align="center" justify="center">
					<div><h2>Each point of the hexagon represents a different factor, and how full the hexagon is at that point describes how much that element is present.</h2></div>
				</v-row>
			</v-sheet>
		</v-carousel-item>

		<v-carousel-item>
			<v-sheet color="blue lighten-1" height="100%" align="center" justify="center">
				<v-row class="fill-height pb-8" style="max-width: 70%;" align="center" justify="center">
					<div><h2>Try thinking about the last language course you took. Was it fast-paced, or slow?</h2></div>
					<div style="width: 100%;">
						<v-slider v-model="testMatrix.course['Fast-paced']"
							ticks="always" 
							tick-size="8" 
							min="1"
							max="6"
							prepend-icon="Slow"
							append-icon="Fast"></v-slider>
					</div>
					<div><h2>Try adjusting the slider to how you think it was.</h2></div>
				</v-row>
			</v-sheet>
		</v-carousel-item>

		<v-carousel-item>
			<v-sheet color="blue lighten-1" height="100%" align="center" justify="center">
				<v-row class="fill-height pb-8" style="max-width: 70%;" align="center" justify="center">
					<div><h2>All else being equal, here's what that would look like on the matrix.</h2></div>
					<v-card light>
						<Matrix :matrix="testMatrix.course" :type="'course'" />
					</v-card>
					<div><h2>The point you picked on that slider is represented in the top-left of the shape.</h2></div>
				</v-row>
			</v-sheet>
		</v-carousel-item>

		<v-carousel-item>
			<v-sheet color="blue lighten-1" height="100%" align="center" justify="center">
				<v-row class="fill-height pb-8" style="max-width: 70%;" align="center" justify="center">
					<div><h2>Want to keep playing with it? Give it a try!</h2></div>
					<MatrixEditor :matrix="testMatrix.course" :type="'course'" />
					<div><h2>And when you're done, scroll down to continue!</h2></div>
				</v-row>
			</v-sheet>
		</v-carousel-item> -->

	</v-carousel>
</template>

<script>
import { getDefaultMatrixSet } from "@/components/Matrix/matrices.js"

import Matrix from "@/components/Matrix/Matrix"
import MatrixEditor from "@/components/Matrix/MatrixEditor"

export default {
	components: {
		Matrix,
		MatrixEditor
	},
	data() {
		return {
			testMatrix: { },
			carouselContent: [
				["The \"Matrix\" in School Matrix refers to a customizable shape that describes what you like--and what you prefer--in your schools, courses and teachers."],
				["Each point of the hexagon represents a different factor, and how full the hexagon is at that point describes how much that element is present."],
				["Try thinking about the last language course you took. Was it fast-paced, or slow?", "Try adjusting the slider to how you think it was."],
				["All else being equal, here's what that would look like on the matrix.", "The point you picked on that slider is represented in the top-left of the shape."],
				["Want to keep playing with it? Give it a try!", "And when you're done, scroll down to continue!"]
			]
		}
	},
	beforeMount() {
		this.testMatrix = getDefaultMatrixSet();
	}
}
</script>

<style>
.v-input__prepend-outer {
	padding-right: 10px;
}
.v-input__append-outer {
	padding-left: 10px;
}
</style>