<template>
	<div class="c-indicator c-indicator--clickable icon-person s-status-caution">
		<span class="label c-indicator__label">
			<button @click="globalLoginEmit">{{ username }}</button>
			<button v-if="isLogged" class="icon-x" style="margin: auto;" @click="logOut"></button>
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
		},
		logOut() {
			this.isLogged = false;
			this.username = 'Change user';
			EventBus.$emit('username-logout', '');
		}
	},
	data() {
		return {
			username: 'Change user',
			isLogged: false
		};
	},
	mounted() {
		EventBus.$on('username', usr => {
			this.username = usr;
			this.isLogged = true;
		});
	}
}
</script>
