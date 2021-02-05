function docScrollTo() {
  var mainElements = document.getElementsByTagName('main')
  if (mainElements.length === 0) {
    setTimeout(docScrollTo, 100)
  } else {
    if (location.href.indexOf('?') >= 0) {
      var searchParamString = location.href.substring(location.href.indexOf('?') + 1, location.href.length)
      var searchParamArray = searchParamString.split('&')
      var searchParamMatrix = searchParamArray
        .map(function (s) {
          return s.split('=')
        })
        .filter(function (s) {
          return s[0] === 'id'
        })
        .map(function (s) {
          return s[1]
        })

      if (searchParamMatrix.length > 0) {
        var scrollToTitle = document.getElementById(searchParamMatrix[0])
        mainElements[0].scrollTo(0, scrollToTitle.offsetTop - 32)
      }
    } else {
      mainElements[0].scrollTo(0, 0)
    }
  }
}

function initDocScrollTo() {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode
  if (!isIE11) {
    window.addEventListener('popstate', function (event) {
      docScrollTo()
    })

    docScrollTo()
  }
}

initDocScrollTo()
