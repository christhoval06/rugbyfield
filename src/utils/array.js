export function shuffle(array) {
  const newArray = [...array];
  const length = newArray.length;

  for (let start = 0; start < length; start++) {
    const randomPosition = Math.floor((newArray.length - start) * Math.random());
    const randomItem = newArray.splice(randomPosition, 1);

    newArray.push(...randomItem);
  }

  return newArray;
}

export function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function choice(array) {
  return sample(shuffle(array));
}
