const validation = new JustValidate('#about-us__form');

validation
  .addField('#about-us__name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Минимальное количетсво символов: 3',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Ошибка',
    },
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению',
    },
  ])

  .addField('#about-us__email', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению',
    },
    {
      rule: 'email',
      errorMessage: 'Введите корректыный email',
    },
  ]);
