import Vue from 'vue';
import Router, { Route } from 'vue-router';

import PassThrough from '@/app/components/PassThrough.vue';
import MainView from '@/app/views/main/MainView.vue';
import SettingsView from '@/app/views/settings/SettingsView.vue';
import LimitedPaymentMethodsView from '@/app/views/limited-payment-methods/LimitedPaymentMethodsView.vue';

export class ApplicationRouter {

  private router: Router;

  public constructor() {
    Vue.use(Router);

    this.router = this.createRouter();
  }

  public getRouter() {
    return this.router;
  }

  private createRouter(): Router {
    const router = new Router({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: [
        {
          path: '',
          component: PassThrough,
          children: [
            {
              path: '',
              name: 'main',
              component: MainView,
            },
            {
              path: 'limited-payment-methods',
              name: 'limited-payment-methods',
              component: LimitedPaymentMethodsView,
            },
            {
              path: 'settings',
              name: 'settings',
              component: SettingsView,
            },
          ],
        },

        // redirect to app by default
        {
          path: '*',
          redirect: '/',
        },
      ],
    });

    router.afterEach((to, from) => this.onRouteChange(to, from));

    return router;
  }

  private onRouteChange(to: Route, from: Route) {
    if (!to.name || to.name === from.name) {
      return;
    }

    // scroll to the top
    document.body.scrollIntoView();
  }

}
