<template>
    <div>
        <table>
            <thead slot="thead">
                <th v-for="(column, key) in columns" :class="column.cssClass + (ssort === key ? ' sorted' : '')">
                    <a href="#" v-if="isSortableColumn(column)" @click.prevent="changeSort(key)">
                        {{ column.name }}

                        <span v-if="ssort === key && ssortOrder === 'asc'">
                            &blacktriangle;
                        </span>
                        <span v-else-if="ssort === key && ssortOrder === 'desc'">
                            &blacktriangledown;
                        </span>
                    </a>
                    <span v-else>{{ column.name }}</span>
                </th>
            </thead>
            <slot></slot>
        </table>
        <Pagination v-if="showPagination" />
    </div>
</template>

<script>
    import Pagination from "./Pagination";
    import {ApiClient} from '../../services/http'

    export default {
        components: {
            Pagination
        },
        data () {
            return {
                ssort: this.sort,
                ssortOrder: this.sortOrder,
                watchHash: this.sort +':'+ this.sortOrder,
                loading: false,
                internal: false
            }
        },
        props: {
            pagination: {
                type: Boolean,
                default: false,
            },
            columns: {
                type: Object,
                default: {},
                required: true
            },
            sort: {
                type: String,
                default: null
            },
            sortable: {
                type: Boolean,
                default: true,
            },
            defaultSortColumn: {
                type: String,
                default: null,
            },
            defaultSortOrder: {
                type: String,
                default: 'asc',
                validator: function (value) {
                    return ['asc', 'desc'].indexOf(value) !== -1
                }
            },
            sortUrlParam: {
                type: String,
                default: 'sort',
            },
            sortOrderUrlParam: {
                type: String,
                default: 'order',
            },
            sortOrder: {
                type: String,
                default: 'asc',
                validator: function (value) {
                    return ['asc', 'desc'].indexOf(value) !== -1
                }
            },
            endPoint: {
                type: String,
                required: true
            },
            endPointOrderParam: {
                type: String,
                default: 'order'
            },
            updateNavigation: {
                type: Boolean,
                default: true,
            }
        },
        computed: {
            showPagination: function() {
                return this.pagination === true;
            },
            endPointUrl: function() {
                let url = this.endPoint;
                let queryString = new URLSearchParams();

                if ((true === this.sortable || this.ssort !== this.defaultSortColumn) &&
                    this.ssort !== null &&
                    this.columns.hasOwnProperty(this.ssort) &&
                    this.columns[this.ssort].sortable !== false
                )
                {
                    if (this.ssort !== this.defaultSortOrder || this.ssortOrder !== this.defaultSortOrder) {
                        let str = this.endPointOrderParam + '[' + (this.columns[this.ssort].sortKey ? this.columns[this.ssort].sortKey : this.ssort) +']';
                        queryString.append(str, this.ssortOrder);
                    }
                }

                return (!queryString.toString().length ? url : url +'?'+ queryString.toString());
            }
        },
        created() {
            this.bindQuery();
            this.loadData(true);
        },
        methods: {
            bindQuery() {
                if(!this.updateNavigation) {
                    return;
                }

                const query = this.getCurrentQueryFromUrl();
                this.ssort = (query.hasOwnProperty(this.sortUrlParam) ? query[this.sortUrlParam] : this.sort);
                this.ssortOrder = (query.hasOwnProperty(this.sortOrderUrlParam) ? query[this.sortOrderUrlParam] : this.sortOrder);
                this.watchHash = Date.now();
            },
            loadData(queryFromUrl, force) {
                if (true === this.loading && !force) {
                    return;
                }

                this.loading = true;
                this.$emit('loading');
                let routeQuery = this.getCurrentQuery();
                if (!queryFromUrl && true === this.updateNavigation) {
                    this.$router.push({name: this.$router.currentRoute.name, query: routeQuery});
                }

                ApiClient.get(this.endPointUrl, {
                    headers: {
                        'Accept': 'application/ld+json',
                    }
                })
                .then((resp) => {
                    let items = [];
                    resp.data["hydra:member"].forEach((item) => {
                        let currentItem = {};
                        for(var column in this.columns) {
                            const def = this.columns[column];
                            if (def.bound === false) {
                                continue;
                            }
                            if (def.itemKey !== undefined) {
                                currentItem[column] = item[def.itemKey];
                            } else if(def.itemValueFunc !== undefined && typeof(def.itemValueFunc) === "function") {
                                currentItem[column] = def.itemValueFunc.call(this, item)
                            } else {
                                currentItem[column] = item[column];
                            }
                        }
                        items.push(currentItem);
                    });
                    this.$emit('data', items);
                })
                .finally(() => {
                    this.loading = false;
                    this.$emit('end-loading');
                });
            },
            isSortableColumn(column) {
                return this.sortable && column.sortable !== false && column.bound !== false
            },
            getCurrentQuery() {
                let query = {};

                if (true === this.sortable) {
                    if (this.ssort !== this.defaultSortColumn) {
                        query[this.sortUrlParam] = this.ssort;
                    }
                    if (this.ssortOrder !== this.defaultSortOrder) {
                        query[this.sortOrderUrlParam] = this.ssortOrder;
                    }
                }

                return query;
            },
            getCurrentQueryFromUrl() {
                const loc = window.location.href;
                if (!loc.indexOf('?')) {
                    return {};
                }

                let urlParams = new URLSearchParams(loc.split('?')[1]);
                let query = {};

                if (true === this.sortable) {
                    if (urlParams.has(this.sortUrlParam) &&
                        this.columns.hasOwnProperty(urlParams.get(this.sortUrlParam)) &&
                        this.columns[urlParams.get(this.sortUrlParam)].sortable !== false
                    ) {
                        query[this.sortUrlParam] = urlParams.get(this.sortUrlParam);
                    }

                    if (urlParams.has(this.sortOrderUrlParam) && ['asc', 'desc', null].indexOf(urlParams.get(this.sortOrderUrlParam))) {
                        query[this.sortOrderUrlParam] = (urlParams.get(this.sortOrderUrlParam) === null ? 'asc' : urlParams.get(this.sortOrderUrlParam));
                    }
                }

                return query;
            },
            changeSort(columnKey) {
                if (!this.sortable || true === this.loading) {
                    return;
                }

                let toDir = (this.ssortOrder === 'asc' ? 'desc' : 'asc');
                if (this.ssort === columnKey) {
                    this.ssortOrder = toDir;
                } else {
                    this.ssort = columnKey;
                    this.ssortOrder = this.defaultSortOrder;
                }

                this.internal = true;
                this.watchHash = Date.now();
            }
        },
        watch: {
            watchHash: function() {
                if (this.loading) {
                    return;
                }

                this.loadData(!this.internal);
            },
            '$route.query': function() {
                if (this.internal || false === this.updateNavigation) {
                    this.internal = false;
                    return;
                }

                this.bindQuery();
            }
        }
    }
</script>