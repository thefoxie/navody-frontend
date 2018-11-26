/* eslint-env jest */

const axe = require('../../../lib/axe-helper')

const { render, getExamples } = require('../../../lib/jest-helpers')

const examples = getExamples('data-list')

describe('Data list', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('data-list', examples.default)

    const results = await axe($.html(), {
      rules: {
        // In newer versions of the HTML specification wrapper
        // <div>s are allowed in a definition list
        'dlitem': { enabled: false },
        'definition-list': { enabled: false }
      }
    })
    expect(results).toHaveNoViolations()
  })
  it('renders classes', async () => {
    const $ = render('data-list', {
      classes: 'app-custom-class'
    })

    const $component = $('.govuk-data-list')
    expect($component.hasClass('app-custom-class')).toBeTruthy()
  })
  it('renders with attributes', () => {
    const $ = render('data-list', {
      attributes: {
        'data-attribute-1': 'value-1',
        'data-attribute-2': 'value-2'
      }
    })

    const $component = $('.govuk-data-list')
    expect($component.attr('data-attribute-1')).toEqual('value-1')
    expect($component.attr('data-attribute-2')).toEqual('value-2')
  })
  describe('rows', () => {
    describe('keys', () => {
      it('renders keys', async () => {
        const $ = render('data-list', {
          rows: [
            {
              key: 'Name'
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $definitionTerm = $component.find('dt.govuk-data-list__item')

        expect($definitionTerm.html()).toContain('Name')
      })
      it('renders classes', async () => {
        const $ = render('data-list', {
          keyClasses: 'app-custom-class',
          rows: [
            {
              key: 'Name'
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $definitionTerm = $component.find('dt.govuk-data-list__item')
        expect($definitionTerm.hasClass('app-custom-class')).toBeTruthy()
      })
    })
    describe('values', () => {
      it('renders text', async () => {
        const $ = render('data-list', {
          rows: [
            {
              text: 'Firstname Lastname'
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $definitionTerm = $component.find('dd.govuk-data-list__item')

        expect($definitionTerm.html()).toContain('Firstname Lastname')
      })
      it('renders html', async () => {
        const $ = render('data-list', {
          rows: [
            {
              html: '<span>email@email.com</span>'
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $definitionTerm = $component.find('dd.govuk-data-list__item')

        expect($definitionTerm.html()).toContain('<span>email@email.com</span>')
      })
      it('renders classes', async () => {
        const $ = render('data-list', {
          valueClasses: 'app-custom-class',
          rows: [
            {
              text: 'Firstname Lastname'
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $definitionTerm = $component.find('dd.govuk-data-list__item')
        expect($definitionTerm.hasClass('app-custom-class')).toBeTruthy()
      })
    })
    describe('actions', () => {
      it('renders href', async () => {
        const $ = render('data-list', {
          rows: [
            {
              actions: [
                {
                  href: 'https://www.gov.uk'
                }
              ]
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $actionLink = $component.find('.govuk-data-list__action-list-item a')

        expect($actionLink.attr('href')).toBe('https://www.gov.uk')
      })
      it('renders text', async () => {
        const $ = render('data-list', {
          rows: [
            {
              actions: [
                {
                  text: 'Edit'
                }
              ]
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $actionLink = $component.find('.govuk-data-list__action-list-item a')

        expect($actionLink.text()).toContain('Edit')
      })
      it('renders accessible name with context from key', async () => {
        const $ = render('data-list', {
          rows: [
            {
              key: 'Name',
              actions: [
                {
                  text: 'Edit'
                }
              ]
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $actionLink = $component.find('.govuk-data-list__action-list-item a')

        expect($actionLink.text()).toContain('Edit Name')
      })
      it('renders classes', async () => {
        const $ = render('data-list', {
          actionsClasses: 'app-custom-class',
          rows: [
            {
              actions: [
                {
                  text: 'Edit'
                }
              ]
            }
          ]
        })

        const $component = $('.govuk-data-list')
        const $actionList = $component.find('.govuk-data-list__action')

        expect($actionList.hasClass('app-custom-class')).toBeTruthy()
      })
    })
  })
})
