export const formatPrice = (price) => {
  if (Number.isNaN(price)) {
    return null;
  }

  return (
    price.toLocaleString()
  );
};

export const formatToAbsolute = (number) => {
  if (Number.isNaN(number)) {
    return null;
  }

  return (
    Math.abs(number)
  );
};

export const formatTime = (timestamp) => {
  if (Number.isNaN(timestamp)) {
    return null;
  }

  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const seconds = `0${date.getSeconds()}`;

  return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
};
