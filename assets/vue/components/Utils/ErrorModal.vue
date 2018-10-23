<template>
    <div>
        <modal v-if="showErrorModal" @close="showErrorModal = false">
            <h3 slot="header">{{ errorTitle }}</h3>
            <p slot="body">{{ errorText }}</p>
        </modal>
    </div>
</template>

<script>
import Modal from '../Common/Modal';
import EventBus from '../../services/eventbus';

export default {
    name: 'ErrorModal',
    data: function() {
        return {
            showErrorModal: false,
            errorTitle: "Error 500",
            errorText: "Something bad happened :("
        }
    },
    components: {
        Modal
    },
    created() {
        EventBus.$on('app-error', (errorResponse) => {
            this.errorTitle = errorResponse.data.title;
            this.errorText = errorResponse.data.detail;
            this.showErrorModal = true;
            // TODO: show trace
        });
    }
}
</script>