<template>
  <TopLevelLayout>

    <div class="limited-payment-methods-view">

      <LimitedPaymentMethodForm class="limited-payment-methods-view__form"/>

      <UiLoader v-if="isLoading"/>
      <div v-else>
        <LimitedPaymentMethodCard
          v-for="method in limitedPaymentMethods"
          :key="method.name"
          :method="method"
          class="limited-payment-methods-view__method-card"
        />
      </div>

    </div>
  </TopLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import { LazyInject } from '@/core/ioc';
  import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';
  import { ListLimitedPaymentMethodsUseCase } from '@/core/use-case/limited-payment-method/list.use-case';

  import TopLevelLayout from '@/app/layouts/TopLevelLayout.vue';
  import UiLoader from '@/app/ui-kit/UiLoader.vue';
  import LimitedPaymentMethodForm from './components/LimitedPaymentMethodForm.vue';
  import LimitedPaymentMethodCard from './components/LimitedPaymentMethodCard.vue';

  @Component({
    components: {
      UiLoader,
      TopLevelLayout,
      LimitedPaymentMethodForm,
      LimitedPaymentMethodCard,
    },
  })
  export default class LimitedPaymentMethodsView extends Vue {

    public isLoading = true;

    @State(state => state.limitedPaymentMethods.limitedPaymentMethods)
    public limitedPaymentMethods: LimitedPaymentMethodEntity[];

    @LazyInject(ListLimitedPaymentMethodsUseCase)
    private listLimitedPaymentMethodsUseCase: ListLimitedPaymentMethodsUseCase;

    public async created() {
      await this.listLimitedPaymentMethodsUseCase.perform();
      this.isLoading = false;
    }

  }
</script>


<style scoped lang="scss">
  .limited-payment-methods-view {

    @include UiPadding(lg, bottom);

    &__method-card {
      @include UiMargin(md, top);
    }

  }
</style>
