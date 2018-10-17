<template>
    <form :action="$router.resolve({to: '/'}).href" method="post">
        <text-input id="username"
                    name="username"
                    :label="$t('forms.login.username.label')"
                    :placeholder="$t('forms.login.username.placeholder')"
                    :hint="$t('forms.login.username.hint')"
                    required
        />
        <password-input id="passwd"
                    name="password"
                    :label="$t('forms.login.password.label')"
                    :placeholder="$t('forms.login.password.placeholder')"
                    :hint="$t('forms.login.password.hint')"
                    required
        />

        <small>
            <router-link to="/">
                {{ $t('forms.login.lost_password.link') }}
            </router-link>
        </small>
        &mdash;
        <submit-button>{{ $t('forms.login.submit.label') }}</submit-button>
    </form>
</template>


<script>
    import TextInput from './Form/Element/TextInput';
    import PasswordInput from './Form/Element/PasswordInput';
    import SubmitButton from "./Form/Element/SubmitButton";

    export default {
        name: 'Login',
        components: {
            SubmitButton,
            TextInput,
            PasswordInput
        }
    }
</script>