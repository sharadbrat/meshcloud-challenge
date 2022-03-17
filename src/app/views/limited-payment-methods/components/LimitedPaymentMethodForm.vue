<template>
  <UiCard class="limited-payment-method-form">
    <h2 class="limited-payment-method-form__heading">
      Create limited payment method
    </h2>
    <form @submit="onFormSubmit">

      <label class="limited-payment-method-form__input">
        <span class="limited-payment-method-form__input-label">Customer identifier</span>
        <UiInput v-model="customerIdentifier" required="true" placeholder="Insert customer identifier"/>
      </label>

      <label class="limited-payment-method-form__input">
        <span class="limited-payment-method-form__input-label">Payment identifier</span>
        <UiInput v-model="paymentIdentifier" required="true" placeholder="Insert payment identifier"/>
      </label>

      <label class="limited-payment-method-form__input">
        <span class="limited-payment-method-form__input-label">Name</span>
        <UiInput v-model="name" required="true" placeholder="Choose a name"/>
      </label>

      <label class="limited-payment-method-form__input">
        <span class="limited-payment-method-form__input-label">Amount (EUR)</span>
        <UiInput v-model="amount" required="true" type="number" placeholder="Specify the amount"/>
      </label>

      <label class="limited-payment-method-form__input">
        <span class="limited-payment-method-form__input-label">User Id</span>
        <UiInput v-model="userId" required="true" placeholder="Put here the user id"/>
      </label>

      <label class="limited-payment-method-form__input">
        <span class="limited-payment-method-form__input-label">Expiration Date</span>
        <UiInput v-model="expirationDate" required="true" type="date" placeholder="Put here the expiry date"/>
      </label>

      <h3 v-if="customAttributes.length" class="limited-payment-method-form__sub-heading">Custom attributes</h3>

      <div
        v-for="customAttribute in customAttributes"
        :key="customAttribute.id"
        class="limited-payment-method-form__custom-attribute"
      >
        <label class="limited-payment-method-form__input">
          <span class="limited-payment-method-form__input-label">Name</span>
          <UiInput v-model="customAttribute.name" placeholder="Specify name"/>
        </label>

        <label class="limited-payment-method-form__input">
          <span class="limited-payment-method-form__input-label">Value</span>
          <UiInput v-model="customAttribute.value" placeholder="Specify value"/>
        </label>

        <UiButton type="subdued" size="sm" width="shrink" @click="onCustomAttributeRemoveClick(customAttribute)">
          <UiIcon name="delete"/>
        </UiButton>
      </div>

      <UiButton type="secondary" size="sm" @click="onCustomAttributeAddClick">
        Add custom attribute
        <UiIcon name="add"/>
      </UiButton>

      <UiButton
        type="primary"
        buttonType="submit" width="block" class="limited-payment-method-form__submit"
        :disabled="!isFormAvailableForSubmit"
      >
        Create
        <UiIcon name="done"/>
      </UiButton>

    </form>
  </UiCard>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { generateUUID } from '@/core/utils/generate-uuid';
  import { LazyInject } from '@/core/ioc';
  import { CreateLimitedPaymentMethodUseCase } from '@/core/use-case/limited-payment-method/create.use-case';
  import { LimitedPaymentMethodEntity } from '@/core/entity/limited-payment-method';

  import UiCard from '@/app/ui-kit/UiCard.vue';
  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';


  interface CustomAttribute {
    id: string;
    name: string;
    value: string;
  }


  @Component({
    components: {
      UiCard,
      UiIcon,
      UiInput,
      UiButton,
    },
  })
  export default class LimitedPaymentMethodForm extends Vue {

    @LazyInject(CreateLimitedPaymentMethodUseCase)
    private createLimitedPaymentMethodUseCase: CreateLimitedPaymentMethodUseCase;

    public customerIdentifier: string = '';

    public paymentIdentifier: string = '';

    public name: string = '';

    public amount: number = 0;

    public userId: string = '';

    public expirationDate: string = '';

    public customAttributes: CustomAttribute[] = [];

    public get isFormAvailableForSubmit(): boolean {
      return this.customerIdentifier && this.paymentIdentifier && this.name && typeof this.amount === 'number'
        && this.userId && this.expirationDate && this.areAllCustomAttributesValid;
    }

    public get areAllCustomAttributesValid(): boolean {
      return this.customAttributes.every(el => el.name && el.value);
    }

    public onCustomAttributeRemoveClick(attribute: CustomAttribute) {
      this.customAttributes = this.customAttributes.filter(el => el.id !== attribute.id);
    }

    public onCustomAttributeAddClick(attribute: CustomAttribute) {
      this.customAttributes = [
        ...this.customAttributes,
        {
          id: generateUUID(),
          name: '',
          value: '',
        },
      ];
    }

    public onFormSubmit(event) {
      event.preventDefault();

      // TODO: check validity of custom attribute
      const entity = new LimitedPaymentMethodEntity({
        customerIdentifier: this.customerIdentifier,
        paymentIdentifier: this.paymentIdentifier,
        name: this.name,
        amount: this.amount,
        userId: this.userId,
        expirationDate: this.expirationDate,
        customAttributes: {},
      });

      this.createLimitedPaymentMethodUseCase.perform(entity);
    }

  }
</script>


<style scoped lang="scss">
  .limited-payment-method-form {
    @include UiPadding(sm);

    &__heading {
      @include UiTypographyHeading2();
      @include UiMargin(md, bottom);
    }

    &__sub-heading {
      @include UiTypographyHeading4();
      @include UiMargin(md, top);
      @include UiMargin(md, bottom);
    }

    &__custom-attribute {
      @include UiMargin(sm, bottom);
      display: flex;
      align-items: center;
      @include UiGap(sm);
    }

    &__input {
      display: flex;
      flex-direction: column;
      @include UiMargin(sm, bottom);
    }

    &__input-label {
      @include UiTypographyBody2();
      @include UiMargin(xxs, bottom);
    }

    &__submit {
      @include UiMargin(lg, top);
    }

  }
</style>
