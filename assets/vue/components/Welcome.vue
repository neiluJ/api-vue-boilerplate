<template>
    <div>
       {{ $t('app.welcome_msg') }}

        <h2>{{ $t('welcome.greetings_list.title') }}</h2>

        <router-link :to="{name: 'create_greeting' }">
            {{ $t('forms.greetings_create.create.link') }}
        </router-link>

        <hr />

        <DynamicTable :columns="getColumnsDefinition()"
                      :sortable="true"
                      sort="id"
                      default-sort-column="id"
                      default-sort-order="asc"
                      end-point="/greetings"
                      :pagination="true"
                      :updateNavigation="true"
        />

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
  import DynamicTable from "./Common/DynamicTable";

  // Sample for properties order
  export default {
    name: 'Welcome',
      components: {DynamicTable},
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
      },
        getColumnsDefinition() {
            return {
                id: {
                    name: this.$t('greetings.columns.id'),
                    itemKey: 'id',
                    sortable: false,
                    cssClass: 'col-id'
                },
                name: {
                    name: this.$t('greetings.columns.name'),
                    cssClass: 'col-name'
                }
            };
        }
    },
    mounted() {
        // API.greetings()
    }
  }
</script>


