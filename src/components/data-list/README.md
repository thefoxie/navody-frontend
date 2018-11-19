# Data list

## Introduction

## Guidance

Find out when to use the data list component in your service in the [GOV.UK Design System](https://design-system.service.gov.uk/components/data-list).

## Quick start examples

### Data list

[Preview this example in the Frontend review app](http://govuk-frontend-review.herokuapp.com/components/data-list/preview)

#### Markup

    <h2>DL - govuk-data list with actions and borders</h2>

    <dl class="govuk-data-list">

     <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Name</dt>
      <dd class="govuk-data-list__item">
        <span>
          Firstname Lastname
        </span>
      </dd>
      <dd class="govuk-data-list__action">
        <ul class="govuk-data-list__action-list">
          <li class="govuk-data-list__action-list-item"><a href="#">Edit</a></li>
          <li class="govuk-data-list__action-list-item"><a href="#">Delete</a></li>
        </ul>
      </dd>
     </div>

      <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Date of birth</dt>
      <dd class="govuk-data-list__item">
        <span>
          13/08/1980
        </span>
      </dd>
      <dd class="govuk-data-list__action">
        <ul class="govuk-data-list__action-list">
          <li class="govuk-data-list__action-list-item"><a href="#">Change</a></li>
        </ul>
      </dd>
     </div>

     <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Contact information</dt>
      <dd class="govuk-data-list__item">
        <span>
          email@email.com
        </span>
        <span>
          Address line 1<br>
          Address line 2<br>
          Address line 3<br>
          Address line 4<br>
          Address line 5
        </span>
      </dd>
      <dd class="govuk-data-list__action">
        <ul class="govuk-data-list__action-list">
          <li class="govuk-data-list__action-list-item"><a href="#">Edit</a></li>
          <li class="govuk-data-list__action-list-item"><a href="#">Delete</a></li>
        </ul>
      </dd>
     </div>

    </dl>

    <h2>DL - govuk-data list without actions or borders</h2>

    <dl class="govuk-data-list--no-border">

     <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Name</dt>
      <dd class="govuk-data-list__item">
        <span>
          Firstname Lastname
        </span>
      </dd>
     </div>

      <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Date of birth</dt>
      <dd class="govuk-data-list__item">
        <span>
          13/08/1980
        </span>
      </dd>
     </div>

     <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Contact information</dt>
      <dd class="govuk-data-list__item">
        <span>
          email@email.com
        </span>
        <span>
          Address line 1<br>
          Address line 2<br>
          Address line 3<br>
          Address line 4<br>
          Address line 5
        </span>
      </dd>
     </div>

    </dl>

    <h2>DL - govuk-data list with actions and borders – Action breaks onto new line on small screens</h2>

    <dl class="govuk-data-list govuk-data-list--action-break">

     <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Name</dt>
      <dd class="govuk-data-list__item">
        <span>
          Firstname Lastname
        </span>
      </dd>
      <dd class="govuk-data-list__action">
        <ul class="govuk-data-list__action-list">
          <li class="govuk-data-list__action-list-item"><a href="#">Edit</a></li>
          <li class="govuk-data-list__action-list-item"><a href="#">Delete</a></li>
        </ul>
      </dd>
     </div>

      <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Date of birth</dt>
      <dd class="govuk-data-list__item">
        <span>
          13/08/1980
        </span>
      </dd>
      <dd class="govuk-data-list__action">
        <ul class="govuk-data-list__action-list">
          <li class="govuk-data-list__action-list-item"><a href="#">Change</a></li>
        </ul>
      </dd>
     </div>

     <div class="govuk-data-list__row">
      <dt class="govuk-data-list__item govuk-data-list__item--definition">Contact information</dt>
      <dd class="govuk-data-list__item">
        <span>
          email@email.com
        </span>
        <span>
          Address line 1<br>
          Address line 2<br>
          Address line 3<br>
          Address line 4<br>
          Address line 5
        </span>
      </dd>
      <dd class="govuk-data-list__action">
        <ul class="govuk-data-list__action-list">
          <li class="govuk-data-list__action-list-item"><a href="#">Edit</a></li>
          <li class="govuk-data-list__action-list-item"><a href="#">Delete</a></li>
        </ul>
      </dd>
     </div>

    </dl>

#### Macro

    {% from "data-list/macro.njk" import govukDataList %}

    {{ govukDataList() }}

## Requirements

### Build tool configuration

When compiling the Sass files you'll need to define includePaths to reference the node_modules directory. Below is a sample configuration using gulp

    .pipe(sass({
      includePaths: 'node_modules/'
    }))

### Static asset path configuration

In order to include the images used in the components, you need to configure your app to show these assets. Below is a sample configuration using Express js:

    app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/assets')))

## Component options

Use options to customise the appearance, content and behaviour of a component when using a macro, for example, changing the text.

### Setting up Nunjucks views and paths

Below is an example setup using express configure views:

    nunjucks.configure('node_modules/govuk-frontend/components', {
      autoescape: true,
      cache: false,
      express: app
    })

## Contribution

Guidelines can be found at [on our Github repository.](https://github.com/alphagov/govuk-frontend/blob/master/CONTRIBUTING.md "link to contributing guidelines on our github repository")

## License

MIT