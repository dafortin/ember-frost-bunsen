import {expect} from 'chai'
import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {beforeEach, describe, it} from 'mocha'

import {
  expectBunsenTextareaRendererWithState,
  expectCollapsibleHandles,
  expectOnChangeState,
  expectOnValidationState,
  fillInBunsenTextareaRenderer
} from 'dummy/tests/helpers/ember-frost-bunsen'

import {setupFormComponentTest} from 'dummy/tests/helpers/utils'

describe('Integration: Component / frost-bunsen-form / renderer / textarea', function () {
  const ctx = setupFormComponentTest({
    bunsenModel: {
      properties: {
        foo: {
          type: 'string'
        }
      },
      type: 'object'
    },
    bunsenView: {
      cells: [
        {
          model: 'foo',
          renderer: {
            name: 'textarea'
          }
        }
      ],
      type: 'form',
      version: '2.0'
    }
  })

  it('renders as expected', function () {
    expectCollapsibleHandles(0)
    expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
    expectOnValidationState(ctx, {count: 1})
  })

  describe('when hideLabel is set to true in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            hideLabel: true,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {label: null})
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when hideLabel is set to false in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            hideLabel: false,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when cols defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            model: 'foo',
            renderer: {
              cols: 3,
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {
        cols: 3,
        label: 'Foo'
      })
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when label defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            label: 'FooBar Baz',
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {label: 'FooBar Baz'})
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when collapsible is set to true in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            collapsible: true,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(1)
      expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when collapsible is set to false in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            collapsible: false,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when placeholder defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            model: 'foo',
            placeholder: 'Foo bar',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {
        label: 'Foo',
        placeholder: 'Foo bar'
      })
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when rows defined in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            model: 'foo',
            renderer: {
              name: 'textarea',
              rows: 5
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {
        label: 'Foo',
        rows: 5
      })
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when form explicitly enabled', function () {
    beforeEach(function () {
      this.set('disabled', false)
      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when form disabled', function () {
    beforeEach(function () {
      this.set('disabled', true)
      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {
        disabled: true,
        label: 'Foo'
      })
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when property explicitly enabled in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            disabled: false,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when property disabled in view', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            disabled: true,
            model: 'foo',
            renderer: {
              name: 'textarea'
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {
        disabled: true,
        label: 'Foo'
      })
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when user inputs value', function () {
    const input = 'bar'

    beforeEach(function () {
      ctx.props.onValidation.reset()
      fillInBunsenTextareaRenderer('foo', input)
      return wait()
    })

    it('functions as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {
        label: 'Foo',
        value: `${input}`
      })
      expectOnChangeState(ctx, {foo: input})
      expectOnValidationState(ctx, {count: 1})
    })
  })

  describe('when field is required', function () {
    beforeEach(function () {
      ctx.props.onValidation.reset()

      this.set('bunsenModel', {
        properties: {
          foo: {
            type: 'string'
          }
        },
        required: ['foo'],
        type: 'object'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
      expectOnValidationState(ctx, {
        count: 1,
        errors: [
          {
            code: 'OBJECT_MISSING_REQUIRED_PROPERTY',
            params: ['foo'],
            message: 'Field is required.',
            path: '#/foo',
            isRequiredError: true
          }
        ]
      })
    })

    describe('when showAllErrors is false', function () {
      beforeEach(function () {
        ctx.props.onValidation.reset()
        this.set('showAllErrors', false)
        return wait()
      })

      it('renders as expected', function () {
        expectCollapsibleHandles(0)
        expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
        expectOnValidationState(ctx, {count: 0})
      })
    })

    describe('when showAllErrors is true', function () {
      beforeEach(function () {
        ctx.props.onValidation.reset()
        this.set('showAllErrors', true)
        return wait()
      })

      it('renders as expected', function () {
        expectCollapsibleHandles(0)
        expectBunsenTextareaRendererWithState('foo', {
          error: 'Field is required.',
          label: 'Foo'
        })
        expectOnValidationState(ctx, {count: 0})
      })
    })
  })

  describe('transforms', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            model: 'foo',
            renderer: {
              name: 'textarea'
            },
            transforms: {
              read: [
                {
                  from: '^Chris$',
                  regex: true,
                  to: 'Christopher'
                },
                {
                  from: 'Matt',
                  to: 'Matthew'
                }
              ],
              write: [
                {
                  from: '^Alexander$',
                  regex: true,
                  to: 'Alex'
                },
                {
                  from: 'Johnathan',
                  to: 'John'
                }
              ]
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    describe('value matches literal string read transform', function () {
      const input = 'Matt'

      beforeEach(function () {
        ctx.props.onValidation.reset()
        fillInBunsenTextareaRenderer('foo', input)
        return wait()
      })

      it('functions as expected', function () {
        expectCollapsibleHandles(0)
        expectBunsenTextareaRendererWithState('foo', {
          label: 'Foo',
          value: 'Matthew'
        })
        expectOnChangeState(ctx, {foo: input})
        expectOnValidationState(ctx, {count: 1})
      })
    })

    describe('value matches regex string read transform', function () {
      const input = 'Chris'

      beforeEach(function () {
        ctx.props.onValidation.reset()
        fillInBunsenTextareaRenderer('foo', input)
        return wait()
      })

      it('functions as expected', function () {
        expectCollapsibleHandles(0)
        expectBunsenTextareaRendererWithState('foo', {
          label: 'Foo',
          value: 'Christopher'
        })
        expectOnChangeState(ctx, {foo: input})
        expectOnValidationState(ctx, {count: 1})
      })
    })

    describe('applies literal string write transform', function () {
      beforeEach(function () {
        ctx.props.onValidation.reset()
        fillInBunsenTextareaRenderer('foo', 'Johnathan')
        return wait()
      })

      it('functions as expected', function () {
        expectCollapsibleHandles(0)
        expectBunsenTextareaRendererWithState('foo', {
          label: 'Foo',
          value: 'John'
        })
        expectOnChangeState(ctx, {foo: 'John'})
        expectOnValidationState(ctx, {count: 1})
      })
    })

    describe('applies regex string write transform', function () {
      beforeEach(function () {
        ctx.props.onValidation.reset()
        fillInBunsenTextareaRenderer('foo', 'Alexander')
        return wait()
      })

      it('functions as expected', function () {
        expectCollapsibleHandles(0)
        expectBunsenTextareaRendererWithState('foo', {
          label: 'Foo',
          value: 'Alex'
        })
        expectOnChangeState(ctx, {foo: 'Alex'})
        expectOnValidationState(ctx, {count: 1})
      })
    })
  })

  describe('when options passed in', function () {
    beforeEach(function () {
      this.set('bunsenView', {
        cells: [
          {
            model: 'foo',
            renderer: {
              name: 'textarea',
              options: {
                bar: true,
                baz: 'spam',
                foo: 1,
                readonly: true
              }
            }
          }
        ],
        type: 'form',
        version: '2.0'
      })

      return wait()
    })

    it('renders as expected', function () {
      expectCollapsibleHandles(0)
      expectBunsenTextareaRendererWithState('foo', {label: 'Foo'})
      expectOnValidationState(ctx, {count: 1})
      expect($hook('bunsenForm-foo-input').prop('readonly')).to.equal(true)
    })
  })
})
