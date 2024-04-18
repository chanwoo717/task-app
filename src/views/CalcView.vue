<template>
    <div class="calc-body">
        <CalcApp/>
    </div>
</template>

<script>
import CalcApp from '../components/CalcApp.vue';

    export default {
        name:'CalcView',
        components: {
            CalcApp,
        },
    }
</script>

<style lang="scss" scoped>

.calc-body{
    height: 75vh;
}

</style>