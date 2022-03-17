<template>
  <SecondLevelLayout backUrl="/about" title="Changelog">

    <div class="changelog-view">

      <UiLogo tag="span"/>
      <span class="changelog-view__version">{{appVersion}}</span>

      <h2 class="changelog-view__heading">v0.0.1</h2>

      <ul class="changelog-view__list">
        <li class="changelog-view__list-item">Start of the project.</li>
      </ul>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import UiLogo from '@/app/ui-kit/UiLogo.vue';
  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiLogo,
    },
  })
  export default class ChangelogView extends Vue {

    public get appVersion(): string {
      return process.env.VUE_APP_VERSION;
    }

  }
</script>


<style scoped lang="scss">
  .changelog-view {

    max-width: $grid-step * 150;

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
      @include UiMargin(md, top);
    }

    &__list {
      @include UiMargin(xs, bottom);
    }

    &__list-item {
      list-style-type: disc;
      list-style-position: inside;
    }

    &__version {
      @include UiMargin(xxxs, top);
      @include UiMargin(sm, bottom);
      @include UiTypographyBodySmall();
      display: block;

      @include UiTheme() {
        color: UiColor(shade-650);
      }
    }

  }
</style>
