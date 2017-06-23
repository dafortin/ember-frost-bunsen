/**
 * Performance test to make sure typing into forms is snappy
 */

import {expect} from 'chai'
import Ember from 'ember'
const {Logger, RSVP, run} = Ember
import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'

const MAX_TIMEOUT = 10000 // Travis CI can take a long time sometimes
const DEBUG_MSG = 'AbstractInput::didRender() called'

/**
 * Helper to simulate user typing a single character
 * @param {String} character - the character to type
 * @param {Selector} $input - the jQuery selector for the input to type into
 */
function typeCharacter (character, $input) {
  // set the value
  const previousValue = $input.val()
  $input.val(`${previousValue}${character}`)

  // trigger the change
  $input.trigger('input')
}

/**
 * Type a series of characters, one at a time
 * @param {String} text - the characters to type
 * @param {Selector} $input - the jQuery selector ofr the input to type into
 * @returns {RSVP.Promise} a promise resolved when all characters have been typed}
 */
function typeText (text, $input) {
  const promises = []
  text.split('').forEach((character) => {
    const promise = new RSVP.Promise(function (resolve) {
      run.later(this, () => {
        typeCharacter(character, $input)
        resolve()
      }, 1)
    })
    promises.push(promise)
  })

  return RSVP.Promise.all(promises)
    .then(() => wait())
}

/**
 * Get the value from the CodeMirror display of the value
 * @returns {Object} the JSON parsed object from the value output
 */
function getValue () {
  return JSON.parse(find('.demo-value .CodeMirror-code').text())
}

describe('Acceptance: Performance', function () {
  let application, sandbox

  this.timeout(MAX_TIMEOUT)

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    sandbox.stub(Logger, 'debug')
    Logger.debug.withArgs(DEBUG_MSG)
    application = startApp()
    server.loadFixtures()
    server.createList('node', 5)
  })

  afterEach(function () {
    sandbox.restore()
    destroyApp(application)
    application = null
    sandbox = null
  })

  describe('typing on a simple form', function () {
    let initialRenderCount

    beforeEach(function () {
      return visit('/examples?model=simple')
        .then(() => {
          initialRenderCount = Logger.debug.withArgs(DEBUG_MSG).callCount
          Logger.debug.reset()
          return typeText('abcdef', $hook('bunsenForm-lastName-input'))
        })
    })

    afterEach(function () {
      initialRenderCount = null
    })

    it('should have the full text', function () {
      const value = getValue()
      expect(value.lastName).to.equal('abcdef')
    })

    it('should re-render fewer times than initial render', function () {
      const count = Logger.debug.withArgs(DEBUG_MSG).callCount
      expect(count).to.be.below(initialRenderCount)
    })
  })

  describe('typing on a complex form', function () {
    let initialRenderCount

    beforeEach(function () {
      return visit('/examples?model=evc')
        .then(() => {
          initialRenderCount = Logger.debug.withArgs(DEBUG_MSG).callCount
          Logger.debug.reset()
          return typeText('abcdef', $hook('bunsenForm-createdAt-input'))
        })
    })

    afterEach(function () {
      initialRenderCount = null
    })

    it('should have the full text', function () {
      expect($hook('bunsenForm-createdAt-input').val()).to.equal('abcdef')
    })

    it('should re-render fewer times than initial render', function () {
      const count = Logger.debug.withArgs(DEBUG_MSG).callCount
      expect(count).to.be.below(initialRenderCount)
    })
  })
})
