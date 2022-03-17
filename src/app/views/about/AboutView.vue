<template>
  <SecondLevelLayout backUrl="/" title="About">

    <div class="about-view">

      <UiLogo tag="span"/>
      <span class="about-view__version">{{appVersion}}</span>

      <h2 class="about-view__heading">vue-clean-architecture-boilerplate</h2>

      <p class="about-view__paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        cumque commodi illo aperiam at reiciendis quis laudantium dicta
        voluptate fuga omnis soluta ea quam, eaque odit ratione doloribus aliquid eum.
      </p>

    </div>
  </SecondLevelLayout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { LazyInject } from '@/core/ioc';
  import { ConfigService } from '@/core/service/config/config.service';

  import UiLogo from '@/app/ui-kit/UiLogo.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';
  import SecondLevelLayout from '@/app/layouts/SecondLevelLayout.vue';


  @Component({
    components: {
      SecondLevelLayout,
      UiLogo,
      UiResponsiveImage,
      UiButton,
      UiIcon,
    },
  })
  export default class AboutView extends Vue {

    @LazyInject(ConfigService)
    private configService: ConfigService;

    public get canShare(): boolean {
      // any is hack that allows typescript to compile this
      const nav = navigator as any;
      return Boolean(nav.share);
    }

    public get appVersion(): string {
      return process.env.VUE_APP_VERSION;
    }

    public onShareClick() {
      // any is hack that allows typescript to compile this
      const nav = navigator as any;
      nav.share({
        url: this.configService.frontendConfig.rootUrl,
        text: 'vue-clean-architecture-boilerplate',
        title: 'vue-clean-architecture-boilerplate',
      });
    }

  }
</script>


<style scoped lang="scss">
  .about-view {

    max-width: $grid-step * 150;

    &__heading {
      @include UiTypographyHeading3();
      @include UiMargin(md, bottom);
      @include UiMargin(md, top);
    }

    &__subheading {
      @include UiTypographyHeading4();
      @include UiMargin(sm, bottom);
      @include UiMargin(sm, top);
    }

    &__paragraph {
      @include UiMargin(xs, bottom);

      > b {
        @include UiMargin(xxs, bottom);
        @include UiPadding(xxxs, bottom);
        display: block;
        width: fit-content;
        font-weight: map_get($font-weight, bold);

        @include UiTheme() {
          border-bottom: 2px solid UiColor(shade-500);
        }
      }

      > code {
        @include UiTypographyModifyMonospace();
        @include UiPadding(xxs, left);
        @include UiPadding(xxs, right);
        @include UiBorderRadius(xs);
        display: inline-block;
        padding-top: 1px;
        padding-bottom: 1px;
        @include UiTheme() {
          background-color: UiColor(shade-400);
        }
      }

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

    &__image {
      @include UiMargin(sm, right);
      $size: $grid-step * 15;
      width: $size;
      height: $size;
      border-radius: $size / 2;
      flex-shrink: 0;

      @include UiMediaMobile() {
        @include UiMargin(xs, bottom, true);
      }
    }

    &__row {
      display: flex;

      @include UiMediaMobile() {
        flex-direction: column;
      }
    }

    &__button-icon {
      @include UiMargin(xxs, left);
    }

  }
</style>
