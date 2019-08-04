export function isSorted(arr, order = 'asc') {
for (var i = 0; i < arr.length - 1; i++) {
  if (order === 'asc') {
  	if (arr[i + 1] < arr[i]) {
      return false;
  	};	
  } else {
  	if (arr[i + 1] > arr[i]) {
      return false;
  	};
  }
}
return true;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function formatNumber(num) {
	return new Intl.NumberFormat("es-ES").format(num);
}