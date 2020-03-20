<template>
<div class="c-indicator c-indicator--clickable icon-person s-status-caution">
    <span class="label c-indicator__label">
        <button @click="globalLoginEmit">Change user</button>
    </span>
</div>
</template>

<script>
export default {
    inject: ['openmct'],
    methods: {
        globalLoginEmit() {
            this.openmct.objectViews.emit('login');
            console.log("globalLoginEmit");
            
        }
    }
}
</script>
