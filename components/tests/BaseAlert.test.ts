import { mount } from '@vue/test-utils';
import BaseAlert from '../BaseAlert.vue';

describe('BaseAlert', () => {
  it('renders the component with default props and message', () => {
    const wrapper = mount(BaseAlert, {
      props: {
        message: 'Error message'
      }
    });

    expect(wrapper.text()).toContain('Error message');
  });

  it('renders the header when using slots', () => {
    const wrapper = mount(BaseAlert, {
      slots: {
        content: 'Custom content'
      }
    });

    expect(wrapper.text()).toContain('Custom content');
  });
});