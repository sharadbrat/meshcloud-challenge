<template>
  <UiCard class="method-card">
    <h3 class="method-card__heading" :title="method.name">
      {{method.name}}
    </h3>
  </UiCard>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';

  import UiCard from '@/app/ui-kit/UiCard.vue';


  @Component({
    components: {
      UiCard,
    },
  })
  export default class LimitedPaymentMethodCard extends Vue {

    @Prop({ required: true })
    public method: LimitedPaymentMethodEntity;

  }
</script>


<style scoped lang="scss">
  .method-card {
    @include UiPadding(sm);

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

  }
</style>
