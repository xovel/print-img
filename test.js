'use strict'

const assert = require('assert')
const printImg = require('./print-img')

describe('printImg', () => {
  it('printImg is a function', () => {
    assert.equal('function', typeof printImg)
  })

  it('printImg has a defaults property', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(printImg, 'defaults'))
  })

  it('printImg.defaults is a object', () => {
    assert.equal('object', typeof printImg.defaults)
  })
})
