<template>
	<div class="c-indicator c-indicator--clickable icon-person s-status-caution">
		<span class="label c-indicator__label">
			<div v-if="isLogged">
				<span> {{ username }} </span>
				<button class="icon-x" style="margin: auto;" @click="logOut"></button>
			</div>
			<button v-else @click="globalLoginEmit">Change user</button>
		</span>
	</div>
</template>

<script>
import showForm from "../form/form.js";
import { EventBus } from "../event-bus.js";

export default {
	inject: ["openmct"],
	methods: {
		globalLoginEmit() {
			showForm(openmct);
		},
		logOut() {
			this.isLogged = false;
			this.username = "Change user";
			localStorage.setItem("userData", JSON.stringify({}));
			EventBus.$emit("logout", "");
		}
	},
	data() {
		return {
			username: "Change user",
			isLogged: false
		};
	},
	mounted() {
		let user = JSON.parse(localStorage.getItem("userData"));
		if (typeof user === "string") {
			this.username = user;
			this.isLogged = true;
		}
		EventBus.$on("login", usr => {
			this.username = usr;
			this.isLogged = true;
		});
	}
};
</script>
