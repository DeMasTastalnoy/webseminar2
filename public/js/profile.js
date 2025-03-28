//
// const cities = {
//     "Московская область": ["Москва", "Химки", "Королёв", "Подольск"],
//     "Ленинградская область": ["Санкт-Петербург", "Гатчина", "Выборг", "Пушкин"],
//     "Тверская область": ["Тверь", "Ржев", "Кимры"]
// };
//
// const loadRegions = async (regionSelect, citySelect) => {
//     try {
//         const regions = Object.keys(cities);
//
//         regionSelect.innerHTML = "<option value=''>Не указано</option>";
//
//         regions.forEach(region => {
//             const option = document.createElement("option");
//             option.value = region;
//             option.textContent = region;
//             regionSelect.appendChild(option);
//         });
//
//         // Если регион уже выбран, сразу заполняем города
//         const selectedRegion = regionSelect.value;
//         if (selectedRegion && cities[selectedRegion]) {
//             citySelect.disabled = false;
//             cities[selectedRegion].forEach(city => {
//                 const option = document.createElement("option");
//                 option.value = city;
//                 option.textContent = city;
//                 citySelect.appendChild(option);
//             });
//         } else {
//             citySelect.disabled = true;
//         }
//     } catch (error) {
//         console.error("Ошибка при загрузке регионов:", error);
//     }
// };
//
// console.log("Содержимое cities:", cities);
//
// document.addEventListener("DOMContentLoaded", async () => {
//     const userData = document.getElementById("userData").dataset.user;
//     const user = JSON.parse(userData);
//     console.log("Code for values ", user);
//
//     const profileForm = document.getElementById("profileForm");
//     const regionSelect = document.getElementById("region");
//     const citySelect = document.getElementById("city");
//
//     // Загружаем список регионов
//     await loadRegions(regionSelect, citySelect);
//
//     // Если пользователь уже имеет данные, заполняем поля
//     if (user) {
//         regionSelect.value = user.region || '';
//         citySelect.value = user.town || '';
//     }
//
//     // Делаем города доступными, если выбран регион
//     if (user.region) {
//         citySelect.disabled = false;
//         loadCities(user.region, citySelect);
//     }
//
//     regionSelect.addEventListener("change", () => {
//         citySelect.innerHTML = "<option value=''>Не указано</option>"; // Очистка списка городов
//         const selectedRegion = regionSelect.value;
//
//         // Проверяем, загружены ли города для выбранного региона
//         if (selectedRegion && cities[selectedRegion]) {
//             citySelect.disabled = false;
//             cities[selectedRegion].forEach(city => {
//                 const option = document.createElement("option");
//                 option.value = city;
//                 option.textContent = city;
//                 citySelect.appendChild(option);
//             });
//         } else {
//             citySelect.disabled = true;
//         }
//     });
//
//     // Обработчик отправки формы
//     profileForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const region = regionSelect.value || "Не указано";
//         const town = citySelect.value || "Не указано";
//
//         const res = await fetch("/api/profile", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ region, town }),
//         });
//
//         if (res.ok) {
//             alert("Профиль успешно обновлен!");
//             window.location.href = "/dashboard";
//         } else {
//             alert("Ошибка обновления профиля");
//         }
//     });
// });

const cities = {
    "Московская область": ["Москва", "Химки", "Королёв", "Подольск"],
    "Ленинградская область": ["Санкт-Петербург", "Гатчина", "Выборг", "Пушкин"],
    "Тверская область": ["Тверь", "Ржев", "Кимры"]
};

const loadRegions = async (regionSelect) => {
    const regions = Object.keys(cities);
    regionSelect.innerHTML = "<option value=''>Не указано</option>";

    regions.forEach(region => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
};

const loadCities = (region, citySelect, selectedCity) => {
    citySelect.innerHTML = "<option value=''>Не указано</option>";

    if (region && cities[region]) {
        citySelect.disabled = false;
        cities[region].forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            if (city === selectedCity) {
                option.selected = true;
            }
            citySelect.appendChild(option);
        });
    } else {
        citySelect.disabled = true;
    }
};

const userDataElement = document.getElementById("userData");
console.log("Raw dataset:", userDataElement.dataset.user); // Должен быть JSON строкой

const user = JSON.parse(userDataElement.dataset.user || "{}");
console.log("Parsed user:", user); // Должны быть данные

document.addEventListener("DOMContentLoaded", async () => {
    const userDataElement = document.getElementById("userData");
    const user = JSON.parse(userDataElement.dataset.user || "{}");

    console.log("Code for values", user);

    const profileForm = document.getElementById("profileForm");
    const regionSelect = document.getElementById("region");
    const citySelect = document.getElementById("city");

    await loadRegions(regionSelect);

    // Устанавливаем регион пользователя
    if (user.region) {
        regionSelect.value = user.region;
    }

    // Устанавливаем города для выбранного региона
    loadCities(user.region, citySelect, user.town);

    regionSelect.addEventListener("change", () => {
        const selectedRegion = regionSelect.value;
        loadCities(selectedRegion, citySelect, null);
    });

    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const region = regionSelect.value || "Не указано";
        const town = citySelect.value || "Не указано";

        const res = await fetch("/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ region, town }),
        });

        if (res.ok) {
            alert("Профиль успешно обновлен!");
            window.location.href = "/dashboard";
        } else {
            alert("Ошибка обновления профиля");
        }
    });
});


