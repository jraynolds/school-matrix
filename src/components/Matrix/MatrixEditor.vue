<template>
	<v-card light style="width: 100%;">
		<v-tabs fixed-tabs v-model="tab">
			<v-tab>Guided</v-tab>
			<v-tab>Advanced</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item>
				<v-row class="flex-nowrap">
					<v-col class="d-flex justify-center align-center">
						<Matrix :matrix="matrix" :type="type" />
					</v-col>
					<v-col class="pr-6" style="max-width: 380px;">
						<GuidedEditor :matrix="matrix" :type="type" />
					</v-col>
				</v-row>
			</v-tab-item>
			
			<v-tab-item>
				<v-row class="flex-row flex-nowrap">
					<v-col class="d-flex flex-column flex-nowrap" align-self="center">
						<v-col>
							{{ matrixOrder[0] }}
							<v-slider :color="matrixColors.main" :track-color="matrixColors.light"
								v-model="matrix[matrixOrder[0]]"
								tick-size="4" 
								min="1"
								max="6"
								prepend-icon="1"
								append-icon="6" 
								dense />
						</v-col>
						<v-col>
							<Matrix :matrix="matrix" :type="type" />
						</v-col>
						<v-col>
							{{ matrixOrder[5] }}
							<v-slider :color="matrixColors.main" :track-color="matrixColors.light"
								v-model="matrix[matrixOrder[5]]"
								tick-size="4" 
								min="1"
								max="6"
								prepend-icon="1"
								append-icon="6" 
								dense />
						</v-col>
					</v-col>
					<v-col class="pr-8 d-flex flex-column" align-self="center" align="center" justify="center">
						<div v-for="item of matrixOrder.slice(1, 5)" :key="item">
							{{ item }}
							<v-slider :color="matrixColors.main" :track-color="matrixColors.light"
								v-model="matrix[item]"
								tick-size="4" 
								min="1"
								max="6"
								prepend-icon="1"
								append-icon="6" 
								dense />
						</div>
					</v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>

<script>
import { getDefaultMatrixOrder, getMatrixColors } from "@/components/Matrix/matrices.js"

import Matrix from "@/components/Matrix/Matrix"
import GuidedEditor from "@/components/Matrix/GuidedEditor"

export default {
	props: [ "matrix", "type" ],
	components: {
		Matrix,
		GuidedEditor
	},
	data() {
		return {
			tab: 1,
			matrixOrder: [],
			matrixColors: {}
		}
	},
	beforeMount() {
		this.matrixOrder = getDefaultMatrixOrder()[this.type];
		this.matrixColors = getMatrixColors()[this.type];
	}
}
</script>

<style>

</style>