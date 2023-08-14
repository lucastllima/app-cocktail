import { mount } from '@vue/test-utils'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('renders the button with the correct styles and slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').classes()).toContain('bg-blue-500')
    expect(wrapper.text()).toBe('Click me')
  })

  it('disables the button when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      },
      props: {
        disabled: true
      }
    })

    const isDisabled = wrapper.find('button').attributes('disabled') === 'true'
    expect(isDisabled).toBe(true)
  })

  it('applies opacity when button is disabled', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      },
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('button').classes()).toContain('disabled:opacity-75')
  })
})