<template>
    <div class="slider">
        <slot></slot>
    </div>
</template>
<script>
export default {
     props: ['slideinit', 'pages'],
}
</script>