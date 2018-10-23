<template>
    <div>
       {{ $t('app.welcome_msg') }}

        <h2>{{ $t('welcome.greetings_list.title') }}</h2>

        <router-link :to="{name: 'create_greeting' }">
            {{ $t('forms.greetings_create.create.link') }}
        </router-link>

        <hr />
      <div style="text-align: center;">
        <h3>Store sample</h3>
        <p>Count cannot exceed 42, because it's The Answer.</p>
        <p>Count : {{ count }}</p>
        <p v-if="countIsTheAnswer">THIS IS THE ANSWER !!!</p>
        <button @click="askQuestion" style="border: 1px solid tomato; border-radius: 4px; padding: 5px 15px;">Ask question</button>
      </div>
    </div>
</template>

<script>
  import { INCREMENT_COUNT } from '../store/modules/sample/types'
  import API from '../services/api';

  // Sample for properties order
  export default {
    name: 'Welcome',
    computed: {
      count() {
        return this.$store.state.sample.count
      },
      countIsTheAnswer() {
        return this.$store.state.sample.count === 42
      }
    },
    methods: {
      askQuestion() {
        this.$store.dispatch(INCREMENT_COUNT)
      }
    },
    mounted() {
        API.greetings()
    }
  }
</script>


