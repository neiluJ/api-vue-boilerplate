<template>
    <form action="/api/login_check" method="post" @submit="onSubmit">
        <ul class="form-errors" v-if="error">
            <li>{{ error }}</li>
        </ul>

        <text-input id="username"
                    name="username"
                    :label="$t('forms.login.username.label')"
                    :placeholder="$t('forms.login.username.placeholder')"
                    :hint="$t('forms.login.username.hint')"
                    v-model="username"
                    required
        />
        <password-input id="passwd"
                    name="password"
                    :label="$t('forms.login.password.label')"
                    :placeholder="$t('forms.login.password.placeholder')"
                    :hint="$t('forms.login.password.hint')"
                    v-model="password"
                    required
        />

        <submit-button>{{ $t('forms.login.submit.label') }}</submit-button>
    </form>
</template>


<script>
    import TextInput from './Form/Element/Text';
    import PasswordInput from './Form/Element/Password';
    import SubmitButton from "./Form/Element/SubmitButton";
    import API from "../services/api";

    export default {
        name: 'Login',
        data: function() {
            return {
                username: null,
                password: null,
                error: null
            }
        },
        components: {
            SubmitButton,
            TextInput,
            PasswordInput
        },
        methods: {
            onSubmit(e) {
                e.preventDefault();

                console.log(this.username, this.password);

                this.error = null;

                API.sendLogin(this.username, this.password)
                .then(() => {
                    this.$emit('success', data);
                })
                .catch((err) => {
                    if (err.response === undefined || err.response.status === 500) {
                        alert('error 500 from backend');
                        return;
                        // todo do something with other error?
                    }

                    if (err.response.data !== undefined && err.response.data.error !== undefined) {
                        this.error = err.response.data.error.message;
                    } else {
                        console.log(err.response);
                    }
                });
            }
        }
    }
</script>