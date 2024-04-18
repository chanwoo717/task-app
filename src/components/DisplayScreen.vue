<template>
    <div class="screen">
        {{value}}
    </div>
</template>

<script>
    export default {
        name: 'DisplayScreen',
        props: {
            value: {
                type: String,
                required: true
            },
        }
    }
</script>

<style lang="scss" scoped>

.screen{
    color: white;
    font-size: 3rem;
    text-align: right;
    width: 78%;
    margin: 0 auto;
    padding: 90px 20px 10px 0;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    overflow: hidden;
}

</style>