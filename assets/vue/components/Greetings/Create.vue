<template>
    <div>
        <v-form action="/greetings" method="post">
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
        }
    }
</script>