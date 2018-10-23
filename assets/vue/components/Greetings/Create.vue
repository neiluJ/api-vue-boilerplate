<template>
    <div>
        <v-form action="/greetings" method="post" @error="onError" @success="onSuccess">
            <text-input id="name"
                        name="name"
                        :label="$t('forms.greetings_create.title.label')"
                        :placeholder="$t('forms.greetings_create.title.placeholder')"
                        :hint="$t('forms.greetings_create.title.hint')"
            />

            <submit-button>{{ $t('forms.greetings_create.submit.label') }}</submit-button>
        </v-form>

        <router-link :to="{name: 'welcome' }">
            {{ $t('forms.greetings_create.back_home.link') }}
        </router-link>
    </div>
</template>


<script>
    import TextInput from '../Form/Element/TextInput';
    import SubmitButton from "../Form/Element/SubmitButton";
    import VForm from '../Form/Form';

    export default {
        components: {
            SubmitButton,
            TextInput,
            'v-form': VForm
        },
        methods: {
            /**
             * Error handler, triggered before showing the user error
             *
             * @param error Axios error object
             */
            onError(error) {
                console.error('Oops! They are form errors.');
            },

            /**
             * The Form's success handler:
             * -> Redirect to a page or do something?
             *
             * @param formData FormData JS object with submitted values
             */
            onSuccess(formData) {
                console.log('Form submitted with success !');
            }
        }
    }
</script>