import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    // Проверяем, существует ли целевой select-элемент в объекте elements
    if (elements[elementName]) {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          // Создаем новый элемент <option>
          const option = document.createElement("option");

          // Устанавливаем значение и видимый текст
          option.value = name;
          option.textContent = name;

          // Возвращаем готовую опцию для добавления в массив
          return option;
        }),
      );
    }
  });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === 'clear') {
    // 1. Находим родительский контейнер кнопки, чтобы искать инпут именно внутри него
    const parent = action.parentElement;
    const input = parent.querySelector('input');

    if (input) {
        // 2. Сбрасываем визуальное значение в поле ввода
        input.value = '';
        
        // 3. Находим имя поля в state через атрибут data-field кнопки
        const fieldName = action.dataset.field;
        
        // 4. Сбрасываем значение в объекте состояния, чтобы фильтрация обновилась
        if (fieldName && fieldName in state) {
            state[fieldName] = '';
        }
    }
}
    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter(row => compare(row, state));
  };
}
