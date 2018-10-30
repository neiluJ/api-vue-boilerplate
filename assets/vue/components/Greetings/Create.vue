<template>
    <v-form action="/greetings" method="post" @error="onError" @success="onSuccess">
        <text-input id="name"
                    name="name"
                    :label="$t('forms.greetings_create.title.label')"
                    :placeholder="$t('forms.greetings_create.title.placeholder')"
                    :hint="$t('forms.greetings_create.title.hint')"
        />

        <checkbox id="testcheck"
                  name="testcheck"
                  :label="$t('forms.greetings_create.testcheck.label')"
                  :hint="$t('forms.greetings_create.testcheck.hint')"
        />

        <choice-radio name="radioChoice"
                     :label="$t('forms.greetings_create.radioChoice.label')"
                     :hint="$t('forms.greetings_create.radioChoice.hint')"
                     :choices="radioChoices"
                     required
        />

        <choice-select name="selectChoice"
                       id="selectChoice"
                      :label="$t('forms.greetings_create.selectChoice.label')"
                      :hint="$t('forms.greetings_create.selectChoice.hint')"
                      :choices="selectChoice"
                      required
        />

        <submit-button>{{ $t('forms.greetings_create.submit.label') }}</submit-button>

        <router-link :to="{name: 'welcome' }">
            {{ $t('forms.greetings_create.back_home.link') }}
        </router-link>
    </v-form>
</template>


<script>
    import TextInput from '../Form/Element/Text';
    import SubmitButton from "../Form/Element/SubmitButton";
    import VForm from '../Form/Form';
    import Checkbox from "../Form/Element/Checkbox";
    import ChoiceRadio from "../Form/Element/ChoiceRadio";
    import ChoiceSelect from "../Form/Element/ChoiceSelect";

    export default {
        components: {
            ChoiceSelect,
            ChoiceRadio,
            Checkbox,
            SubmitButton,
            TextInput,
            'v-form': VForm
        },
        data () {
            return {
                radioChoices: {
                    green: "Green",
                    yelloh: "Yelloh",
                    red: "Red",
                    black: "Black",
                },
                selectChoice: {
                    "": "---",
                    "The Rolling Stones": "The Rolling Stones",
                    "AC/DC": "AC/DC",
                    "ABBA": "ABBA"
                }
            }
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