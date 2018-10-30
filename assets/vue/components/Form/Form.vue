<template>
    <form v-bind="$attrs" @submit="onSubmit">
        <div  slot="errors">
            <ul class="form-errors" v-if="orphanViolations.length > 0">
                <li v-for="error in orphanViolations">{{ $t(error) }}</li>
            </ul>
        </div>

        <slot></slot>
    </form>
</template>


<script>
    import API from '../../services/api'

    export default {
        data: function() {
            return {
                hasViolations: false,
                orphanViolations: [],
                violationsElements: []
            }
        },
        methods: {
            /**
             * Handle submit of form using axios then parse eventual backend errors
             *
             * @param e submit event
             */
            onSubmit(e) {
                e.preventDefault();
                const formEl = e.target;
                const data = new FormData(formEl);

                this._resetViolations();

                API.submitForm(
                    formEl.getAttribute('action'),
                    formEl.getAttribute('method') || 'post',
                    data
                )
                .then(() => {
                    this.$emit('success', data);
                })
                .catch((err) => {
                    this.$emit('error', err);

                    if (err.response === undefined || err.response.status !== 400) {
                        return;
                        // todo do something with other error?
                    }

                    if (err.response.data !== undefined && err.response.data.violations !== undefined) {
                        this._dispatchViolations(err.response.data.violations);
                    } else if (err.response.data.detail !== undefined) {
                        this.hasViolations = true;
                        this.orphanViolations = [err.response.data.detail];
                    }
                });
            },
            /**
             * Removes previous violations
             *
             * @private
             */
            _resetViolations() {
                this.violationsElements.forEach(function(el) {
                   el.error = "";
                });
                this.violationsElements = [];
                this.orphanViolations = [];
                this.hasViolations = false;
            },
            /**
             * Dispatch violations to FormElement's
             *
             * @private
             * @param violations
             */
            _dispatchViolations(violations) {
                if (!violations || violations.length <= 0) {
                    this._resetViolations();
                    return;
                }

                this.hasViolations = true;
                let orphanViolations = [];
                violations.forEach((violation) => {
                    if (violation.propertyPath === undefined || violation.propertyPath.toString().length <= 0) {
                        orphanViolations.push(violation.message);
                        return;
                    }

                    const elements = document.getElementsByName(violation.propertyPath);
                    if (elements.length <= 0) {
                        orphanViolations.push(violation.message);
                    }

                    elements.forEach((el) => {
                       if (el.__vue__ === undefined && el.__vue__.$parent !== undefined) {
                           orphanViolations.push(violation.message);
                           return;
                       }

                        el.__vue__.$parent.error = violation.message;
                        this.violationsElements.push(el.__vue__.$parent);
                    });
                });

                if (orphanViolations.length) {
                    this.orphanViolations = orphanViolations;
                }
            }
        }
    }
</script>