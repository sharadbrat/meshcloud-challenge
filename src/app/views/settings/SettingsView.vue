<template>
  <SecondLevelLayout backUrl="/" title="Settings">

    <div class="settings-view">

      <section class="settings-view__section">
        <h2 class="settings-view__heading">This is settings</h2>
        <p class="settings-view__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sequi
          consequuntur deserunt. Odit temporibus deserunt doloribus expedita
          quisquam, veniam labore quos esse saepe iste repellendus, cum quia ipsam asperiores aut.
        </p>
      </section>

      <section class="settings-view__section">
        <h2 class="settings-view__heading">Theme</h2>
        <UiRadio
          class="settings-view__theme-radio"
          :value="themes.DEFAULT"
          :model="theme"
          @change="onThemeChange"
        >
          Use OS default theme
        </UiRadio>
        <UiRadio
          class="settings-view__theme-radio"
          :value="themes.DARK"
          :model="theme"
          @change="onThemeChange"
        >
          Dark
        </UiRadio>
        <UiRadio
          class="settings-view__theme-radio"
          :value="themes.LIGHT"
          :model="theme"
          @change="onThemeChange"
        >
          Light
        </UiRadio>
      </section>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import { LazyInject } from '@/core/ioc';
  import { SetThemeUseCase } from '@/core/use-case/theme/set-theme.use-case';
  import { Theme } from '@/core/entity/theme';

  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiRadio from '@/app/ui-kit/UiRadio.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiButton,
      UiRadio,
    },
  })
  export default class SettingsView extends Vue {

    @LazyInject(SetThemeUseCase)
    public setThemeUseCase: SetThemeUseCase;

    @State(state => state.themes.theme)
    public theme: Theme;

    public readonly themes = Theme;

    public async onThemeChange(theme: Theme) {
      await this.setThemeUseCase.perform(theme);
    }

  }
</script>


<style scoped lang="scss">
  .settings-view {

    max-width: $grid-step * 150;

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
    }

    &__subheading {
      @include UiTypographyBody1();
      @include UiMargin(xxs, bottom);
    }

    &__section {
      @include UiMargin(md, bottom);
      @include UiPadding(md, bottom);
      &:not(:last-of-type) {
        @include UiTheme() {
          border-bottom: 1px solid UiColor(shade-400);
        }
      }
    }

    &__description {
      @include UiMargin(md, bottom);

      b {
        font-weight: map_get($font-weight, bold);
      }

      &_highlighted {
        @include UiBorderRadius(sm);
        @include UiPadding(xs);
        @include UiTheme() {
          background-color: UiColor(neutral-light);
          color: UiColor(neutral-dark);
        }
      }
    }

    &__delete {
      @include UiTheme() {
        border-color: UiColor(negative);
        color: UiColor(negative);
      }
    }

    &__delete-all {
      @include UiTheme() {
        background-color: UiColor(negative);
      }
    }

    &__delete-icon {
      @include UiMargin(xxs, right);
      margin-bottom: 2px;
    }

    &__danger-zone {
      @include UiBorderRadius(md);
      @include UiPadding(md);
      @include UiTheme() {
        border: 1px solid UiColor(negative-light);
      }
    }

    &__danger-zone-delimiter {
      @include UiMargin(md, top);
      @include UiMargin(md, bottom);
      @include UiTheme() {
        border-bottom: 1px solid UiColor(shade-400);
      }
    }

    &__import-button {
      @include UiMargin(sm, right);
      @include UiTheme() {
        color: UiColor(warning-dark);
        border-color: UiColor(warning);
      }
    }

    &__import-icon {
      @include UiMargin(xxs, right);
      margin-bottom: 2px;
    }

    &__import-label {
      @include UiTypographyBody2();
      @include UiMargin(xxs, bottom);
      @include UiMargin(sm, top);
      display: block;
    }

    &__export-radio {
      @include UiMargin(xxs, top);
    }

    &__theme-radio {
      @include UiMargin(xs, bottom);
    }

  }
</style>
