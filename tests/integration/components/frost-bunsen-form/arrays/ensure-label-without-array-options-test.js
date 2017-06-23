import {expect} from 'chai'
import {describe, it} from 'mocha'

import selectors from 'dummy/tests/helpers/selectors'
import {setupFormComponentTest} from 'dummy/tests/helpers/utils'

describe('Integration: Component / frost-bunsen-form / array label without arrayOptions', function () {
  describe('without initial value', function () {
    setupFormComponentTest({
      bunsenModel: {
        properties: {
          foo: {
            items: {
              type: 'string'
            },
            type: 'array'
          }
        },
        type: 'object'
      },
      bunsenView: {
        cells: [
          {
            label: 'Test',
            model: 'foo'
          }
        ],
        type: 'form',
        version: '2.0'
      }
    })

    it('renders as expected', function () {
      const $headings = this.$(selectors.bunsen.section.heading)

      expect(
        $headings,
        'only has one section heading'
      )
        .to.have.length(1)

      expect(
        $headings.eq(0).text().trim(),
        'renders expected section heading'
      )
        .to.equal('Test')
    })
  })
})
