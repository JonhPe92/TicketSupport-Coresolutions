// eslint-disable-next-line import/prefer-default-export
export const normalize = (data) => {
    const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';
    const isArray = (data) => Object.prototype.toString.call(data) === '[object Array]';

    const flatten = (data) => {
        if (!data.attributes) return data;

        return {
            id: data.id,
            ...data.attributes
        };
    };

    if (isArray(data)) {
        return data.map((item) => normalize(item));
    }

    if (isObject(data)) {
        if (isArray(data.data)) {
            data = [...data.data];
        } else if (isObject(data.data)) {
            data = flatten({ ...data.data });
        } else if (data.data === null) {
            data = null;
        } else {
            data = flatten(data);
        }

        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const key in data) {
            data[key] = normalize(data[key]);
        }

        return data;
    }

    return data;
};
