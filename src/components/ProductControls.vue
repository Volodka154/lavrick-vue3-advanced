<template>
	<div>
		<button type="button" 
				class="btn btn-danger" 
				@click="remove({ id })"
				v-if="inCart"
				:disabled="isDisabledButton"
		>
			Remove
		</button>
		<button type="button" 
				class="btn btn-success" 
				@click="add({ id })"
				v-else
				:disabled="isDisabledButton"
		>
			Add to cart
		</button>
		<transition name="slide">
			<div v-if="inCart">
				<hr>
				<button type="button" 
							class="btn btn-warning"
							:disabled="isDisabledButton || cnt < 2"
							@click="setCnt({ id, cnt: cnt - 1})"
				>-</button>
				<strong class="mx-1">{{ cnt }}</strong>
				<button type="button" 
							class="btn btn-success"
							:disabled="isDisabledButton"
							@click="setCnt({ id, cnt: cnt + 1})"
				>+</button>
			</div>
		</transition>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		props: {
			id: Number
		},
		computed: {
			...mapGetters('cart', {
				inCartProxy: 'inCart', 
				inProccessProxy: 'inProccess',
				cntProxy: 'itemCnt'
			}),
			...mapGetters('alerts', { isCriticalError: 'isCriticalError' }),

			cnt(){
				return this.cntProxy(this.id);
			},
			inCart(){
				return this.inCartProxy(this.id);
			},
			inProccess(){
				return this.inProccessProxy(this.id);
			},
			isDisabledButton() {
				return this.inProccess || this.isCriticalError;
			}
		},
		methods: {
			...mapActions('cart', ['add', 'remove', 'setCnt'])
		}
	}
</script>