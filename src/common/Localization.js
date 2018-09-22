
export default function resolveLocale(locale) {
    if (locale && locale.startsWith('uk')){
        return 'uk_UA';
    }

    if (locale && locale.startsWith('ru')){
        return 'ru_RU';
    }

    return 'en_US';
}
