<template>
  <UiCard class="customer-card">
    <h3 class="customer-card__heading" :title="customer.displayName">
      {{customer.displayName}}
    </h3>
    <div class="customer-card__section" v-if="customer.contactPerson">
      <h4 class="customer-card__sub-heading">Contact person</h4>
      <p>Name: {{customer.contactPerson.fullName}}</p>
      <p>Username: {{customer.contactPerson.username}}</p>
    </div>
    <div class="customer-card__section" v-if="customer.financialAdmins.length">
      <h4 class="customer-card__sub-heading">Financial admins</h4>
      <p>Name: {{customer.contactPerson.fullName}}</p>
      <p>Username: {{customer.contactPerson.username}}</p>
    </div>
    <span class="customer-card__id">{{customer.id}}</span>
  </UiCard>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import { CustomerEntity } from '@/core/entity/customer';

  import UiCard from '@/app/ui-kit/UiCard.vue';


  @Component({
    components: {
      UiCard,
    },
  })
  export default class CustomerCard extends Vue {

    @Prop({ required: true })
    public customer: CustomerEntity;

  }
</script>


<style scoped lang="scss">
  .customer-card {
    @include UiPadding(sm);

    &__sub-heading {
      @include UiTypographyHeading4();
      @include UiMargin(xxxs, bottom);
    }

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__section {
      @include UiTypographyBodyMid();
      @include UiMargin(sm, bottom);
    }

    &__id {
      @include UiTypographyBodySmall();
      @include UiTheme() {
        color: UiColor(shade-500);
      }
    }

  }
</style>
