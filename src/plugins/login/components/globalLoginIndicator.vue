<template>
	<div class="c-indicator c-indicator--clickable icon-person s-status-caution">
		<span class="label c-indicator__label">
			<button @click="globalLoginEmit">{{ username }}</button>
		</span>
	</div>
</template>

<script>
import axios from 'axios';
import APIKey from '../api.js';
import showForm from '../form/form.js';
export default {
	inject: ['openmct'],
	methods: {
		globalLoginEmit() {
			axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APIKey(), {
				email: 'test4@test.com',
				password: '123456',
				returnSecureToken: true
			}).then(response => {
				this.username = response.data.email;
			});
			showForm(openmct);
		}
	},
	data() {
		return {
			username: 'Change user'
		};
	}
}
</script>
