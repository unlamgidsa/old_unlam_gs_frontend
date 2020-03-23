import LoginForm from './loginForm.vue';
import Vue from 'vue';

export default function showForm(openmct) {
	let element = new Vue({
		provide: {openmct},
		components: {LoginForm},
		template: '<LoginForm></LoginForm>'
	}).$mount().$el;
	openmct.overlays.overlay({
		element: element,
		size: 'fit',
	});

}
