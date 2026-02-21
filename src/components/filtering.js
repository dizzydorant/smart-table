// Настройка компаратора для локальной фильтрации

export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        }),
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    // код с обработкой очистки поля
    if (action && action.name === "clear") {
      // 1. Находим родительский контейнер кнопки, чтобы искать инпут именно внутри него
      const parent = action.parentElement;
      const input = parent.querySelector("input");

      if (input) {
        // 2. Сбрасываем визуальное значение в поле ввода
        input.value = "";

        // 3. Находим имя поля в state через атрибут data-field кнопки
        const fieldName = action.dataset.field;

        // 4. Сбрасываем значение в объекте состояния, чтобы фильтрация обновилась
        if (fieldName && fieldName in state) {
          state[fieldName] = "";
        }
      }
    }

    // @todo: #4.5 — отфильтровать данные, используя компаратор
    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          // ищем поля ввода в фильтре с непустыми данными
          filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query; // если в фильтре что-то добавилось, применим к запросу
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
