<template>
	<div>
	<div class="example">{{ domainObject.name }}</div>
	<button @click="foo">Foo</button>
	</div>
</template>

<script>
export default {
	inject: ["domainObject", "openmct"],
	data () {
		return {
			msg: 'Hello world!'
		}
	},
	methods: {
		foo: function() {
			console.log(openmct);
		}
	}
}
</script>

<style>
.example {
	color: red;
}
</style>
