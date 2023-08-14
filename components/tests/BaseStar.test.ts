import { mount } from '@vue/test-utils';
import BaseStar from '../BaseStar.vue';

describe('BaseStar', () => {
  it('renders an empty star when not filled', () => {
    const wrapper = mount(BaseStar);

    expect(wrapper.find('svg').classes()).toContain('text-gray-300');
    expect(wrapper.find('svg').classes()).not.toContain('text-yellow-300');
  });

  it('renders a filled star when filled prop is true', () => {
    const wrapper = mount(BaseStar, {
      props: {
        filled: true
      }
    });

    expect(wrapper.find('svg').classes()).toContain('text-yellow-300');
    expect(wrapper.find('svg').classes()).not.toContain('text-gray-300');
  });
});