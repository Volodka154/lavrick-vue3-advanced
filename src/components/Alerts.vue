<template>
    <div class="alerts-container position-fixed top-0 end-0 ">
        <transition-group class="d-flex flex-column gap-2"
                          name="list" 
                          tag="div"
        >
            <div class="alert alert-warning shadow-sm rounded-3"
                 v-for="alert in alerts"
                 :key="alert.id"
            >
                    <span>{{ alert.text }}</span>
                    <span v-if="!alert.timeout">
                        <br></br>
                        <span>Вы можете </span>
                        <a href>
                            обновить страницу
                        </a>
                    </span>
                    <button
                        type="button"
                        class="btn-close btn-sm ms-auto position-absolute top-0 end-0 m-1"
                        @click="removeAlert(alert)"
                    ></button>
            </div>
        </transition-group>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters('alerts', { alerts: 'all' })
        },
        methods: {
            ...mapActions("alerts", { removeAlert: "remove"}),
		}

    }
</script>

<style scoped>
    .alerts-container {
        z-index: 100;
        margin: 0.5rem;
        width: 300px;
        transition: all 0.5s ease-in-out;
    }
    .alert {
        margin: 0;
        width: 100%;
    }
    .alert.alert-warning button:focus,
    .alert.alert-warning button:active {
        box-shadow: 0 0 0 .25rem #664d0340;
    }

    .list-move, /* применять переход к движущимся элементам */
    .list-enter-active, .list-leave-active {
        transition: all 0.5s ease;
    }
    .list-enter-from {
        opacity: 0;
        transform: translateY(20px);
    }
    .list-leave-to {
        opacity: 0;
        transform: translateY(-60px);
    }
    /* убедитесь, что удаляющиеся элементы выведены из потока, чтобы анимации перемещения могли быть рассчитаны правильно. */
    .list-leave-active {
        position: absolute;
    }

</style>