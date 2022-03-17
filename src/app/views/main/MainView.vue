<template>
  <TopLevelLayout>

    <div class="main-view">

      <UiLoader v-if="isLoading"/>

      <div v-else>
        <CustomerCard
          v-for="customer in customers"
          :key="customer.id"
          :customer="customer"
          class="main-view__customer-card"
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
  import { ListCustomersUseCase } from '@/core/use-case/customer/list.use-case';
  import { CustomerEntity } from '@/core/entity/customer';

  import TopLevelLayout from '@/app/layouts/TopLevelLayout.vue';
  import UiLoader from '@/app/ui-kit/UiLoader.vue';
  import CustomerCard from './components/CustomerCard.vue';

  @Component({
    components: {
      UiLoader,
      TopLevelLayout,
      CustomerCard,
    },
  })
  export default class MainView extends Vue {

    public isLoading = true;

    @State(state => state.customers.customers)
    public customers: CustomerEntity[];

    @LazyInject(ListCustomersUseCase)
    private listCustomersUseCase: ListCustomersUseCase;

    public async created() {
      await this.listCustomersUseCase.perform();
      this.isLoading = false;
    }

  }
</script>


<style scoped lang="scss">
  .main-view {

    @include UiPadding(lg, bottom);

    &__customer-card {
      @include UiMargin(md, bottom);
    }

  }
</style>
