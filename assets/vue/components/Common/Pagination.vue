<template>
    <ul class="pagination">
        <slot>
            <li class="pagination-first" v-if="totalPages > 1">
                <a href="#" @click.prevent="onPageChange(1)" v-if="currentPage > 1">
                    {{ $t('pagination.first_page') }}
                </a>
                <span v-else>
                    {{ $t('pagination.first_page') }}
                </span>
            </li>
            <li class="pagination-previous" v-if="totalPages > 1">
                <a href="#" @click.prevent="onPageChange(currentPage-1)" v-if="currentPage > 1">
                    &larr;
                </a>
                <span v-else>
                    &larr;
                </span>
            </li>

            <li class="pagination-item" v-for="n in totalPages" :class="(page === n ? 'active' : '')">
                <a href="#" v-if="page !== n" @click.prevent="onPageChange(n)">
                    {{ n }}
                </a>
                <span v-else>{{ n }}</span>
            </li>

            <li class="pagination-next" v-if="totalPages > 1">
                <a href="#" @click.prevent="onPageChange(currentPage+1)" v-if="currentPage < totalPages">
                    &rarr;
                </a>
                <span v-else>
                    &rarr;
                </span>
            </li>
            <li class="pagination-last" v-if="totalPages > 1">
                <a href="#" @click.prevent="onPageChange(totalPages)" v-if="currentPage < totalPages">
                    {{ $t('pagination.last_page') }}
                </a>
                <span v-else>
                    {{ $t('pagination.last_page') }}
                </span>
            </li>
        </slot>
    </ul>
</template>

<script>
    export default {
        name: 'Pagination',
        props: {
            page: {
                default: 1
            },
            itemsPerPage: {
                default: 100
            },
            totalItems: {
                type: Number,
                default: 0
            },
            pageLimit: {
                default: 5
            }
        },
        data() {
            return {
                currentPage: this.page,
                totalPages: 1
            }
        },
        methods: {
            onPageChange(page) {
                if (page !== this.currentPage) {
                    this.currentPage = page;
                    this.$emit('page-change', page);
                }
            }
        },
        watch: {
            totalItems: function() {
                this.totalPages = Math.ceil(this.totalItems/this.itemsPerPage);
            },
            page: function(page) {
                this.currentPage = page;
            }
        }
    }
</script>