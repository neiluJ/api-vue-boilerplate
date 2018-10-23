<template>
    <form v-bind="$attrs" @submit="onSubmit">
        <slot></slot>
    </form>
</template>


<script>
    import API from '../../services/api'

    export default {
        data: function() {
            return {
                hasViolations: false,
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

                this._resetViolations();

                API.submitForm(
                    formEl.getAttribute('action'),
                    formEl.getAttribute('method') || 'post',
                    new FormData(formEl)
                ).catch((err) => {
                    if (err.response === undefined || err.response.status !== 400) {
                        return;
                        // todo do something with other error?
                    }

                    if (err.response.data !== undefined && err.response.data.violations !== undefined) {
                        this._dispatchViolations(err.response.data.violations);
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

                let orphanViolations = [];
                violations.forEach((violation) => {
                    if (violation.propertyPath === undefined || violation.propertyPath.toString().length <= 0) {
                        orphanViolations.push(violation.message);
                        return;
                    }

                    const elements = document.getElementsByName(violation.propertyPath);
                    elements.forEach((el) => {
                       if (el.__vue__ === undefined && el.__vue__.$parent !== undefined) {
                           return;
                       }

                        el.__vue__.$parent.error = violation.message;
                        this.violationsElements.push(el.__vue__.$parent);
                    });
                });

                if (orphanViolations.length) {
                    // todo
                    console.error('there is more form errors: ', orphanViolations);
                }
            }
        }
    }
</script>