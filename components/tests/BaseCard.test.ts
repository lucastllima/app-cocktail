import { mount } from '@vue/test-utils';
import BaseCard from '../BaseCard.vue';

describe('BaseCard', () => {
  it('renders the component with default props and slot content', () => {
    const wrapper = mount(BaseCard, {
      slots: {
        default: 'Default Card Content'
      }
    });

    expect(wrapper.text()).toContain('Default Card Content');
  });

  it('renders the header when hideHeader is false', () => {
    const wrapper = mount(BaseCard, {
      props: {
        hideHeader: false
      }
    });

    expect(wrapper.find('.base-card__header').exists()).toBe(true);
  });

  it('does not render the header when hideHeader is true', () => {
    const wrapper = mount(BaseCard, {
      props: {
        hideHeader: true
      }
    });

    expect(wrapper.find('.base-card__header').exists()).toBe(false);
  });

  it('renders the footer when hideFooter is false', () => {
    const wrapper = mount(BaseCard, {
      props: {
        hideFooter: false
      }
    });

    expect(wrapper.find('.base-card__footer').exists()).toBe(true);
  });

  it('does not render the footer when hideFooter is true', () => {
    const wrapper = mount(BaseCard, {
      props: {
        hideFooter: true
      }
    });

    expect(wrapper.find('.base-card__footer').exists()).toBe(false);
  });
});