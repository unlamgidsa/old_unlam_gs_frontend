<template>
	<div class="c-indicator c-indicator--clickable icon-person s-status-caution">
		<span class="label c-indicator__label">
			<button @click="globalLoginEmit">{{ username }}</button>
		</span>
	</div>
</template>

<script>
import showForm from '../form/form.js';
import { EventBus } from '../event-bus.js';


export default {
	inject: ['openmct'],
	methods: {
		globalLoginEmit() {
			showForm(openmct);
		}
	},
	data() {
		return {
			username: 'Change user'
		};
	},
	mounted() {
		EventBus.$on('username', usr => {
				this.username = usr;
		});
	}
}
</script>
