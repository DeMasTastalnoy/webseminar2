// const regions = [
//     {
//         name: "Тверская область",
//         cities: ["Тверь", "Ржев", "Кимры", "Вышний Волочек"]
//     },
//     {
//         name: "Московская область",
//         cities: ["Москва", "Химки", "Королёв", "Подольск"]
//     },
//     {
//         name: "Ленинградская область",
//         cities: ["Санкт-Петербург", "Гатчина", "Выборг", "Пушкин"]
//     }
//     // Можно добавить другие регионы
// ];
//
// module.exports = regions;


// document.addEventListener("DOMContentLoaded", () => {
//     const regions = {
//         "Тверская область": ["Тверь", "Ржев", "Кимры"],
//         "Московская область": ["Москва", "Химки", "Балашиха"],
//         "Ленинградская область": ["Санкт-Петербург", "Выборг", "Гатчина"]
//     };
//
//     const regionSelect = document.getElementById("region");
//     const citySelect = document.getElementById("city");
//
//     // Добавляем регионы в селект
//     Object.keys(regions).forEach(region => {
//         const option = document.createElement("option");
//         option.value = region;
//         option.textContent = region;
//         regionSelect.appendChild(option);
//     });
//
//     // Обработчик выбора региона
//     regionSelect.addEventListener("change", () => {
//         const selectedRegion = regionSelect.value;
//         citySelect.innerHTML = '<option value="">Не указано</option>'; // Сбрасываем список городов
//
//         if (selectedRegion && regions[selectedRegion]) {
//             citySelect.disabled = false;
//             regions[selectedRegion].forEach(city => {
//                 const option = document.createElement("option");
//                 option.value = city;
//                 option.textContent = city;
//                 citySelect.appendChild(option);
//             });
//         } else {
//             citySelect.disabled = true;
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const regions = {
        "Тверская область": ["Тверь", "Ржев", "Вышний Волочёк"],
        "Московская область": ["Москва", "Химки", "Подольск"],
        "Ленинградская область": ["Санкт-Петербург", "Гатчина", "Выборг"]
    };

    const regionSelect = document.getElementById("region");
    const citySelect = document.getElementById("city");

    // Заполняем список регионов
    Object.keys(regions).forEach(region => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });

    // Обработчик выбора региона
    regionSelect.addEventListener("change", function () {
        const selectedRegion = regionSelect.value;
        citySelect.innerHTML = '<option value="">Не указано</option>'; // Очищаем список городов
        citySelect.disabled = !selectedRegion; // Делаем список активным только при выборе региона

        if (selectedRegion && regions[selectedRegion]) {
            regions[selectedRegion].forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });
});

