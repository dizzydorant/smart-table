import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // Создаем компаратор специально для поиска
  const compare = createComparison(
    ["skipEmptyTargetValues"], // Стандартное правило: если поиск пуст, не фильтруем
    [
      // Кастомное правило для поиска по нескольким полям данных
      rules.searchMultipleFields(
        searchField,
        ["date", "customer", "seller"], // Поля, в которых ищем
        false, // case-insensitive (регистр не важен)
      ),
    ],
  );

  return (data, state) => {
    // Если данных нет или поиск не нужен, возвращаем исходный массив
    if (!data) return [];

    // Фильтруем массив: оставляем только те строки (row),
    // которые проходят проверку компаратора против текущего состояния (state)
    return data.filter((row) => compare(row, state));
  };
}
