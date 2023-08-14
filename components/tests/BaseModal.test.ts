import { mount } from '@vue/test-utils';
import BaseModal from '../BaseModal.vue';

describe('Modal', () => {
    it('renders modal with provided title', async () => {
        const wrapper = mount(BaseModal, {
        propsData: {
            modalOpen: true,
            title: 'Custom Title'
        },
        slots: {
            default: 'Modal content goes here.'
        }
        });

        expect(wrapper.find('.base-modal__header h3').text()).toBe('Custom Title');
    });

    it('renders modal content', async () => {
        const wrapper = mount(BaseModal, {
        propsData: {
            modalOpen: true,
        },
        slots: {
            default: 'Custom Modal Content'
        }
        });

        expect(wrapper.find('.base-modal__content').text()).toBe('Custom Modal Content');
    });

    it('emits close event when overlay is clicked', async () => {
        const wrapper = mount(BaseModal, {
        propsData: {
            modalOpen: true
        },
        slots: {
            title: 'Test Modal',
            default: 'Modal content goes here.'
        }
        });

        await wrapper.find('.base-modal').trigger('click');

        expect(wrapper.emitted('on:close')).toBeTruthy();
    });
  
    it('emits close event when overlay is clicked', async () => {
        const wrapper = mount(BaseModal, {
            props: {
            modalOpen: true
            },
            slots: {
            title: 'Test Modal',
            default: 'Modal content goes here.'
            }
        });

        await wrapper.find('.base-modal').trigger('click');

        expect(wrapper.emitted('on:close')).toBeTruthy();
    });

    it('does not emit close event when modal content is clicked', async () => {
        const wrapper = mount(BaseModal, {
        propsData: {
            modalOpen: true
        },
        slots: {
            title: 'Test Modal',
            default: 'Modal content goes here.'
        }
        });

        await wrapper.find('.base-modal__content').trigger('click');

        // Modal should not be closed
        expect(wrapper.emitted('on:close')).toBeFalsy();
    });
});
// import { mount } from '@vue/test-utils';
// import BaseModal from '../BaseModal.vue';

// describe('BaseModal', () => {
//   it('opens and closes the modal', async () => {
//     const wrapper = mount(BaseModal, {
//       props: {
//         modalOpen: true
//       },
//       slots: {
//         title: 'Test Modal',
//         default: 'Modal content goes here.'
//       }
//     });

//     // Modal should be open
//     expect(wrapper.find('.base-modal__active').exists()).toBe(true);

//     // Click on close button
//     await wrapper.find('.modal__close-button').trigger('click');

//     // Modal should be closed
//     expect(wrapper.find('.base-modal__active').exists()).toBe(false);
//   });

//   it('emits close event when overlay is clicked', async () => {
//     const wrapper = mount(BaseModal, {
//       props: {
//         modalOpen: true
//       },
//       slots: {
//         title: 'Test Modal',
//         default: 'Modal content goes here.'
//       }
//     });

//     await wrapper.find('.modal-overlay').trigger('click');

//     expect(wrapper.emitted('on:close')).toBeTruthy();
//   });

//   it('does not close when modal content is clicked', async () => {
//     const wrapper = mount(BaseModal, {
//       props: {
//         modalOpen: true
//       },
//       slots: {
//         title: 'Test Modal',
//         default: 'Modal content goes here.'
//       }
//     });

//     await wrapper.find('.modal-content').trigger('click');

//     // Modal should not be closed
//     expect(wrapper.find('.modal-fade-enter-active').exists()).toBe(true);
//   });
// });