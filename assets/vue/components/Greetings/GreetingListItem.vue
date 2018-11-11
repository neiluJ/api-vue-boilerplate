<template>
    <tr class="greeting-list-item">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td><a href="#">delete</a></td>
    </tr>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
                item: {}
            }
        },
        created() {
            console.log('list-item', this.item);
        }
    }
</script>