function main () {
  function randomChoice (arr) {
    return arr[Math.floor(arr.length * Math.random())]
  }
  function removeParams (uri) {
    return uri.replace(/([&\\?].+?=.+?$)/, '')
  }
  function listTextToArr (listText) {
    listText = listText.replace(/、/g, ',')
    let list = listText.split(',')
    return list
      .map(t => t.trim())
      .filter(t => t)
  }
  let count = 0
  let canReload = true

  function counter () {
    count ++
    document.getElementById('count').innerHTML = count
  }

  const url = new URL(location.href)
  let listText = url.searchParams.get('list')

  if (listText) {
    listText = decodeURI(listText)
  } else {
    listText = 'Sushi,Ramen,Yakitori'
  }

  const textarea = document.getElementById('textarea')
  textarea.value = listText

  let list = listTextToArr(listText)

  document.getElementById('result').innerHTML = randomChoice(list)

  counter()

  document.getElementById('btn').onclick = () => {
    const url = new URL(removeParams(location.href))

    if (textarea.value) {
      url.searchParams.set('list', listTextToArr(textarea.value))
    }

    document.getElementById('result').innerHTML = randomChoice(list)
    counter(count)

    const result = document.getElementById('result');

    result.style.animation = 'none';
    setTimeout(function() {
      result.style.animation = 'anime1 5s ease';
    }, 50);

    if (canReload) {
      location.replace(url.toString());
    }
  };

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      canReload = false
      const targetTextarea = document.getElementById('textarea');

      if (!document.activeElement || document.activeElement !== targetTextarea) {
        event.preventDefault(); // Prevent page scrolling
        document.getElementById('btn').click();
      }
    }
  });
}

window.onload = function () {
  main()
}
