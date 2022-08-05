function getRandomIntNumber(min, max) {
  if (min >= max) {
    // eslint-disable-next-line no-alert
    alert(`Первое число диапазона должно быть меньше второго.\nВы ввели ${min} и ${max}`);
  }
  else if (min < 0) {
    // eslint-disable-next-line no-alert
    alert(`Первое число диапазона не может быть меньше нуля.\nВы ввели ${min} и ${max}`);
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

function getRandomFloatNumber(min, max, amount) {
  if (min >= max) {
    // eslint-disable-next-line no-alert
    alert(`Первое число диапазона должно быть меньше второго.\nВы ввели ${min} и ${max}`);
  }
  else if (min < 0) {
    // eslint-disable-next-line no-alert
    alert(`Первое число диапазона не может быть меньше нуля.\nВы ввели ${min} и ${max}`);
  } else {
    const num = (Math.random() * (max - min) + min);
    return num.toFixed(amount);
  }
}


getRandomIntNumber(1, 10);
getRandomFloatNumber(3, 3.111111, 7);
