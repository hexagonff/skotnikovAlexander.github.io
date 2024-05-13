const validator = new JustValidate('#login-menu');

validator
  .addField('#login-login', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Минимальное количетсво символов: 3',
    },
    {
      rule: 'maxLength',
      value: 15,
      errorMessage: 'Ошибка',
    },
  ])

  .addField('#login-password', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению',
    },
    {
      rule: 'password',
      errorMessage: 'Минимальное количетсво символов: 8',
    },
    {
      rule: 'minLength',
      value: 8,
      errorMessage: 'Минимальное количетсво символов: 8',
    },



  ])

