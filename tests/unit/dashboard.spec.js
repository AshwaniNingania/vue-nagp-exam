import { shallowMount } from '@vue/test-utils'
import Dashboard from '@/views/Dashboard.vue'

function getDashboardWrapper() {
  const wrapper = shallowMount(Dashboard, {
    propsData: {},
  })
  return wrapper
}

describe('Dashboard.vue', () => {
    it('is a Vue instance', () => {
        const wrapper = getDashboardWrapper();
        expect(wrapper.isVueInstance).toBeTruthy();
    });
});
