<template>
    <form action="/login" method="post">
        <text-input id="username"
                    name="username"
                    label="Username"
                    placeholder="enter your username"
                    hint="enter username or email address"
        />
        <password-input id="passwd"
                    name="password"
                    label="Password"
                    placeholder="enter your password"
                    hint="password should be at least 6 char. long"
        />
        <submit-button>Login</submit-button>
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
        },
        data: function() {
            return {}
        },
        created() {
            // blah
        },
        methods: {}
    }
</script>