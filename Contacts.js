const { createElement } = React

export class ContactForm extends React.Component {
  constructor() {
    super()
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    let { value, errors } = this.props
  
    return createElement(
      'form',
      {
        className: 'ContactForm',
        onSubmit: this.handleSubmit,
      },
      errors && errors.base && createElement(
        'div',
        { className: 'ContactForm-error' },
        errors.base
      ),
      createElement(
        'label',
        {},
        createElement('span', {}, "Name"),
        createElement(
          'input',
          {
            value: value.name || '',
            onChange: this.handleChangeName,
          },
        ),
        errors && errors.name && createElement(
          'div',
          { className: 'ContactForm-error' },
          errors.name
        )
      ),
      createElement(
        'label',
        {},
        createElement('span', {}, "E-mail"),
        createElement(
          'input',
          {
            value: value.email || '',
            onChange: this.handleChangeEmail,
          },
        ),
        errors && errors.email && createElement(
          'div',
          { className: 'ContactForm-error' },
          errors.email
        )
      ),
      createElement(
        'button',
        {
          onClick: this.handleClickAdd,
          className: 'ContactForm-save-button',
        },
        "Save"
      ),
      this.props.onClickCancel && createElement(
        'button',
        { onClick: this.props.onClickCancel },
        "Cancel",
      )
    )
  }
  
  handleChangeName(event) {
    this.props.onChange({
      ...this.props.value,
      name: event.target.value,
    })
  }
  
  handleChangeEmail(event) {
    this.props.onChange({
      ...this.props.value,
      email: event.target.value,
    })
  }
  
  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit()
  }
}

ContactForm.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}


export class Contact extends React.Component {
  constructor() {
    super()
    this.handleClickDelete = this.handleClickDelete.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
  }

  render() {
    let { email, id, name, error, photoURL, onClickDelete, onClickEdit, ...other } = this.props
    let names = name.split(' ')
    let initials = names.map(name => name[0].toUpperCase()).join('')

    return (
      createElement(
        'div',
        { className: 'Contact', ...other },
        createElement(
          'div',
          { className: 'Contact-avatar' },
          initials,
          photoURL && createElement(
            'img',
            { src: photoURL }
          ),
        ),
        createElement(
          'span',
          { className: 'Contact-name' },
          name
        ),
        createElement(
          'a',
          { href: 'mailto:'+email },
          email
        ),
        createElement(
          'div',
          { className: 'Contact-actions' }, 
          createElement(
            'button',
            {
              className: 'Contact-actions-edit',
              onClick: this.handleClickEdit,
            },
            "Edit"
          ),
          createElement(
            'button',
            {
              className: 'Contact-actions-delete',
              onClick: this.handleClickDelete,
            },
            "Delete"
          ),
          error && createElement(
            'span',
            {
              className: 'Contact-error',
            },
            error
          )
        )
      )
    )
  }
  
  handleClickDelete() {
    this.props.onClickDelete(this.props.id)
  }
  
  handleClickEdit() {
    this.props.onClickEdit(this.props.id)
  }
}

export function ContactList(props) {
  return createElement(
    'div',
    { className: 'ContactList' },
    createElement(
      'h2',
      { className: 'ContactList-title' },
      'Contacts',
      createElement(
        'button',
        {
          className: 'ContactList-refresh',
          onClick: props.onClickRefresh
        },
        "Refresh",
      )
    ),
    props.children
  )
}