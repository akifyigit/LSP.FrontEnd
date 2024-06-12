export const objectToQuery = (queryObject) => {
  let queryArray = [];
  Object.entries(queryObject).forEach((element) => {
    const val = element[1];
    if (val) queryArray.push(`${element[0]}=${val}`);
    return queryArray;
  });
  return '?' + queryArray.join('&');
};

export const storageItem = (key, value) => {
  const object = { value, timestamp: new Date().getTime() };

  localStorage.setItem(key, JSON.stringify(object));
};

export const getStoragedItem = (key) => {
  const saved = localStorage.getItem(key);

  if (saved) {
    const { timestamp } = JSON.parse(saved);

    const count = Date.now() - timestamp;

    if (count < 3600000) return JSON.parse(saved).value;
    else return '';
  }

  return '';
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
};

export const roundHalf = (num) => {
  return Math.ceil(num * 2) / 2
}

export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};