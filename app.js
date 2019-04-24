function main () {
  function randomChoice (arr) {
    return arr[Math.floor(arr.length * Math.random())];
  }
  function removeParams (uri) {
    return uri.replace(/([&\\?].+?=.+?$)/, '')
  }

  const url = new URL(location.href)
  let listText = url.searchParams.get('list')

  if (listText) {
    listText = decodeURI(listText)
  } else {
    listText = 'Sushi,Tempura,Yakitori'
  }

  const textarea = document.getElementById('textarea')
  textarea.value = listText

  let list = listText.split(',')
  list = list
    .map(t => t.trim())
    .filter(t => t)

  document.getElementById('result').innerHTML = randomChoice(list)

  document.getElementById('btn').onclick = () => {
    const url = new URL(removeParams(location.href))

    if (textarea.value) {
      url.searchParams.set('list', list.join(','));
    }

    location.href = url.href
  };
}

window.onload = function () {
  main()
}
